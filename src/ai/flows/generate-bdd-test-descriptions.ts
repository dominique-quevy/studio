// src/ai/flows/generate-bdd-test-descriptions.ts
'use server';
/**
 * @fileOverview Generates BDD-style test descriptions from input documents using GenAI.
 *
 * - generateBddTestDescriptions - A function that generates BDD test descriptions.
 * - GenerateBddTestDescriptionsInput - The input type for the generateBddTestDescriptions function.
 * - GenerateBddTestDescriptionsOutput - The return type for the generateBddTestDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBddTestDescriptionsInputSchema = z.object({
  documents: z
    .array(z.string())
    .describe(
      'An array of documents (business rules, regulations, diagrams, user stories) to generate BDD test descriptions from.'
    ),
});
export type GenerateBddTestDescriptionsInput = z.infer<
  typeof GenerateBddTestDescriptionsInputSchema
>;

const GenerateBddTestDescriptionsOutputSchema = z.object({
  testDescriptions: z
    .array(z.string())
    .describe('An array of generated BDD-style test descriptions.'),
});
export type GenerateBddTestDescriptionsOutput = z.infer<
  typeof GenerateBddTestDescriptionsOutputSchema
>;

export async function generateBddTestDescriptions(
  input: GenerateBddTestDescriptionsInput
): Promise<GenerateBddTestDescriptionsOutput> {
  return generateBddTestDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBddTestDescriptionsPrompt',
  input: {schema: GenerateBddTestDescriptionsInputSchema},
  output: {schema: GenerateBddTestDescriptionsOutputSchema},
  prompt: `You are an expert test engineer specializing in BDD (Behavior Driven Development). Based on the provided documents, generate comprehensive BDD-style test descriptions that cover at least 90% of the business logic code and 100% of the functional features, including positive flows, negative flows, exceptions, and edge cases.

  The test descriptions must also include representative data sets, data with consistency issues, data with integrity problems, and erroneous data.

  Documents:
  {{#each documents}}
  ---
  {{{this}}}
  {{/each}}
  ---

  Generate a diverse set of BDD-style test descriptions from these documents, ensuring each description includes a scenario and relevant data sets.
  `, // Modified prompt to include document separation and instructions.
});

const generateBddTestDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateBddTestDescriptionsFlow',
    inputSchema: GenerateBddTestDescriptionsInputSchema,
    outputSchema: GenerateBddTestDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
