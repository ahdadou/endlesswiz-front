import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import TrueFocus from "../animations/TrueFocus/TrueFocus";
import { useRouter } from "next/navigation";

type NavbarProps = {};

export const Navbar = ({}: NavbarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in by checking for the presence of a token in cookies
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
    <div className="h-16 w-full bg-white flex flex-row justify-between items-center py-4 px-8">
      <div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          test
        </button>
      </div>
      <div className="relative w-[300px]">
        <TrueFocus
          sentence="endless Wiz"
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>
      <div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          test
        </button>
      </div>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};
