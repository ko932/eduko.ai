// src/ai/flows/generate-timetable.ts
'use server';
/**
 * @fileOverview A flow for generating a personalized weekly timetable for students.
 *
 * - generateTimetable - A function that generates the timetable.
 * - GenerateTimetableInput - The input type for the generateTimetable function.
 * - GenerateTimetableOutput - The return type for the generateTimetable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTimetableInputSchema = z.object({
  subjects: z
    .string()
    .describe("List of subjects the student is studying, separated by commas."),
  weakAreas: z
    .string()
    .describe("List of subjects or topics the student finds challenging, separated by commas."),
  strongAreas: z
    .string()
    .describe("List of subjects or topics the student excels in, separated by commas."),
  studyHours: z
    .number()
    .describe("Number of hours the student can dedicate to studying each day."),
  examDates: z
    .string()
    .describe("Important exam dates to consider when creating the timetable, separated by commas."),
  lifestyleSchedule: z
    .string()
    .describe("Description of the student's daily routine and commitments outside of studying."),
});
export type GenerateTimetableInput = z.infer<typeof GenerateTimetableInputSchema>;

const GenerateTimetableOutputSchema = z.object({
  weeklyTimetable: z
    .string()
    .describe("A detailed weekly timetable with day-wise study blocks and subject allocation."),
  warnings: z
    .string()
    .describe("Any warnings or suggestions regarding potential overloading or imbalances in the timetable."),
});
export type GenerateTimetableOutput = z.infer<typeof GenerateTimetableOutputSchema>;

export async function generateTimetable(input: GenerateTimetableInput): Promise<GenerateTimetableOutput> {
  return generateTimetableFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTimetablePrompt',
  input: {schema: GenerateTimetableInputSchema},
  output: {schema: GenerateTimetableOutputSchema},
  prompt: `You are an AI timetable generator. Generate a personalized weekly timetable for a student, considering the following information:

Subjects: {{{subjects}}}
Weak Areas: {{{weakAreas}}}
Strong Areas: {{{strongAreas}}}
Study Hours: {{{studyHours}}}
Exam Dates: {{{examDates}}}
Lifestyle Schedule: {{{lifestyleSchedule}}}

Create a detailed weekly timetable with day-wise study blocks and subject allocation. Provide any warnings or suggestions regarding potential overloading or imbalances in the timetable.

Ensure that the timetable is balanced, considering the student's strengths and weaknesses. Allocate more time to weak areas and ensure sufficient time for exam preparation. Also, ensure to consider the lifestyle schedule of the student, so that there is a balance between study time and rest time.

Ensure that the timetable is formatted in a readable and well-organized manner.

Make sure to respond in such a way that the weeklyTimetable and warnings fields are populated.`,
});

const generateTimetableFlow = ai.defineFlow(
  {
    name: 'generateTimetableFlow',
    inputSchema: GenerateTimetableInputSchema,
    outputSchema: GenerateTimetableOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
