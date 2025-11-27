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
  gradeLevel: z.string().describe('The student\'s grade level.'),
});
export type GenerateSmartNotesInput = z.infer<typeof GenerateSmartNotesInputSchema>;

const GenerateSmartNotesOutputSchema = z.object({
  summary: z.string().describe('A short summary of the raw text.'),
  mindMapKeywords: z.string().describe('Keywords for a mind map of the raw text.'),
  flashcards: z.string().describe('Flashcards (front/back) for the raw text.'),
  mcqs: z.string().describe('Multiple choice questions with answers for the raw text.'),
  longNotesMarkdown: z.string().describe('Long notes in Markdown format for the raw text.'),
  definitions: z.string().describe('Definitions of key terms in the raw text.'),
  examples: z.string().describe('Examples related to the raw text.'),
  progress: z.string().describe('Progress of the smart notes generation.'),
});
export type GenerateSmartNotesOutput = z.infer<typeof GenerateSmartNotesOutputSchema>;

export async function generateSmartNotes(input: GenerateSmartNotesInput): Promise<GenerateSmartNotesOutput> {
  return generateSmartNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSmartNotesPrompt',
  input: {schema: GenerateSmartNotesInputSchema},
  output: {schema: GenerateSmartNotesOutputSchema},
  prompt: `You are an AI assistant designed to help students study more effectively. You will generate summaries, mind map keywords, flashcards, MCQs, and long notes from raw text input, tailored to the student's grade level and the topic.

Raw Text: {{{rawText}}}
Topic: {{{topic}}}
Grade Level: {{{gradeLevel}}}

SUMMARY:
<short summary>

MIND MAP KEYWORDS:
<keywords>

FLASHCARDS (Front/Back):
<flashcards>

MCQs with Answers:
<mcqs>

LONG NOTES (Markdown):
<longNotesMarkdown>

DEFINITIONS:
<definitions>

EXAMPLES:
<examples>

progress: generating smart notes`, 
});

const generateSmartNotesFlow = ai.defineFlow(
  {
    name: 'generateSmartNotesFlow',
    inputSchema: GenerateSmartNotesInputSchema,
    outputSchema: GenerateSmartNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Generated summaries, keywords, flashcards, MCQs, and long notes from raw text input.'
    };
  }
);
