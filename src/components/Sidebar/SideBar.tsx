"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Headphones,
  Mic,
  BookmarkIcon,
  PlayCircle,
  Gamepad2,
  Bell,
  User,
  ChevronDown,
  ChevronUp,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUserDataZustandState } from "@/provider/ZustandUserDataProvider";

const navItems = [
  { href: "/user/dashboard", icon: <LayoutDashboard size={18} />, label: "My Journey" },
  { href: "/user/stories", icon: <Headphones size={18} />, label: "Audio Tales" },
  { href: "/user/pronounce", icon: <Mic size={18} />, label: "Say It Right" },
  { href: "/user/words", icon: <BookmarkIcon size={18} />, label: "My Word Bank" },
  { href: "/user/videos", icon: <PlayCircle size={18} />, label: "Watch & Learn" },
  { href: "/user/practice", icon: <Gamepad2 size={18} />, label: "Play & Practice" },
];

const SidebarItem = ({ href, icon, label, collapsed = false }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md transition-colors",
        isActive ? "bg-gray-100 text-gray-900 dark:bg-forest-600 dark:text-cream" : "text-gray-700 hover:bg-gray-50 dark:text-cream dark:hover:bg-forest-600",
        collapsed && "justify-center px-2 gap-0",
      )}
    >
      <span className={cn("text-gray-500 dark:text-cream", isActive && "text-gray-900 dark:text-cream")}>
        {icon}
      </span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
};

interface SidebarProps {
  isCollapsed: (val: boolean) => void;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const { userData } = useUserDataZustandState();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  // Handle mobile detection
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (userDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [userDropdownOpen]);

  // Logout handler
  const handleLogout = async () => {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "demo_event",
        category: "Button",
        label: "Logout page",
        user: userData?.email
      });


      const response = await fetch("/api/auth/logout", { method: "GET" });
      if (!response.ok) throw new Error("Logout failed");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push("/");
    }
  };

  // Toggle collapse state and notify parent
  const toggleCollapse = () => {
    setCollapsed((prev) => {
      isCollapsed(!prev);
      return !prev;
    });
  };

  const SidebarContent = ({ isMobileView = false }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className={cn(
          "flex items-center border-b border-gray-200 dark:border-forest-500",
          collapsed && !isMobileView ? "justify-center p-3" : "justify-between p-4",
        )}
      >
        {!collapsed && <h1 className="text-xl font-bold text-gray-900 dark:text-cream">Endlesswiz</h1>}
        {!isMobileView && (
          <Button
            variant="ghost"
            size="icon"
            className="p-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-forest-600 dark:text-cream dark:hover:bg-forest-500"
            onClick={toggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed && !isMobileView}
          />
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4 dark:border-forest-500" ref={dropdownRef}>
        {!collapsed || isMobileView ? (
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 rounded-md transition-colors dark:hover:bg-forest-600"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={userData?.profileImageUrl ?? "/placeholder.jpg"} />
                <AvatarFallback className="bg-gray-200 text-gray-700 dark:bg-forest-600 dark:text-cream">
                  {userData?.firstName?.charAt(0) || "U"}
                  {userData?.lastName?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-cream">
                  {userData?.firstName || "User"} {userData?.lastName || ""}
                </p>
                <p className="text-xs text-gray-500 dark:text-forest-200">My Workspace</p>
              </div>
              <span className="text-gray-400 dark:text-forest-200">
                {userDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </span>
            </button>

            {userDropdownOpen && (
              <div className="absolute left-0 right-0 bottom-full mb-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1 dark:bg-forest-700 dark:border-forest-500">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-forest-500">
                  <p className="text-sm font-medium text-gray-900 dark:text-cream">
                    {userData?.firstName || "User"} {userData?.lastName || ""}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-forest-200">My Workspace</p>
                </div>
                {/* <Link href="/user/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-forest-600 dark:text-cream">
                  <span className="flex items-center gap-3">
                    <User size={16} className="text-gray-500 dark:text-forest-200" /> Profile
                  </span>
                </Link> */}
                <Link href="/notifications" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-forest-600 dark:text-cream">
                  <span className="flex items-center gap-3">
                    <Bell size={16} className="text-gray-500 dark:text-forest-200" /> Notifications
                  </span>
                </Link>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-forest-600 dark:text-cream"
                >
                  <span className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Sun size={16} className="text-gray-500 dark:text-forest-200" />
                    ) : (
                      <Moon size={16} className="text-gray-500 dark:text-forest-200" />
                    )}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>
                <Link href="/user/settings" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-forest-600 dark:text-cream">
                  <span className="flex items-center gap-3">
                    <User size={16} className="text-gray-500 dark:text-forest-200" /> Settings
                  </span>
                </Link>
                <div className="border-t border-gray-100 my-1 dark:border-forest-500" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-forest-600 dark:text-red-400"
                >
                  <span className="flex items-center gap-3">
                    <LogOut size={16} className="text-red-500 dark:text-red-400" /> Sign out
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative flex justify-center">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="p-2 hover:bg-gray-50 rounded-md transition-colors dark:hover:bg-forest-600"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={userData?.profileImageUrl ?? "/placeholder.jpg"} />
                <AvatarFallback className="bg-gray-200 text-gray-700 dark:bg-forest-600 dark:text-cream">
                  {userData?.firstName?.charAt(0) || "U"}
                  {userData?.lastName?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
            </button>
            {userDropdownOpen && (
              <div className="absolute left-full bottom-0 ml-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1 w-64 dark:bg-forest-700 dark:border-forest-500">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-forest-500">
                  <p className="text-sm font-medium text-gray-900 dark:text-cream">
                    {userData?.firstName || "User"} {userData?.lastName || ""}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-forest-200">My Workspace</p>
                </div>
                <Link href="/user/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-forest-600 dark:text-cream">
                  <span className="flex items-center gap-3">
                    <User size={16} className="text-gray-500 dark:text-forest-200" /> Profile
                  </span>
                </Link>
                <Link href="/notifications" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-forest-600 dark:text-cream">
                  <span className="flex items-center gap-3">
                    <Bell size={16} className="text-gray-500 dark:text-forest-200" /> Notifications
                  </span>
                </Link>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-forest-600 dark:text-cream"
                >
                  <span className="flex items-center gap-3">
                    {theme === "dark" ? (
                      <Sun size={16} className="text-gray-500 dark:text-forest-200" />
                    ) : (
                      <Moon size={16} className="text-gray-500 dark:text-forest-200" />
                    )}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                </button>
                <Link href="/user/settings" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-forest-600 dark:text-cream">
                  <span className="flex items-center gap-3">
                    <User size={16} className="text-gray-500 dark:text-forest-200" /> Settings
                  </span>
                </Link>
                <div className="border-t border-gray-100 my-1 dark:border-forest-500" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-forest-600 dark:text-red-400"
                >
                  <span className="flex items-center gap-3">
                    <LogOut size={16} className="text-red-500 dark:text-red-400" /> Sign out
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-forest-700">
            <PanelLeftOpen className="h-5 w-5 text-gray-700 dark:text-cream" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 bg-white dark:bg-forest-700">
          <SidebarContent isMobileView={true} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        "h-full border-r border-gray-200 hidden md:flex flex-col transition-all duration-300 fixed top-0 bottom-0 z-50 bg-white dark:bg-forest-700",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <SidebarContent />
    </div>
  );
}