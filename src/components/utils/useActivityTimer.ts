import { useEffect, useState } from "react";

const useActivityTimer = (timeoutDuration: number = 3000) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      setIsVisible(true); // Show the element
      clearTimeout(timeoutId); // Clear any existing timeout
      timeoutId = setTimeout(() => setIsVisible(false), timeoutDuration); // Hide after the specified duration
    };

    // Add event listeners for user activity (desktop and mobile)
    window.addEventListener("mousemove", resetTimer); // Desktop
    window.addEventListener("click", resetTimer); // Desktop
    window.addEventListener("touchstart", resetTimer); // Mobile
    window.addEventListener("touchmove", resetTimer); // Mobile

    // Initial timer to hide the element
    resetTimer();

    // Cleanup event listeners
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("touchmove", resetTimer);
      clearTimeout(timeoutId);
    };
  }, [timeoutDuration]);

  return isVisible;
};

export default useActivityTimer;
