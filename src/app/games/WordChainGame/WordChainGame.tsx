// components/WordChainGame.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const data = [
    { word: 'Resilience', meaning: 'The capacity to recover quickly from difficulties; toughness.' },
    { word: 'Ephemeral', meaning: 'Lasting for a very short time.' },
    { word: 'Serendipity', meaning: 'The occurrence of events by chance in a happy or beneficial way.' },
    { word: 'Euphoria', meaning: 'A feeling or state of intense excitement and happiness.' },
    { word: 'Ubiquitous', meaning: 'Present, appearing, or found everywhere.' },
    { word: 'Pernicious', meaning: 'Having a harmful effect, especially in a gradual or subtle way.' },
    { word: 'Ineffable', meaning: 'Too great or extreme to be expressed or described in words.' },
    { word: 'Quintessential', meaning: 'Representing the most perfect or typical example of a quality or class.' }
  ];


const WordChainGame = ({ words = data }: { words: { word: string; meaning: string }[] }) => {
  const [chain, setChain] = useState<string[]>([]);
  const [currentLetter, setCurrentLetter] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [inputWord, setInputWord] = useState('');

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const validateWord = (word: string) => {
    return words.some(w => w.word.toLowerCase() === word.toLowerCase()) &&
           word.toLowerCase().startsWith(currentLetter);
  };

  const handleSubmit = () => {
    if (validateWord(inputWord)) {
      setChain([...chain, inputWord]);
      setCurrentLetter(inputWord.slice(-1));
      setScore(s => s + 100);
      setInputWord('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 flex justify-between">
        <div>Score: {score}</div>
        <div>Time Left: {timeLeft}s</div>
      </div>
      
      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Word Chain</h3>
        <div className="flex flex-wrap gap-2">
          {chain.map((word, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-indigo-100 px-3 py-1 rounded-full"
            >
              {word}
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4">
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          className="flex-1 border-2 p-3 rounded-lg"
          placeholder={`Start with "${currentLetter}"`}
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default WordChainGame;