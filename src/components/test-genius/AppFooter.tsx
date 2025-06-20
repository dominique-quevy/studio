
export function AppFooter() {
  return (
    <footer className="py-6 mt-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-muted-foreground font-body">
          &copy; {new Date().getFullYear()} TestGenius. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
