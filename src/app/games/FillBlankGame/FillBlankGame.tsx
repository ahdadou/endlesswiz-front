// components/FillBlankGame.tsx
"use client";
import { useState, useEffect } from "react";

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

const FillBlankGame = ({
  words = data,
}: {
  words: { word: string; meaning: string }[];
}) => {
  const [currentSentence, setCurrentSentence] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const generateSentence = () => {
    const targetWord = words[Math.floor(Math.random() * words.length)];
    const sentence = `The ${"_".repeat(targetWord.word.length)} means "${targetWord.meaning}"`;
    setCurrentSentence(sentence);
    return targetWord;
  };

  const checkAnswer = () => {
    const targetWord = words.find((w) => currentSentence.includes(w.meaning));
    if (targetWord?.word.toLowerCase() === userAnswer.toLowerCase()) {
      setScore((s) => s + (streak * 50 + 100));
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
    generateSentence();
    setUserAnswer("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Score: {score}</h2>
        <p className="text-gray-600">Current Streak: {streak}x</p>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mb-6 text-xl">
        {currentSentence}
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="flex-1 border-2 p-3 rounded-lg"
          placeholder="Enter the missing word"
        />
        <button
          onClick={checkAnswer}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FillBlankGame;
