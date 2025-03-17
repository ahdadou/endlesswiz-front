"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const flashcards = [
  { front: "Hello", back: "Hola" },
  { front: "Thank you", back: "Gracias" },
  { front: "Goodbye", back: "Adiós" },
  { front: "Please", back: "Por favor" },
  { front: "Yes", back: "Sí" },
  { front: "No", back: "No" },
  { front: "Sorry", back: "Lo siento" },
  { front: "Excuse me", back: "Perdón" },
  { front: "Good morning", back: "Buenos días" },
  { front: "Good night", back: "Buenas noches" },
];

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Animation Variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div className="p-6 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
            English Flashcards
          </h1>
          <p className="mb-4 text-center text-gray-600">
            Card {currentIndex + 1} of {flashcards.length}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <FaArrowLeft />
            </button>
            <div className="flex-1">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Flashcard
                    front={flashcards[currentIndex].front}
                    back={flashcards[currentIndex].back}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function Flashcard({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-64 h-40 mx-auto cursor-pointer" onClick={handleClick}>
      <div
        className={`relative w-full h-full transition-transform duration-600 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div
          className="absolute w-full h-full flex items-center justify-center text-2xl border rounded-lg shadow-md bg-white"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        {/* Back Face */}
        <div
          className="absolute w-full h-full flex items-center justify-center text-2xl border rounded-lg shadow-md rotate-y-180"
          style={{ backfaceVisibility: "hidden" }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
