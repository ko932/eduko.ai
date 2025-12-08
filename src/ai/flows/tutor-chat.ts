'use server';

/**
 * @fileOverview The brain for the 3D AI Tutors in Live Mode.
 * This file contains the Genkit flow that orchestrates the entire
 * RAG (Retrieval-Augmented Generation) process for tutor responses.
 *
 * - tutorChat - The main function that the frontend will call.
 * - TutorChatInput - The input schema for the tutorChat function.
 * - TutorChatOutput - The output schema for the tutorChat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Schemas based on the provided JSON output format
const AnimationSchema = z.object({
  type: z.string().describe('The type of animation to play (e.g., "explain", "wave", "point").'),
  intensity: z.string().describe('The intensity of the animation (e.g., "soft", "energetic").'),
});

const DiagramSchema = z.object({
  show: z.boolean().describe('Whether to show a diagram in the explanation panel.'),
  id: z.string().optional().describe('The unique ID of the diagram to display.'),
});

const QuizSchema = z.object({
  ask: z.boolean().describe('Whether to ask a follow-up micro-question.'),
  question: z.string().optional().describe('The quiz question.'),
  options: z.array(z.string()).optional().describe('An array of possible answers.'),
  answer: z.string().optional().describe('The correct answer to the quiz question.'),
});

const KnowledgeGraphUpdateSchema = z.object({
  concept: z.string().describe('The specific academic concept that was discussed.'),
  mastery_delta: z.number().describe('The change in student mastery for this concept (e.g., +0.05).'),
});

export const TutorChatOutputSchema = z.object({
  response_text: z.string().describe('The primary explanation text to show in the UI panel.'),
  animation: AnimationSchema,
  diagram: DiagramSchema,
  quiz: QuizSchema,
  next_difficulty: z.string().describe('The suggested difficulty for the next interaction (easy, medium, hard).'),
  update_graph: KnowledgeGraphUpdateSchema,
});
export type TutorChatOutput = z.infer<typeof TutorChatOutputSchema>;


export const TutorChatInputSchema = z.object({
  tutor: z.string().describe("The name of the tutor (e.g., Mr. Vasu)."),
  subject: z.string().describe("The tutor's subject specialization (e.g., Mathematics)."),
  topic: z.string().describe("The current session topic (e.g., Integration Basics)."),
  studentId: z.string(),
  studentName: z.string(),
  question: z.string().describe("The student's question or voice input."),
  level: z.number().describe("The student's current skill level (0-1 score)."),
  mode: z.enum(['easy', 'medium', 'hard']).describe("The current difficulty mode."),
});
export type TutorChatInput = z.infer<typeof TutorChatInputSchema>;


// This tool simulates fetching data from various backend services (Vector DB, student profile DB).
const getStudentContext = ai.defineTool(
    {
      name: 'getStudentContext',
      description: 'Retrieves all necessary academic and historical context for a given student to help the tutor formulate the best response.',
      inputSchema: z.object({
        studentId: z.string(),
        topic: z.string(),
      }),
      outputSchema: z.object({
        vectorContext: z.string().describe("Contextual information retrieved from a vector database based on the student's history and the current topic."),
        weaknesses: z.array(z.string()).describe("A list of the student's known weak areas."),
        mistakeHistory: z.array(z.string()).describe("A list of the last 3 mistakes the student made."),
      }),
    },
    async ({ studentId, topic }) => {
      // In a real implementation, this would make parallel calls to:
      // 1. A Vector DB (e.g., Pinecone) like in your rag.js example.
      // 2. A student profile DB (e.g., Firestore) to get weaknesses and mistake history.
      
      console.log(`Retrieving context for student ${studentId} on topic ${topic}`);

      // Simulating the retrieval for this example.
      return {
        vectorContext: `Integration is the reverse of differentiation. The integral of x^n is (x^(n+1))/(n+1) + C. For x^2, the integral is x^3/3 + C. The '+ C' is the constant of integration and is very important.`,
        weaknesses: ["limits", "trigonometric identities"],
        mistakeHistory: ["forgot constant of integration", "confused dx placement", "incorrect substitution"],
      };
    }
);


const tutorPrompt = ai.definePrompt({
    name: 'tutorPrompt',
    input: { schema: TutorChatInputSchema },
    output: { schema: TutorChat-OutputSchema },
    tools: [getStudentContext],
    system: `You are an expert 3D AI teaching assistant inside the Eduko Live Mode. Your name is {{tutor}}.
Your job is to teach the student in a CLEAR, FRIENDLY, STEP-BY-STEP manner.

You MUST always call the getStudentContext tool to get the required information about the student.
DO NOT invent student weaknesses, mistakes, or vector context. Use the tool.

Based on all the provided context, your goals are:
1. Understand the student's question.
2. Provide a simple explanation first.
3. Then give a deeper explanation tailored to the requested difficulty mode.
4. Suggest diagrams or animations if they would be helpful.
5. Assign a relevant micro-question to check for understanding.
6. Recommend an update to the student’s knowledge graph.

RESTRICTIONS:
- NEVER answer in markdown.
- Your entire response MUST be a single, valid JSON object that conforms to the output schema.
- Keep explanations concise but powerful.
`,
    prompt: `
A student named {{studentName}} has asked a question.

- Tutor Name: {{tutor}}
- Subject: {{subject}}
- Session Topic: {{topic}}
- Student's Question: "{{question}}"
- Current Skill Level: {{level}}
- Current Difficulty Mode: {{mode}}

Please generate the JSON response.
`,
});


const tutorChatFlow = ai.defineFlow(
  {
    name: 'tutorChatFlow',
    inputSchema: TutorChatInputSchema,
    outputSchema: TutorChatOutputSchema,
  },
  async (input) => {
    try {
        console.log("Executing tutor chat flow with input:", input);
        const { output } = await tutorPrompt(input);
        
        if (!output) {
            throw new Error("The model did not return a valid output.");
        }
        
        // Here you could also persist the knowledge graph update.
        // For example: await updateKnowledgeGraph(input.studentId, output.update_graph);
        console.log("Knowledge graph update:", output.update_graph);

        return output;

    } catch (e) {
      console.error("Error in tutorChatFlow:", e);
      // Fallback response as per the original design
      return {
        response_text: "I had a moment of computational difficulty. Let me try to explain that more simply.",
        animation: { type: "explain", intensity: "soft" },
        diagram: { show: false },
        quiz: { ask: false },
        next_difficulty: input.mode,
        update_graph: { concept: "error", mastery_delta: 0.0 }
      };
    }
  }
);


// Exported function for API route to call
export async function tutorChat(input: TutorChatInput): Promise<TutorChatOutput> {
  return await tutorChatFlow(input);
}
