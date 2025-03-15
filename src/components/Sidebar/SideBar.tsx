"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Mic,
  Library,
  User,
  ChevronDown,
  Bell,
  MessageSquare,
  HelpCircle,
  Dumbbell,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

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

  const navItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
    },
    {
      title: "Pronounce",
      icon: <Mic className="h-5 w-5" />,
      href: "/pronounce",
    },
    {
      title: "Words Library",
      icon: <Library className="h-5 w-5" />,
      href: "/words",
    },
    {
      title: "Videos Library",
      icon: <Video className="h-5 w-5" />,
      href: "/videos",
    },
    {
      title: "Practice",
      icon: <Dumbbell className="h-5 w-5" />,
      href: "/practice",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-4">
      {/* User profile with dropdown */}
      <div className={cn("mb-8", collapsed ? "flex justify-center" : "px-2")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="p-0 h-auto w-auto flex items-center gap-2"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-forest text-cream">
                  JD
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex items-center justify-between w-full">
                  <div className="text-left">
                    <p className="font-medium text-forest">John Doe</p>
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
            align={collapsed ? "center" : "start"}
            className="w-56"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Messages</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
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
                    : "text-gray-700 hover:bg-gray-100",
                  collapsed && "justify-center px-2",
                )}
              >
                <span className={cn(collapsed ? "mr-0" : "mr-3")}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.title}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      <Separator className="my-4" />

      {/* Logout button */}
      <Button
        variant="ghost"
        className={cn(
          "flex items-center text-gray-700 hover:bg-gray-100 transition-colors",
          collapsed && "justify-center px-2",
        )}
      >
        <LogOut className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
        {!collapsed && <span>Logout</span>}
      </Button>
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
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // For desktop: render the normal sidebar
  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-gray-200 transition-all duration-300 relative hidden md:block",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-sm z-10"
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
