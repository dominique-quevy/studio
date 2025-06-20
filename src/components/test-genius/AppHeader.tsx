
import { TestTube2 } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="py-6 bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TestTube2 className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-headline font-bold text-primary">
            TestGenius
          </h1>
        </div>
        <p className="text-sm text-muted-foreground font-body">
          AI-Powered BDD Test Generation
        </p>
      </div>
    </header>
  );
}
