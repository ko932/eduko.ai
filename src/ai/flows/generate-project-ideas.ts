
'use server';

/**
 * @fileOverview This file defines the Genkit flow for generating a full project roadmap.
 *
 * - generateProjectIdeas - A function that generates a complete project blueprint based on user's background and project idea.
 * - GenerateProjectIdeasInput - The input type for the generateProjectIdeas function.
 * - GenerateProjectIdeasOutput - The return type for the generateProjectIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectIdeasInputSchema = z.object({
  educationType: z.string().describe("Student's education type (e.g., Engineering, Diploma)."),
  branch: z.string().optional().describe('Field of study if applicable (e.g., Computer Engineering).'),
  interests: z.array(z.string()).describe('A list of student interests (e.g., IoT, Web Development).'),
  projectIdea: z.string().describe('The user-provided project idea or name.'),
});
export type GenerateProjectIdeasInput = z.infer<typeof GenerateProjectIdeasInputSchema>;


const GenerateProjectIdeasOutputSchema = z.object({
  summary: z.string().describe('A short, 3-4 line description of the project.'),
  requiredSkills: z.array(z.string()).describe('A list of skills required for the project.'),
  hardwareRequirements: z.array(z.string()).describe('A list of required hardware components, sensors, and modules. If none, return an empty array.'),
  softwareRequirements: z.array(z.string()).describe('A list of required software, languages, frameworks, and tools.'),
  buildPlan: z.array(z.string()).describe('A step-by-step build plan with 6-10 actionable steps.'),
  architectureDiagram: z.string().describe('A simple, text-based block diagram of the project architecture. E.g., [Sensor] -> [Microcontroller] -> [Cloud] -> [App]'),
});
export type GenerateProjectIdeasOutput = z.infer<typeof GenerateProjectIdeasOutputSchema>;


export async function generateProjectIdeas(input: GenerateProjectIdeasInput): Promise<GenerateProjectIdeasOutput> {
  return generateProjectIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectRoadmapPrompt',
  input: {schema: GenerateProjectIdeasInputSchema},
  output: {schema: GenerateProjectIdeasOutputSchema},
  prompt: `You are an AI project architect that creates detailed project roadmaps for students. Generate a complete blueprint based on the user's background and their project idea.

  **User Background:**
  - Education: {{{educationType}}}
  - Branch: {{{branch}}}
  - Interests: {{{interests}}}

  **Project Idea:**
  "{{{projectIdea}}}"

  **Your Task:**
  Generate a comprehensive project roadmap with the following sections. Be specific and tailor the output to the user's background and the project idea.

  1.  **Project Summary:** Write a concise 3-4 line description explaining what the project is and its purpose.
  2.  **Required Skills:** List the key technical skills needed (e.g., IoT fundamentals, App Development, Embedded C).
  3.  **Hardware Requirements:** List all necessary hardware components. If no hardware is needed, provide an empty array.
  4.  **Software Requirements:** List all necessary software, programming languages, frameworks, and libraries.
  5.  **Step-by-Step Build Plan:** Create a clear, actionable build plan with 6-10 steps from setup to final testing.
  6.  **Architecture Diagram:** Provide a simple, text-based block diagram showing the flow of the system. For example: [Sensors] -> [ESP32] -> [Cloud: Firebase/MQTT] -> [Mobile App].

  **Example Project: Smart Energy Meter Monitoring System**
  - **Summary:** A smart IoT-based energy meter that tracks electricity usage in real time and shows consumption data on a mobile app. Helps reduce wastage and gives predictive billing.
  - **Required Skills:** IoT fundamentals, MQTT/HTTP, App Development, Firebase/ThingsBoard, Embedded C/Python.
  - **Hardware:** ESP32, Current Sensor SCT-013, Voltage Sensor, Power Supply.
  - **Software:** Arduino IDE, Firebase Realtime DB, Flutter/React Native.
  - **Build Plan:** 1. Set up ESP32... 2. Write code to read sensors... etc.
  - **Architecture:** [Sensors] -> [ESP32] -> [Cloud] -> [Mobile App]

  Provide the output in the specified JSON format.
  `,
});

const generateProjectIdeasFlow = ai.defineFlow(
  {
    name: 'generateProjectIdeasFlow',
    inputSchema: GenerateProjectIdeasInputSchema,
    outputSchema: GenerateProjectIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
