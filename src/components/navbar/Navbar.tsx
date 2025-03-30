"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Book, Search, PlayCircle, Menu, X, SearchIcon } from "lucide-react";
import TrueFocus from "../animations/TrueFocus/TrueFocus";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import api from "@/clients/api/api";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInTranscriptSection, setIsInTranscriptSection] = useState(false);
  const [wordSearch, setWordSearch] = useState<string>("");
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const { setVideosWithPosition, setHighlitedWord } = useZustandState();

  // Scroll detection for background and section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const transcriptSection = document.getElementById("search-section");
      if (transcriptSection) {
        const rect = transcriptSection.getBoundingClientRect();
        setIsInTranscriptSection(rect.top <= 100 && rect.bottom >= 100); // Adjust threshold as needed
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path: string) => pathname === path;
  const isMobile = useIsMobile();

  // Fetch videos function
  const fetchVideos = async (query: string) => {    
    if (!query.trim()) return;
    try {
      const response = await api.getVideos(query);
      setHighlitedWord(query);
      if (response) {
        setVideosWithPosition(response);
        const transcriptSection = document.getElementById("search-section");
        if (transcriptSection) {
          transcriptSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideos(wordSearch);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-white/70"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}

          {(isInTranscriptSection && isMobile) ? (
            <>
              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="flex items-center px-3 py-1 bg-white border border-r-0 border-gray-200 rounded-l-md w-full h-10">
                  <Input
                    type="text"
                    value={wordSearch}
                    onChange={(e) => setWordSearch(e.target.value)}
                    placeholder="Search a word..."
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 bg-transparent h-8 text-base"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-white hover:bg-white/50 rounded-l-none h-10 px-4 text-base  border border-l-0 border-gray-200"
                >
                  <SearchIcon className="text-forest-700" />
                </Button>
              </form>
            </>
          ) : (
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight flex items-center gap-2"
              onClick={closeMenu}
            >
              <TrueFocus
                sentence="Endlesswiz"
                manualMode={false}
                blurAmount={5}
                borderColor="text-forest-700"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />
            </Link>
          )}
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {isInTranscriptSection && (
              <>
                {/* Search Bar */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center"
                >
                  <div className="flex items-center px-3 py-1 bg-white border border-r-0 border-gray-200 rounded-l-md w-80 h-10">
                    <Input
                      type="text"
                      value={wordSearch}
                      onChange={(e) => setWordSearch(e.target.value)}
                      placeholder="Search a word..."
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 bg-transparent h-8 text-base"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-white hover:bg-white/50 rounded-l-none h-10 px-4 text-base  border border-l-0 border-gray-200"
                  >
                    <SearchIcon className="text-forest-700" />
                  </Button>
                </form>
              </>
            )}
            <>
              <div className="w-full justify-center items-center flex">
                <Link href="/auth/signup">
                    Get Started — It's Free
                </Link>
              </div>
              <Link href="/auth/login">
                <Button className="bg-forest-700 hover:bg-forest-600 text-white rounded-md h-10">
                  Login
                </Button>
              </Link>
            </>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-md p-2 focus:outline-none transition-colors hover:bg-secondary"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg animate-slide-down shadow-md">
          <nav className="flex flex-col">
            <Link
              href="/"
              className={`nav-link text-lg p-5 ${
                isActive("/") ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <div className="bg-forest-700 hover:bg-forest-600 h-full w-full p-5 text-white">
              <Link
                href="/auth/login"
                className="button-primary justify-center"
                onClick={closeMenu}
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
