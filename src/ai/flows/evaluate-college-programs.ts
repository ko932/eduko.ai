'use server';

/**
 * @fileOverview An AI agent that evaluates college programs based on student data.
 *
 * - evaluateCollegePrograms - A function that handles the college program evaluation process.
 * - EvaluateCollegeProgramsInput - The input type for the evaluateCollegePrograms function.
 * - EvaluateCollegeProgramsOutput - The return type for the evaluateCollegePrograms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EvaluateCollegeProgramsInputSchema = z.object({
  stream: z.string().describe('The student’s academic stream (e.g., Science, Commerce, Arts).'),
  examScores: z.string().describe('The student’s exam scores.'),
  budget: z.number().describe('The student’s budget for college in USD.'),
  locationPreference: z.string().describe('The student’s location preference for college.'),
  futureGoal: z.string().describe('The student’s future career goals.'),
});
export type EvaluateCollegeProgramsInput = z.infer<typeof EvaluateCollegeProgramsInputSchema>;

const ProgramEvaluationSchema = z.object({
  programName: z.string().describe('The name of the college program.'),
  matchReason: z.string().describe('The reason why this program is a good match for the student.'),
  admissionProbability: z.string().describe('The probability of admission to the program.'),
  cutoffAnalysis: z.string().describe('An analysis of the program’s cutoff scores.'),
  pros: z.string().describe('The pros of attending this program.'),
  cons: z.string().describe('The cons of attending this program.'),
});

const EvaluateCollegeProgramsOutputSchema = z.array(ProgramEvaluationSchema).describe('A list of evaluated college programs.');
export type EvaluateCollegeProgramsOutput = z.infer<typeof EvaluateCollegeProgramsOutputSchema>;

export async function evaluateCollegePrograms(input: EvaluateCollegeProgramsInput): Promise<EvaluateCollegeProgramsOutput> {
  return evaluateCollegeProgramsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'evaluateCollegeProgramsPrompt',
  input: {schema: EvaluateCollegeProgramsInputSchema},
  output: {schema: EvaluateCollegeProgramsOutputSchema},
  prompt: `You are an AI admissions counselor that gives student personalized suggestions for college programs.

  Evaluate college programs based on the following student information:

  Stream: {{{stream}}}
  Exam Scores: {{{examScores}}}
  Budget: {{{budget}}}
  Location Preference: {{{locationPreference}}}
  Future Goal: {{{futureGoal}}}

  Based on this information, suggest 3-5 best-fit college programs. For each program, include the program name, why it’s a good match, the probability of admission, a cutoff analysis, and pros/cons.
  Make sure that the college options are within the student's provided budget.
  Follow the JSON schema for outputting the programs, match reasons, admission probability, cutoff analysis, and pros/cons.
  `,
});

const evaluateCollegeProgramsFlow = ai.defineFlow(
  {
    name: 'evaluateCollegeProgramsFlow',
    inputSchema: EvaluateCollegeProgramsInputSchema,
    outputSchema: EvaluateCollegeProgramsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
