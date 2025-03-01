"use client";

import Footer from "@/components/Footer";
import SideBar from "@/components/Sidebar/SideBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto flex">
      <SideBar />
      <div className="mx-auto max-w-screen-2xl h-full w-full">{children}</div>
    </main>
  );
};

export default DashboardLayout;
