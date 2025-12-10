

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
const ActionSchema = z.object({
  type: z.enum(['diagram', 'animate']),
  name: z.string(),
});

const QuizSchema = z.object({
  question: z.string().describe('A small practice question.'),
  options: z.array(z.string()).describe('An array of 4 possible answers for the quiz question.'),
  answer: z.string().describe('The correct answer to the quiz question.'),
  explain_answer: z.string().describe('An explanation of why the answer is correct.'),
});

export const TutorChatOutputSchema = z.object({
  explanation: z.string().describe('A clear and concise explanation of the concept, student-friendly.'),
  steps: z.array(z.string()).describe('A step-by-step breakdown of the explanation if necessary.'),
  quiz: QuizSchema.describe('A micro-quiz to test student understanding.'),
  actions: z.array(ActionSchema).describe('A list of actions for the frontend to perform (e.g., show a diagram, play an animation).'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The suggested difficulty for the next interaction.'),
});
export type TutorChatOutput = z.infer<typeof TutorChatOutputSchema>;


export const TutorChatInputSchema = z.object({
  tutor: z.enum(['mr_vasu', 'mr_bondz', 'mr_ohm', 'mr_aryan', 'sanjivani']).describe("The internal name of the tutor."),
  topic: z.string().describe("The current session topic (e.g., Integration Basics)."),
  studentId: z.string(),
  question: z.string().describe("The student's question or voice input."),
  mode: z.enum(['easy', 'medium', 'hard']).describe("The current difficulty mode from the frontend."),
});
export type TutorChatInput = z.infer<typeof TutorChatInputSchema>;


// This tool simulates fetching data from various backend services (Vector DB, student profile DB).
// This replaces the previous, simpler `getStudentContext` tool.
const getFullStudentRAGContext = ai.defineTool(
  {
    name: 'getFullStudentRAGContext',
    description: 'Retrieves all necessary RAG context for a given student, including academic history, vector context, and knowledge graph data, to help the tutor formulate the best response.',
    inputSchema: z.object({
      studentId: z.string(),
      topic: z.string(),
      tutor: z.string(), // To filter vector DB results
    }),
    outputSchema: z.object({
      ragContext: z.string().describe("Contextual documents retrieved from a vector database based on the student's question and the current topic."),
      lastInteractions: z.array(z.object({ q: z.string(), a: z.string() })).describe("The last 5 interactions the student had, to provide conversational context."),
      knowledgeGraph: z.object({ weak_areas: z.array(z.string()) }).describe("A summary of the student's knowledge graph, highlighting known weak areas."),
    }),
  },
  async ({ studentId, topic, tutor }: { studentId: string; topic: string; tutor: string }) => {
    // In a real implementation, this would make parallel calls to:
    // 1. A Vector DB (e.g., Pinecone) to get `ragContext`, filtered by `tutor`/`subject`.
    // 2. A student profile DB (e.g., Firestore) to get `lastInteractions` and `knowledgeGraph`.

    console.log(`RAG Retrieval for student ${studentId} on topic '${topic}' with tutor ${tutor}`);

    // Simulating the retrieval for this example.
    return {
      ragContext: `Integration is the reverse of differentiation. The integral of x^n is (x^(n+1))/(n+1) + C. For x^2, the integral is x^3/3 + C. The '+ C' is the constant of integration and is very important. This concept is related to finding the area under a curve.`,
      lastInteractions: [
        { q: "What is differentiation?", a: "It's the rate of change of a function." },
        { q: "Thanks, that makes sense.", a: "You're welcome. Shall we try an example?" }
      ],
      knowledgeGraph: {
        weak_areas: ["limits", "trigonometric identities", "constant of integration"]
      },
    };
  }
);


const tutorPrompt = ai.definePrompt({
  name: 'tutorPrompt',
  input: { schema: TutorChatInputSchema },
  output: { schema: TutorChatOutputSchema },
  tools: [getFullStudentRAGContext],
  system: `You are a 3D AI Teaching Tutor inside Eduko’s Live Mode. 
Your role is to teach concepts with clarity, accuracy, and adaptive difficulty.

You ALWAYS call the getFullStudentRAGContext tool to get the required information about the student. DO NOT invent student data.

You always follow this response schema:
{
  "explanation": "A clear and concise explanation of the concept.",
  "steps": ["step 1", "step 2", ...],
  "quiz": {
    "question": "A small practice question",
    "options": ["A", "B", "C", "D"],
    "answer": "B",
    "explain_answer": "Why this is correct"
  },
  "actions": [
    { "type": "diagram", "name": "graph_sine_wave" },
    { "type": "animate", "name": "explain_pose" }
  ],
  "difficulty": "easy | medium | hard"
}

RULES:
1. Explanations must be student-friendly, using simple language first.
2. Use diagrams only when helpful. Use the 'diagram' action. Use animations such as 'explain_pose', 'write_board', 'point_left', 'think_pose'.
3. Adjust difficulty based on student performance history and the current 'mode'.
4. If a student is confused, simplify. If a student is confident, increase difficulty.
5. NEVER produce content outside the schema.
6. ALWAYS reason step-by-step in hidden chain-of-thought but output only the final JSON schema.
`,
  prompt: (input: TutorChatInput) => {
    let subjectPrompt = "";
    switch (input.tutor) {
      case "mr_vasu": subjectPrompt = "CONTEXT: You are Mr. Vasu. You teach math (calculus, algebra, graphs). Prefer geometric intuition and step-by-step equations."; break;
      case "mr_bondz": subjectPrompt = "CONTEXT: You are Mr. Bondz. You teach chemistry (reactions, stoichiometry). Use reaction formats: A + B -> C."; break;
      case "mr_ohm": subjectPrompt = "CONTEXT: You are Mr. Ohm. You teach physics (mechanics, EM). Relate concepts to real-world analogies."; break;
      case "mr_aryan": subjectPrompt = "CONTEXT: You are Mr. Aryan. You teach coding (Python, JS, DSA). Show clean code blocks and pseudocode."; break;
      case "sanjivani": subjectPrompt = "CONTEXT: You are Sanjivani AI. You teach medical concepts (anatomy, physiology). Use clear visuals and ethical, safe explanations."; break;
    }

    return [{
      text: `
${subjectPrompt}

A student has asked a question.

- Session Topic: {{topic}}
- Student's Question: "{{question}}"
- Current Difficulty Mode Requested: {{mode}}

Please generate the JSON response.
` }];
  },
});


const tutorChatFlow = ai.defineFlow(
  {
    name: 'tutorChatFlow',
    inputSchema: TutorChatInputSchema,
    outputSchema: TutorChatOutputSchema,
  },
  async (input: TutorChatInput) => {
    try {
      console.log("Executing tutor chat flow with input:", input);
      const { output } = await tutorPrompt(input);

      if (!output) {
        throw new Error("The model did not return a valid output.");
      }

      // Here you would persist the knowledge graph update.
      // const success = detectSuccess(output);
      // await updateKnowledgeGraph(input.studentId, { topic: input.topic, difficulty: output.difficulty, success });
      console.log("Simulating knowledge graph update for student:", input.studentId);
      console.log("Response generated with difficulty:", output.difficulty);

      return output;

    } catch (e: any) {
      console.error("Error in tutorChatFlow:", e);
      // Fallback response as per the original design, conforming to the new schema
      return {
        explanation: "I had a moment of computational difficulty. Let's try to simplify that. What part is most confusing?",
        steps: [],
        quiz: {
          question: "",
          options: [],
          answer: "",
          explain_answer: "",
        },
        actions: [
          { type: "animate" as const, name: "think_pose" }
        ],
        difficulty: input.mode,
      };
    }
  }
);


// Exported function for API route to call
export async function tutorChat(input: TutorChatInput): Promise<TutorChatOutput> {
  return await tutorChatFlow(input);
}
