
"use client";

import type { Dispatch, SetStateAction } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileText, PlusCircle, Trash2 } from "lucide-react";

export interface Document {
  id: string;
  name: string;
  content: string;
}

interface DocumentInputAreaProps {
  documents: Document[];
  setDocuments: Dispatch<SetStateAction<Document[]>>;
}

export function DocumentInputArea({ documents, setDocuments }: DocumentInputAreaProps) {
  const addDocument = () => {
    setDocuments([...documents, { id: Date.now().toString(), name: `Document ${documents.length + 1}`, content: "" }]);
  };

  const updateDocumentName = (id: string, name: string) => {
    setDocuments(documents.map(doc => doc.id === id ? { ...doc, name } : doc));
  };

  const updateDocumentContent = (id: string, content: string) => {
    setDocuments(documents.map(doc => doc.id === id ? { ...doc, content } : doc));
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <FileText className="mr-2 h-6 w-6 text-primary" />
          Reference Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {documents.map((doc, index) => (
          <div key={doc.id} className="p-4 border rounded-md shadow-sm bg-secondary/30">
            <div className="flex justify-between items-center mb-2">
              <Input
                type="text"
                value={doc.name}
                onChange={(e) => updateDocumentName(doc.id, e.target.value)}
                placeholder={`Document ${index + 1} Name`}
                className="font-body text-sm flex-grow mr-2"
                aria-label={`Document ${index + 1} name`}
              />
              {documents.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeDocument(doc.id)} aria-label={`Remove ${doc.name}`}>
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              )}
            </div>
            <Textarea
              value={doc.content}
              onChange={(e) => updateDocumentContent(doc.id, e.target.value)}
              placeholder={`Paste content of ${doc.name} here (e.g., business rules, user stories, BPMN descriptions)...`}
              className="min-h-[150px] font-body text-sm"
              aria-label={`${doc.name} content`}
            />
          </div>
        ))}
        <Button onClick={addDocument} variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Another Document
        </Button>
      </CardContent>
    </Card>
  );
}
