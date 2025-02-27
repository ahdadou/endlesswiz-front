// components/WordPuzzleGame.tsx
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

const WordPuzzleGame = ({ words = data  }: { words: { word: string; meaning: string }[] }) => {
  const [currentWord, setCurrentWord] = useState<{ word: string; shuffled: string } | null>(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    newWord();
  }, []);

  const newWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord({
      word: randomWord.word,
      shuffled: randomWord.word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('')
    });
    setUserInput('');
  };

  const checkAnswer = () => {
    if (userInput.toLowerCase() === currentWord?.word.toLowerCase()) {
      setScore(s => s + 100);
      setFeedback('Correct! +100 points');
      setTimeout(() => {
        setFeedback('');
        newWord();
      }, 1000);
    } else {
      setLives(l => l - 1);
      setFeedback('Try again!');
      setTimeout(() => setFeedback(''), 1000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-6 flex justify-between text-lg font-semibold">
        <div>Score: {score}</div>
        <div>Lives: {lives}</div>
      </div>

      {lives > 0 ? (
        <>
          <div className="mb-4 text-2xl font-bold">
            <motion.div
              key={currentWord?.word}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {currentWord?.shuffled}
            </motion.div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="border-2 p-2 rounded-lg mr-2"
              placeholder="Unscramble the word"
            />
            <button
              onClick={checkAnswer}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Check
            </button>
          </div>

          <motion.div
            animate={{ opacity: feedback ? 1 : 0 }}
            className={`text-lg font-semibold ${
              feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {feedback}
          </motion.div>
        </>
      ) : (
        <div className="text-2xl font-bold text-red-600">
          Game Over! Final Score: {score}
          <button
            onClick={() => {
              setLives(3);
              setScore(0);
              newWord();
            }}
            className="block mt-4 mx-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default WordPuzzleGame;