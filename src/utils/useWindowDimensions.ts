import { useEffect, useState } from "react";

export const SMALL_MIN_WIDTH = 764;

const useWindowDimensions = () => {
  const { innerWidth, innerHeight } = {
    innerWidth: typeof window !== "undefined" ? window.innerWidth : 0,
    innerHeight: typeof window !== "undefined" ? window.innerHeight : 0,
  };
  const [windowDimensions, setWindowDimensions] = useState({
    innerWidth,
    innerHeight,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const listener = () => {
        const { innerWidth, innerHeight } = {
          innerWidth: typeof window !== "undefined" ? window.innerWidth : 0,
          innerHeight: typeof window !== "undefined" ? window.innerHeight : 0,
        };
        setWindowDimensions({ innerWidth, innerHeight });
      };
      window.addEventListener("resize", listener);
      return () => {
        window.removeEventListener("resize", listener);
      };
    }
  });

  return windowDimensions;
};

export default useWindowDimensions;
