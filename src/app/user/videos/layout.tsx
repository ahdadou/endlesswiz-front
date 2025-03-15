"use client";

import { ZustandStoreProvider } from "@/provider/ZustandStoreProvider";

const VideosLibraryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <ZustandStoreProvider>
        <div className="h-full w-full">{children}</div>
      </ZustandStoreProvider>
    </main>
  );
};

export default VideosLibraryLayout;
