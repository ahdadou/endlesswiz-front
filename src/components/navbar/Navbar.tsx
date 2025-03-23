"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Book, Search, PlayCircle, Menu, X } from "lucide-react";
import TrueFocus from "../animations/TrueFocus/TrueFocus";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight flex items-center gap-2"
            onClick={closeMenu}
          >
            <TrueFocus
              sentence="endless Wiz"
              manualMode={false}
              blurAmount={5}
              borderColor="text-gray-900"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/learn"
              className={`nav-link ${isActive("/learn") ? "active" : ""}`}
            >
              <span className="flex items-center gap-1.5">
                <PlayCircle className="w-4 h-4" />
                Learn
              </span>
            </Link>
            <Link
              href="/practice"
              className={`nav-link ${isActive("/practice") ? "active" : ""}`}
            >
              <span className="flex items-center gap-1.5">
                <Search className="w-4 h-4" />
                Practice
              </span>
            </Link>
            <Link
              href="/auth/login"
              className="button-primary flex items-center gap-1.5 animate-fade-in"
            >
              Get Started
            </Link>
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
          <nav className="container mx-auto px-6 py-6 flex flex-col space-y-4">
            <Link
              href="/"
              className={`nav-link text-lg py-2 ${isActive("/") ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/learn"
              className={`nav-link text-lg py-2 ${isActive("/learn") ? "active" : ""}`}
              onClick={closeMenu}
            >
              <span className="flex items-center gap-2">
                <PlayCircle className="w-5 h-5" />
                Learn
              </span>
            </Link>
            <Link
              href="/practice"
              className={`nav-link text-lg py-2 ${isActive("/practice") ? "active" : ""}`}
              onClick={closeMenu}
            >
              <span className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Practice
              </span>
            </Link>
            <Link
              href="/auth/signup"
              className="button-primary w-full justify-center mt-2"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
