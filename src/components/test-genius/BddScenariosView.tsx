
"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListChecks, ClipboardCopy } from "lucide-react";
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

interface BddScenariosViewProps {
  scenarios: string[];
  setScenarios: Dispatch<SetStateAction<string[]>>;
}

export function BddScenariosView({ scenarios, setScenarios }: BddScenariosViewProps) {
  const { toast } = useToast();

  const updateScenario = (index: number, content: string) => {
    const newScenarios = [...scenarios];
    newScenarios[index] = content;
    setScenarios(newScenarios);
  };

  const copyToClipboard = (text: string, type: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          toast({ title: `${type} Copied!`, description: `${type} has been copied to your clipboard.` });
        })
        .catch(err => {
          toast({ variant: "destructive", title: "Copy Failed", description: `Could not copy ${type}: ${err}` });
        });
    } else {
       toast({ variant: "destructive", title: "Copy Failed", description: "Clipboard API not available." });
    }
  };
  
  if (!scenarios || scenarios.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <ListChecks className="mr-2 h-6 w-6 text-primary" />
          Generated BDD Scenarios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <Accordion type="multiple" className="w-full space-y-2">
            {scenarios.map((scenario, index) => (
              <AccordionItem value={`scenario-${index}`} key={index} className="bg-background border rounded-md">
                <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                  <span className="font-body font-medium">Scenario {index + 1}</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <Textarea
                    value={scenario}
                    onChange={(e) => updateScenario(index, e.target.value)}
                    placeholder="BDD scenario description..."
                    className="min-h-[150px] font-code text-sm bg-muted/20"
                    aria-label={`BDD Scenario ${index + 1} content`}
                  />
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(scenario, `Scenario ${index + 1}`)} className="mt-2">
                    <ClipboardCopy className="mr-2 h-4 w-4" /> Copy Scenario
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
