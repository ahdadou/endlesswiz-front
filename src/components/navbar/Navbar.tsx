import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import TrueFocus from "../animations/TrueFocus/TrueFocus";
import { useRouter } from "next/navigation";
import { Button } from "../Button";

type NavbarProps = {};

export const Navbar = ({}: NavbarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    router.push("/");
  };
  return (
    <nav className="fixed w-full backdrop-blur-md z-50 shadow-sm text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="relative w-[300px] text-xl cursor-pointer mr-20">
            <TrueFocus
              sentence="endless Wiz"
              manualMode={false}
              blurAmount={5}
              borderColor="text-gray-900"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </div>
        </div>

        <div className="hidden md:flex gap-8">
          {["Features", "Video", "HowItWorks", "Testimonials"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-white hover:text-gray-600 transition-colors font-medium"
            >
              {item.replace(/([A-Z])/g, " $1").trim()}
            </button>
          ))}
        </div>
        <div>
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              style="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              style="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
