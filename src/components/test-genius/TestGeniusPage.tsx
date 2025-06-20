
"use client";

import { useState, useEffect } from 'react';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { DocumentInputArea, type Document } from './DocumentInputArea';
import { BddScenariosView } from './BddScenariosView';
import { TestDataView } from './TestDataView';
import { CoverageInfoSection } from './CoverageInfoSection';
import { Button } from '@/components/ui/button';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateBddTestDescriptionsAction, generateTestDataAction } from '@/app/actions';
import { Progress } from "@/components/ui/progress";

export function TestGeniusPage() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: Date.now().toString(), name: "Document 1", content: "" }
  ]);
  const [bddScenarios, setBddScenarios] = useState<string[]>([]);
  const [testData, setTestData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleGenerate = async () => {
    if (documents.every(doc => doc.content.trim() === "")) {
      toast({
        variant: "destructive",
        title: "No Content Provided",
        description: "Please add content to at least one document.",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setBddScenarios([]);
    setTestData("");

    const documentContents = documents.map(doc => doc.content).filter(content => content.trim() !== "");

    try {
      setProgress(10);
      // Generate BDD Test Descriptions
      toast({ title: "Generating BDD Scenarios...", description: "The AI is working its magic. This may take a moment." });
      const bddInput = { documents: documentContents };
      const bddOutput = await generateBddTestDescriptionsAction(bddInput);
      setBddScenarios(bddOutput.testDescriptions);
      setProgress(50);
      toast({ title: "BDD Scenarios Generated!", description: "Review and refine the generated BDD scenarios." });

      // Generate Test Data
      toast({ title: "Generating Test Data...", description: "The AI is now synthesizing test data." });
      const testDataInput = { referenceDocuments: documentContents }; // Or use bddOutput.testDescriptions as reference
      const testDataOutput = await generateTestDataAction(testDataInput);
      setTestData(testDataOutput.testData);
      setProgress(100);
      toast({ title: "Test Data Generated!", description: "Review and refine the generated test data." });

    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
      });
      setProgress(0);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen bg-background items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="font-headline text-xl mt-4 text-muted-foreground">Loading TestGenius...</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <DocumentInputArea documents={documents} setDocuments={setDocuments} />

          <div className="text-center">
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              aria-live="polite"
              aria-busy={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Generate Test Scenarios & Data
                </>
              )}
            </Button>
          </div>
          
          {isLoading && (
            <div className="w-full max-w-md mx-auto my-4">
              <Progress value={progress} className="w-full [&>div]:bg-accent" />
              <p className="text-center text-sm text-muted-foreground mt-2">
                {progress < 50 ? "Generating BDD Scenarios..." : "Generating Test Data..."} ({progress}%)
              </p>
            </div>
          )}

          {(bddScenarios.length > 0 || testData) && !isLoading && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <BddScenariosView scenarios={bddScenarios} setScenarios={setBddScenarios} />
              <TestDataView testData={testData} setTestData={setTestData} />
            </div>
          )}
          
          <CoverageInfoSection />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
