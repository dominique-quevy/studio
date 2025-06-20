
"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatabaseZap, ClipboardCopy } from "lucide-react";
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

interface TestDataViewProps {
  testData: string;
  setTestData: Dispatch<SetStateAction<string>>;
}

export function TestDataView({ testData, setTestData }: TestDataViewProps) {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
     if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(text)
        .then(() => {
            toast({ title: "Test Data Copied!", description: "Test data has been copied to your clipboard." });
        })
        .catch(err => {
            toast({ variant: "destructive", title: "Copy Failed", description: `Could not copy test data: ${err}` });
        });
     } else {
        toast({ variant: "destructive", title: "Copy Failed", description: "Clipboard API not available." });
     }
  };

  if (!testData) {
    return null;
  }
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <DatabaseZap className="mr-2 h-6 w-6 text-primary" />
          Generated Test Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <Textarea
            value={testData}
            onChange={(e) => setTestData(e.target.value)}
            placeholder="Generated test data (e.g., JSON, CSV)..."
            className="min-h-[280px] font-code text-sm bg-muted/20"
            aria-label="Generated test data content"
          />
        </ScrollArea>
         <Button variant="outline" size="sm" onClick={() => copyToClipboard(testData)} className="mt-2">
            <ClipboardCopy className="mr-2 h-4 w-4" /> Copy Test Data
          </Button>
      </CardContent>
    </Card>
  );
}
