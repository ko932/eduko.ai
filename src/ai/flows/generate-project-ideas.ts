'use server';

/**
 * @fileOverview This file defines the Genkit flow for generating project ideas.
 *
 * - generateProjectIdeas - A function that generates project ideas based on the student's academic level, field, and difficulty.
 * - GenerateProjectIdeasInput - The input type for the generateProjectIdeas function.
 * - GenerateProjectIdeasOutput - The return type for the generateProjectIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AcademicLevelSchema = z.enum(['Beginner', 'Intermediate', 'Advanced']);
const FieldSchema = z.enum([
  'Science',
  'Robotics',
  'AI/ML',
  'Commerce',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Engineering',
  'Arts',
]);
const DifficultySchema = z.enum(['Beginner', 'Intermediate', 'Advanced']);

const GenerateProjectIdeasInputSchema = z.object({
  academicLevel: AcademicLevelSchema.describe("Student's academic level (Beginner, Intermediate, Advanced)."),
  field: FieldSchema.describe('Field of study (Science, Robotics, AI/ML, Commerce, etc.).'),
  difficulty: DifficultySchema.describe('Project difficulty (Beginner, Intermediate, Advanced).'),
});
export type GenerateProjectIdeasInput = z.infer<typeof GenerateProjectIdeasInputSchema>;

const ProjectIdeaSchema = z.object({
  title: z.string().describe('The title of the project idea.'),
  explanation: z.string().describe('A brief explanation of the project.'),
  relevance: z.string().describe('The relevance of the project to the field of study.'),
  learningOutcome: z.string().describe('The expected learning outcome from the project.'),
});

const GenerateProjectIdeasOutputSchema = z.object({
  projectIdeas: z.array(ProjectIdeaSchema).describe('A list of project ideas.'),
});
export type GenerateProjectIdeasOutput = z.infer<typeof GenerateProjectIdeasOutputSchema>;

export async function generateProjectIdeas(input: GenerateProjectIdeasInput): Promise<GenerateProjectIdeasOutput> {
  return generateProjectIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectIdeasPrompt',
  input: {schema: GenerateProjectIdeasInputSchema},
  output: {schema: GenerateProjectIdeasOutputSchema},
  prompt: `You are an AI project idea generator for students.

  Generate 3-5 project ideas based on the following criteria:

  Academic Level: {{{academicLevel}}}
  Field: {{{field}}}
  Difficulty: {{{difficulty}}}

  Each project idea should include:
  - title
  - explanation
  - relevance
  - learning outcome`,
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
