"use client";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto">
      <div className="mx-auto max-w-screen-2xl h-full w-full">{children}</div>
    </main>
  );
};

export default LoginLayout;
