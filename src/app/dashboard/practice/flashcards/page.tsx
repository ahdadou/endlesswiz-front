"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Flashcard = {
  id: number;
  question: string;
  answer: string;
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReviewDate: number;
  isFavorite: boolean;
};

// Mocked Data
const mockedFlashcards: Flashcard[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate: Date.now(),
    isFavorite: false,
  },
  {
    id: 2,
    question: "What is the largest planet in the solar system?",
    answer: "Jupiter",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate: Date.now(),
    isFavorite: false,
  },
  {
    id: 3,
    question: "What is the chemical symbol for water?",
    answer: "H2O",
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    nextReviewDate: Date.now(),
    isFavorite: false,
  },
];

export default function Home() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockedFlashcards);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  // Handle flipping the card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Handle editing a flashcard
  const handleEdit = () => {
    const currentFlashcard = flashcards[currentFlashcardIndex];
    setEditQuestion(currentFlashcard.question);
    setEditAnswer(currentFlashcard.answer);
    setShowEditModal(true);
  };

  // Save edited flashcard
  const saveEdit = () => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentFlashcardIndex] = {
      ...updatedFlashcards[currentFlashcardIndex],
      question: editQuestion,
      answer: editAnswer,
    };
    setFlashcards(updatedFlashcards);
    setShowEditModal(false);
  };

  // Handle review buttons (SM-2 algorithm)
  const handleReview = (interval: number) => {
    const updatedFlashcards = [...flashcards];
    const currentFlashcard = updatedFlashcards[currentFlashcardIndex];

    currentFlashcard.nextReviewDate = Date.now() + interval * 60 * 60 * 1000; // Convert hours to milliseconds
    setFlashcards(updatedFlashcards);

    // Move to the next card
    setCurrentFlashcardIndex((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  // Toggle favorite
  const toggleFavorite = () => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[currentFlashcardIndex].isFavorite =
      !updatedFlashcards[currentFlashcardIndex].isFavorite;
    setFlashcards(updatedFlashcards);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 gap-4">
      {/* Card */}
      <div className="relative w-[60%] h-[60vh]">
        <motion.div
          className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center p-6 cursor-pointer"
          style={{ backfaceVisibility: "hidden" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          onClick={handleFlip}
        >
          <p className="text-xl text-gray-800">
            {flashcards[currentFlashcardIndex]?.question}
          </p>
        </motion.div>
        <motion.div
          className="absolute w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center p-6 cursor-pointer"
          style={{ backfaceVisibility: "hidden", rotateY: 180 }}
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          transition={{ duration: 0.6 }}
          onClick={handleFlip}
        >
          <p className="text-xl text-gray-800">
            {flashcards[currentFlashcardIndex]?.answer}
          </p>
        </motion.div>
      </div>

      {/* Top Icons */}
      {/* <div className="flex space-x-4 mt-6">
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
          🔊
        </button>
        <button
          onClick={handleEdit}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          ✏️
        </button>
        <button
          onClick={toggleFavorite}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          {flashcards[currentFlashcardIndex]?.isFavorite ? '❤️' : '🤍'}
        </button>
      </div> */}

      {/* Navigation Arrows */}
      {/* <div className="flex space-x-4 mt-6">
        <button
          onClick={() =>
            setCurrentFlashcardIndex(
              (prev) => (prev - 1 + flashcards.length) % flashcards.length
            )
          }
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          ◀️
        </button>
        <button
          onClick={() =>
            setCurrentFlashcardIndex((prev) => (prev + 1) % flashcards.length)
          }
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          ▶️
        </button>
      </div> */}

      {/* Review Buttons */}
      {/* <div className="flex space-x-4 mt-6">
        <button
          onClick={() => handleReview(1)} // Skip 1h
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Skip 1h
        </button>
        <button
          onClick={() => handleReview(1 / 60)} // Forgot 1m
          className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Forgot 1m
        </button>
        <button
          onClick={() => handleReview(4 * 24)} // Easy 4d
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Easy 4d
        </button>
        <button
          onClick={() => handleReview(12)} // Hard 12h
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Hard 12h
        </button>
      </div> */}

      {/* Edit Modal */}
      {/* <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Edit Flashcard</h2>
              <input
                type="text"
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Question"
              />
              <input
                type="text"
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Answer"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Add Cards Link */}
      {/* <Link href="/add">
        <span className="mt-6 text-blue-500 hover:underline">Add More Cards</span>
      </Link> */}
    </div>
  );
}
