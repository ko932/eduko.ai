'use server';

/**
 * @fileOverview Generates a step-by-step guide for filling out academic forms.
 *
 * - generateFormFillingGuide - A function that generates the form filling guide.
 * - GenerateFormFillingGuideInput - The input type for the generateFormFillingGuide function.
 * - GenerateFormFillingGuideOutput - The return type for the generateFormFillingGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFormFillingGuideInputSchema = z.object({
  formType: z.string().describe('The type of form to generate a guide for (e.g., college application, scholarship form).'),
  studentGradeLevel: z.string().describe('The student grade level, used to tailor the guide.'),
});
export type GenerateFormFillingGuideInput = z.infer<typeof GenerateFormFillingGuideInputSchema>;

const GenerateFormFillingGuideOutputSchema = z.object({
  guide: z.string().describe('A step-by-step guide for filling the specified form, including eligibility, age limits, fees, and warnings.'),
});
export type GenerateFormFillingGuideOutput = z.infer<typeof GenerateFormFillingGuideOutputSchema>;

export async function generateFormFillingGuide(input: GenerateFormFillingGuideInput): Promise<GenerateFormFillingGuideOutput> {
  return generateFormFillingGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFormFillingGuidePrompt',
  input: {schema: GenerateFormFillingGuideInputSchema},
  output: {schema: GenerateFormFillingGuideOutputSchema},
  prompt: `You are an AI assistant designed to help students fill out forms accurately and efficiently.

  Based on the form type and student's grade level, generate a step-by-step guide that includes:

  - Instructions: Clear, concise steps to complete each section of the form.
  - Eligibility: Requirements the student must meet to be eligible.
  - Age Limits: Any age restrictions.
  - Fees: Applicable fees and payment methods.
  - Warnings: Common mistakes to avoid.

  Form Type: {{{formType}}}
  Student Grade Level: {{{studentGradeLevel}}}
  `,
});

const generateFormFillingGuideFlow = ai.defineFlow(
  {
    name: 'generateFormFillingGuideFlow',
    inputSchema: GenerateFormFillingGuideInputSchema,
    outputSchema: GenerateFormFillingGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
