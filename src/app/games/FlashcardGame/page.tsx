// components/FlashcardGame.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FlashcardGame = ({
  words,
}: {
  words: { word: string; meaning: string }[];
}) => {
  const [cards, setCards] = useState<
    { id: number; content: string; isMeaning: boolean }[]
  >([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const shuffled = [...words]
      .flatMap((word) => [
        { id: Math.random(), content: word.word, isMeaning: false },
        { id: Math.random(), content: word.meaning, isMeaning: true },
      ])
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, [words]);

  const handleFlip = (index: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    setFlipped([...flipped, index]);
    setMoves((m) => m + 1);

    if (flipped.length === 1) {
      const [firstIndex] = flipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[index];

      if (
        firstCard.isMeaning !== secondCard.isMeaning &&
        words.some(
          (word) =>
            (word.word === firstCard.content &&
              word.meaning === secondCard.content) ||
            (word.meaning === firstCard.content &&
              word.word === secondCard.content),
        )
      ) {
        setMatched([...matched, firstIndex, index]);
        setScore((s) => s + 100);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between mb-6 text-lg font-semibold">
        <div>Score: {score}</div>
        <div>Moves: {moves}</div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);

          return (
            <motion.div
              key={card.id}
              className={`aspect-square cursor-pointer rounded-lg p-4 flex items-center justify-center text-center 
                ${isMatched ? "bg-green-200" : "bg-indigo-100"} 
                ${isFlipped ? "bg-indigo-200" : "bg-indigo-100"}`}
              onClick={() => handleFlip(index)}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <AnimatePresence mode="wait">
                {isFlipped ? (
                  <motion.div
                    key="back"
                    initial={{ rotateY: -180 }}
                    animate={{ rotateY: 0 }}
                    className="[transform:rotateY(180deg)]"
                  >
                    {card.content}
                  </motion.div>
                ) : (
                  <motion.div key="front">❓</motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FlashcardGame;
