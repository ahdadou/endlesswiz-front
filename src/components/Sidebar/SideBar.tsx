import Link from "next/link";
import { useState } from "react";

import {
  BookOpen,
  Gamepad,
  Video,
  Trophy,
  Clock,
  Star,
  User,
  Settings,
  LogOut,
  X,
  Menu,
  Mic,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUserDataZustandState } from "@/provider/ZustandUserDataProvider";

const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useUserDataZustandState();
  const router = useRouter();

  const navItems = [
    { icon: <Trophy />, label: "Dashboard", href: "/dashboard" },
    { icon: <Mic />, label: "Pronounce Word", href: "/dashboard/pronounce" }, // New button
    { icon: <BookOpen />, label: "My Words", href: "/dashboard/mywords" },
    {
      icon: <Video />,
      label: "Video Library",
      href: "/dashboard/videoslibrary",
    },
    { icon: <Gamepad />, label: "Practice", href: "/dashboard/practice" },
    { icon: <Clock />, label: "Study Time", href: "/dashboard/studytime" },
    { icon: <Settings />, label: "Settings", href: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "GET" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.push("/");
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 p-2 z-50 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white p-4 border-r border-gray-200 fixed lg:sticky top-0 h-screen transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 z-40`}
      >
        {/* Close Button for Mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-1"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold">
              {userData?.firstName} {userData?.lastName}
            </h2>
            <p className="text-sm text-gray-500">
              {userData?.level ?? "Beginner"}
            </p>
          </div>
        </div>

        <nav className="space-y-2 h-[calc(100vh-160px)] overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={item.href} // Changed key to href for better uniqueness
                className="block hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.icon}
                  <span className="text-gray-700">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>
        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-red-500"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
