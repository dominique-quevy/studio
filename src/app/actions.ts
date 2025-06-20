
"use server";

import { generateBddTestDescriptions as genBddFlow, type GenerateBddTestDescriptionsInput, type GenerateBddTestDescriptionsOutput } from '@/ai/flows/generate-bdd-test-descriptions';
import { generateTestData as genDataFlow, type GenerateTestDataInput, type GenerateTestDataOutput } from '@/ai/flows/generate-test-data';

export async function generateBddTestDescriptionsAction(
  input: GenerateBddTestDescriptionsInput
): Promise<GenerateBddTestDescriptionsOutput> {
  try {
    const result = await genBddFlow(input);
    return result;
  } catch (error) {
    console.error("Error in generateBddTestDescriptionsAction:", error);
    throw new Error("Failed to generate BDD test descriptions. Please check the server logs.");
  }
}

export async function generateTestDataAction(
  input: GenerateTestDataInput
): Promise<GenerateTestDataOutput> {
  try {
    const result = await genDataFlow(input);
    return result;
  } catch (error) {
    console.error("Error in generateTestDataAction:", error);
    throw new Error("Failed to generate test data. Please check the server logs.");
  }
}
