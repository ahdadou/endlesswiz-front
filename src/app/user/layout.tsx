"use client";

import SideBar from "@/components/Sidebar/SideBar";
import { ZustandUserDataProvider } from "@/provider/ZustandUserDataProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto flex">
      <ZustandUserDataProvider>
        <SideBar />
        <div className="overflow-auto h-full w-full pt-16 lg:pt-3 p-3">
          {children}
        </div>
      </ZustandUserDataProvider>
    </main>
  );
};

export default DashboardLayout;
