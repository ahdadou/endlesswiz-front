"use client";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto flex">
        <div className="mx-auto overflow-auto max-w-screen-2xl h-full w-full">
          {children}
        </div>
    </main>
  );
};

export default DashboardLayout;
