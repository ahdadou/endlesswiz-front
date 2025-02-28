import Link from "next/link";
import {
  BookOpen,
  Gamepad,
  Video,
  Trophy,
  Clock,
  Star,
  User,
} from "lucide-react";

const SideBar = () => {
  return (
    <aside className="w-64 bg-white p-4 border-r border-gray-200 sticky top-0 h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold">John Doe</h2>
          <p className="text-sm text-gray-500">Beginner</p>
        </div>
      </div>

      <nav className="space-y-2">
        {[
          {
            icon: <Trophy className="text-blue-500" />,
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            icon: <BookOpen className="text-blue-500" />,
            label: "My Words",
            href: "/dashboard/mywords",
          },
          {
            icon: <Video className="text-blue-500" />,
            label: "Video Library",
            href: "/dashboard/videoslibrary",
          },
          {
            icon: <Gamepad className="text-blue-500" />,
            label: "Games",
            href: "/dashboard/games",
          },
          {
            icon: <Clock className="text-blue-500" />,
            label: "Study Time",
            href: "/dashboard/studytime",
          },
        ].map((item) => (
          <Link href={item.href}>
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {item.icon}
              <span className="text-gray-700">{item.label}</span>
            </button>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
