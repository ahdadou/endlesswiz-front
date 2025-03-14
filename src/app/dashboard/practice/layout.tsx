"use client";

import { Toaster } from "@/components/ui/toaster";

const PracticeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto">
      <div className="mx-auto max-w-screen-2xl h-full w-full">{children}</div>
      <Toaster />
    </main>
  );
};

export default PracticeLayout;
