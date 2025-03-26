"use client";

import { Toaster } from "@/components/ui/toaster";

const MyWordsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto">
      <div className="h-full w-full">{children}</div>
      <Toaster />
    </main>
  );
};

export default MyWordsLayout;
