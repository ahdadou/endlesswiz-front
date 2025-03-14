"use client";

import { DecksProvider } from "../games/anki/deck";

const MyWordsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto">
      <div className="mx-auto max-w-screen-2xl h-full w-full">
        <DecksProvider>
          {/* <Component {...pageProps} /> */}
          {children}
        </DecksProvider>
      </div>
    </main>
  );
};

export default MyWordsLayout;
