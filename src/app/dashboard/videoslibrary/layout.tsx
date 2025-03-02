"use client";

import { ZustandStoreProvider } from "@/provider/ZustandStoreProvider";

const VideosLibraryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto">
      <ZustandStoreProvider>
        <div className="mx-auto max-w-screen-2xl h-full w-full">{children}</div>
      </ZustandStoreProvider>
    </main>
  );
};

export default VideosLibraryLayout;
