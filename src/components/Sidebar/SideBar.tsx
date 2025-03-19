"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Mic,
  Library,
  ChevronDown,
  Bell,
  MessageSquare,
  HelpCircle,
  Dumbbell,
  Menu,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUserDataZustandState } from "@/provider/ZustandUserDataProvider";

const navItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/user/dashboard",
  },
  {
    title: "Pronounce",
    icon: <Mic className="h-5 w-5" />,
    href: "/user/pronounce",
  },
  {
    title: "Words Library",
    icon: <Library className="h-5 w-5" />,
    href: "/user/words",
  },
  {
    title: "Videos Library",
    icon: <Video className="h-5 w-5" />,
    href: "/user/videos",
  },
  {
    title: "Practice",
    icon: <Dumbbell className="h-5 w-5" />,
    href: "/user/practice",
  },
];

export default function DashboardSidebar() {
  const { userData } = useUserDataZustandState();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "GET" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push("/");
    }
  };

  const SidebarContent = ({ isMobileView = false }) => (
    <div className="flex flex-col h-full p-4">
      {/* User profile with dropdown */}
      <div
        className={cn(
          "mb-8",
          collapsed && !isMobileView ? "flex justify-center" : "px-2"
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 h-auto w-auto flex items-center gap-2"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={userData?.profileImageUrl ?? "/placeholder.svg"}
                />
                <AvatarFallback className="bg-forest text-cream">
                  {userData?.firstName?.charAt(0)}
                  {userData?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {(!collapsed || isMobileView) && (
                <div className="flex items-center justify-between w-full">
                  <div className="text-left">
                    <p className="font-medium ">
                      {userData?.firstName} {userData?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Premium Member
                    </p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={collapsed && !isMobileView ? "center" : "start"}
            className="w-56 rounded-xl shadow-lg border-0"
          >
            <div className="px-4 py-3 border-b">
              <p className="font-medium ">
                {userData?.firstName} {userData?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">Premium Member</p>
            </div>
            <DropdownMenuItem
              className="py-2.5 my-1 cursor-pointer"
              onClick={() => console.log("Notifications")}
            >
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem className="py-2.5 my-1 cursor-pointer" onClick={() => console.log("Messages")}>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Messages</span>
            </DropdownMenuItem> */}
            <DropdownMenuItem
              className="py-2.5 my-1 cursor-pointer"
              onClick={() => router.push("/help-support")}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/checkout")}
              className="py-2.5 my-1 cursor-pointer"
            >
              <Crown className="mr-2 h-4 w-4" />
              <span>Upgrade</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="py-2.5 my-1 cursor-pointer"
              onClick={() => router.push("/user/settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem
              className="py-2.5 my-1 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  isActive
                    ? "bg-forest text-cream"
                    : "hover:text-forest hover:bg-gray-100",
                  collapsed && !isMobileView && "justify-center px-2"
                )}
              >
                <span
                  className={cn(collapsed && !isMobileView ? "mr-0" : "mr-3")}
                >
                  {item.icon}
                </span>
                {(!collapsed || isMobileView) && <span>{item.title}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      <Separator className="my-4" />
    </div>
  );

  // For mobile: render a Sheet with hamburger button
  if (isMobile) {
    return (
      <>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden fixed top-4 left-4 z-50"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent isMobileView={true} />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // For desktop: render the normal sidebar
  return (
    <div
      className={cn(
        "h-screen  border-gray-200 transition-all duration-300 relative hidden md:block",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-gray-200 shadow-sm z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      <SidebarContent />
    </div>
  );
}
