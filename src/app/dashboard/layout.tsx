"use client";

import SideBar from "@/components/Sidebar/SideBar";
import { ZustandUserDataProvider } from "@/provider/ZustandUserDataProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto flex">
      <ZustandUserDataProvider>
        <SideBar />
        <div className="mx-auto max-w-screen-2xl h-full w-full">{children}</div>
      </ZustandUserDataProvider>
    </main>
  );
};

export default DashboardLayout;
