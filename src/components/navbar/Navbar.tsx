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
    <div className="h-16 w-full flex flex-row justify-between items-center text-center container mx-auto px-4">
      {/* Left side - Logo and Menu Items (unchanged logo container) */}
      <div className="flex items-center gap-6 py-2 text-white">
        <div className="relative w-[300px] text-xl cursor-pointer mr-20">
          <TrueFocus
            sentence="endless Wiz"
            manualMode={false}
            blurAmount={5}
            borderColor="white"
            animationDuration={2}
            pauseBetweenAnimations={1}
          />
        </div>
        <div
          style={{
            fontFamily: "var(--font-rubik)",
          }}
          className="font-bold text-sm cursor-pointer mt-4"
        >
          Why endlesswiz
        </div>
        <div
          style={{
            fontFamily: "var(--font-rubik)",
          }}
          className="font-bold  text-sm cursor-pointer mt-4"
        >
          {" "}
          Contact Us
        </div>
      </div>

      <div>
        {isLoggedIn ? (
          <Button onClick={handleLogout} style="px-4 py-2  text-white rounded">
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => router.push("/login")}
            style="px-4 py-2 text-white rounded"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
};
