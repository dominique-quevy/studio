'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating test data based on provided reference documents.
 *
 * The flow takes reference documents as input and generates realistic and edge-case test data, including positive, negative, boundary, and invalid data, to ensure thorough test coverage.
 *
 * @interface GenerateTestDataInput - Defines the input schema for the generateTestData function.
 * @interface GenerateTestDataOutput - Defines the output schema for the generateTestData function.
 * @function generateTestData - The main function that triggers the test data generation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow
const GenerateTestDataInputSchema = z.object({
  referenceDocuments: z.array(
    z.string().describe('A reference document to generate test data from.')
  ).describe('An array of reference documents used for generating test data.'),
});

export type GenerateTestDataInput = z.infer<typeof GenerateTestDataInputSchema>;

// Define the output schema for the flow
const GenerateTestDataOutputSchema = z.object({
  testData: z.string().describe('Generated test data in a suitable format (e.g., JSON, CSV).'),
});

export type GenerateTestDataOutput = z.infer<typeof GenerateTestDataOutputSchema>;


/**
 * Main function to trigger the test data generation flow.
 * @param input - The input containing reference documents.
 * @returns A promise resolving to the generated test data.
 */
export async function generateTestData(input: GenerateTestDataInput): Promise<GenerateTestDataOutput> {
  return generateTestDataFlow(input);
}

// Define the prompt
const generateTestDataPrompt = ai.definePrompt({
  name: 'generateTestDataPrompt',
  input: {schema: GenerateTestDataInputSchema},
  output: {schema: GenerateTestDataOutputSchema},
  prompt: `You are an expert test data generator. Based on the following reference documents, generate realistic and edge-case test data, including positive, negative, boundary, and invalid data, to ensure thorough test coverage.

Reference Documents:
{{#each referenceDocuments}}
{{{this}}}
{{/each}}

Ensure the generated test data covers a wide range of scenarios, including:
- Valid input data
- Invalid input data
- Boundary conditions
- Edge cases
- Data with consistency issues
- Data with integrity issues
- Erroneous data

Return the generated test data in a suitable format (e.g., JSON, CSV).
`,
});

// Define the flow
const generateTestDataFlow = ai.defineFlow(
  {
    name: 'generateTestDataFlow',
    inputSchema: GenerateTestDataInputSchema,
    outputSchema: GenerateTestDataOutputSchema,
  },
  async input => {
    const {output} = await generateTestDataPrompt(input);
    return output!;
  }
);
