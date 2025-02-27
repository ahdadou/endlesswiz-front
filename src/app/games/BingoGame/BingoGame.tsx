// components/BingoGame.tsx
'use client';
import { useState, useEffect } from 'react';

const BINGO_SIZE = 5;

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


const BingoGame = ({ words = data }: { words: { word: string; meaning: string }[] }) => {
  const [board, setBoard] = useState<string[][]>([]);
  const [calledDefinitions, setCalledDefinitions] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, BINGO_SIZE*BINGO_SIZE);
    const newBoard = [];
    while(shuffled.length) newBoard.push(shuffled.splice(0, BINGO_SIZE));
    setBoard(newBoard.map(row => row.map(cell => cell.word)));
  };

  const callDefinition = () => {
    const remaining = words.filter(w => !calledDefinitions.includes(w.meaning));
    const randomDef = remaining[Math.floor(Math.random() * remaining.length)].meaning;
    setCalledDefinitions([...calledDefinitions, randomDef]);
  };

  const checkBingo = (row: number, col: number) => {
    // Implement bingo line checking logic
    const newScore = score + 50;
    setScore(newScore);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Bingo Score: {score}</h2>
        <button
          onClick={callDefinition}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg mt-4"
        >
          Call Next Definition
        </button>
      </div>
      
      <div className="grid grid-cols-5 gap-2 mb-6">
        {board.map((row, i) => 
          row.map((word, j) => (
            <div
              key={`${i}-${j}`}
              className={`aspect-square flex items-center justify-center text-center p-2 border-2 rounded-lg cursor-pointer
                ${calledDefinitions.includes(words.find(w => w.word === word)?.meaning || '')
                  ? 'bg-green-200 border-green-500'
                  : 'bg-gray-100 border-gray-300'}`}
              onClick={() => checkBingo(i, j)}
            >
              {word}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BingoGame;