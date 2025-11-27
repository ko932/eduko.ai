'use server';

/**
 * @fileOverview Smart Notes Generator AI agent.
 *
 * - generateSmartNotes - A function that generates summaries, mind map keywords, flashcards, MCQs, and long notes from raw text input.
 * - GenerateSmartNotesInput - The input type for the generateSmartNotes function.
 * - GenerateSmartNotesOutput - The return type for the generateSmartNotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSmartNotesInputSchema = z.object({
  rawText: z.string().describe('The raw text input to generate notes from.'),
  topic: z.string().describe('The topic of the raw text.'),
  gradeLevel: z.string().describe("The student's grade level."),
});
export type GenerateSmartNotesInput = z.infer<typeof GenerateSmartNotesInputSchema>;

const GenerateSmartNotesOutputSchema = z.object({
  summary: z.string().describe('A short summary of the raw text.'),
  mindMap: z
    .string()
    .describe('A simple structured breakdown of the topic with subtopics.'),
  flashcards: z
    .string()
    .describe('Flashcards (front/back) for the raw text.'),
  mcqs: z
    .string()
    .describe('Multiple choice questions with answers for the raw text.'),
  fullNotes: z
    .string()
    .describe(
      'Long notes in Markdown format for the raw text, including headings, sub-headings, bullet points, definitions, key facts, and examples.'
    ),
  fillInTheBlanks: z
    .string()
    .describe('A list of fill-in-the-blank questions based on the text.'),
  conceptBreakdown: z
    .object({
      what: z.string().describe('A simple "What is it?" explanation.'),
      why: z.string().describe('A "Why is it important?" explanation.'),
      how: z.string().describe('A "How does it work?" explanation.'),
    })
    .describe('A breakdown of the concept into What, Why, and How.'),
});
export type GenerateSmartNotesOutput = z.infer<typeof GenerateSmartNotesOutputSchema>;

export async function generateSmartNotes(input: GenerateSmartNotesInput): Promise<GenerateSmartNotesOutput> {
  return generateSmartNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSmartNotesPrompt',
  input: {schema: GenerateSmartNotesInputSchema},
  output: {schema: GenerateSmartNotesOutputSchema},
  prompt: `You are an AI assistant designed to help students study more effectively. You will generate a complete set of study materials from raw text input, tailored to the student's grade level and the topic.

  Raw Text: {{{rawText}}}
  Topic: {{{topic}}}
  Grade Level: {{{gradeLevel}}}

  Generate the following structured output based on the provided text. Ensure each section is filled out accurately and concisely.

  - summary: A 1-2 line summary.
  - mindMap: A simple text-based mind map with the main topic and indented subtopics. Do not use any special characters or art.
  - flashcards: 5-10 flashcards in "Front: Question / Back: Answer" format.
  - mcqs: 5-10 multiple choice questions in "Q: Question / A) ... B) ... C) ... D) ... / Correct Answer: X" format.
  - fullNotes: Comprehensive notes in Markdown, including headings, sub-headings, bullet points, definitions, key facts, and examples.
  - fillInTheBlanks: 5-8 fill-in-the-blank questions in "1. ___ is the..." format.
  - conceptBreakdown: A simple breakdown of the core concept into "What" it is, "Why" it is important, and "How" it works.`,
});

const generateSmartNotesFlow = ai.defineFlow(
  {
    name: 'generateSmartNotesFlow',
    inputSchema: GenerateSmartNotesInputSchema,
    outputSchema: GenerateSmartNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
