"use client";

import SideBar from "@/components/Sidebar/SideBar";
import { ZustandUserDataProvider } from "@/provider/ZustandUserDataProvider";
import { useState } from "react";
import cx from "classnames";
import { Chatbot } from "@/components/Chatbot/Chatbot";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <main className="h-full overflow-auto flex">
      <ZustandUserDataProvider>
        <SideBar
          isCollapsed={(val) => {
            console.log("val =====> ", val);
            setIsCollapsed(val);
          }}
        />
        <div
          className={cx(
            "overflow-auto h-full w-full pt-16 lg:pt-3 px-4 transition-all duration-300 ease-in-out",
            {
              "md:pl-20 md:pr-10": isCollapsed,
              "md:pl-64": !isCollapsed,
            },
          )}
        >
          {children}
        </div>
        <Chatbot />
      </ZustandUserDataProvider>
    </main>
  );
};

export default DashboardLayout;
