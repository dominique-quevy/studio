
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

export function CoverageInfoSection() {
  return (
    <Card className="shadow-md bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center text-primary">
          <Target className="mr-2 h-5 w-5" />
          Test Generation Goals
        </CardTitle>
        <CardDescription className="font-body">
          The AI strives to generate test scenarios and data aiming for comprehensive coverage:
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-1 text-sm font-body text-foreground/80">
          <li>Minimum <strong>90% coverage</strong> of business logic code.</li>
          <li><strong>100% coverage</strong> of functional features.</li>
          <li>Inclusion of positive flows, negative flows, exceptions, and edge cases.</li>
          <li>Generation of representative data sets, including data with consistency issues, integrity problems, and erroneous data.</li>
        </ul>
        <p className="mt-4 text-xs font-body text-muted-foreground">
          As a Key User, you can review and refine these generated assets based on your expertise to achieve optimal test quality.
        </p>
      </CardContent>
    </Card>
  );
}
