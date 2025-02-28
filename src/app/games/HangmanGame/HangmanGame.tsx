// components/HangmanGame.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const data = [
  {
    word: "Resilience",
    meaning: "The capacity to recover quickly from difficulties; toughness.",
  },
  { word: "Ephemeral", meaning: "Lasting for a very short time." },
  {
    word: "Serendipity",
    meaning: "The occurrence of events by chance in a happy or beneficial way.",
  },
  {
    word: "Euphoria",
    meaning: "A feeling or state of intense excitement and happiness.",
  },
  { word: "Ubiquitous", meaning: "Present, appearing, or found everywhere." },
  {
    word: "Pernicious",
    meaning: "Having a harmful effect, especially in a gradual or subtle way.",
  },
  {
    word: "Ineffable",
    meaning: "Too great or extreme to be expressed or described in words.",
  },
  {
    word: "Quintessential",
    meaning:
      "Representing the most perfect or typical example of a quality or class.",
  },
];

const HangmanGame = ({
  words = data,
}: {
  words: { word: string; meaning: string }[];
}) => {
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    meaning: string;
  }>();
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(6);

  const stages = [
    <svg key="0">/* Full hangman drawing */</svg>,
    // Add progressively drawn hangman stages...
  ];

  useEffect(() => {
    newWord();
  }, []);

  const newWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSelectedWord(randomWord);
    setGuessedLetters([]);
  };

  const displayWord = selectedWord?.word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  const handleGuess = (letter: string) => {
    if (!selectedWord?.word.includes(letter)) {
      setLives((l) => l - 1);
    }
    setGuessedLetters([...guessedLetters, letter]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-6 flex justify-between">
        <div>Score: {score}</div>
        <div>Lives: {lives}</div>
      </div>

      <div className="mb-6 h-40 flex items-center justify-center">
        {stages[6 - lives]}
      </div>

      <motion.div className="text-3xl font-mono mb-6">{displayWord}</motion.div>

      <div className="grid grid-cols-9 gap-2">
        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter)}
            className={`p-2 rounded ${
              guessedLetters.includes(letter)
                ? selectedWord?.word.includes(letter)
                  ? "bg-green-200"
                  : "bg-red-200"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HangmanGame;
