'use client'

import { useState } from 'react';
import { useDecks } from '../games/anki/deck';
import Link from 'next/link';

export default function DecksPage() {
  const { decks, setDecks } = useDecks();
  const [newDeckName, setNewDeckName] = useState<string>('');

  const handleCreateDeck = () => {
    if (newDeckName.trim()) {
      const newDeck = {
        id: Date.now(),
        name: newDeckName,
        cards: [],
      };
      setDecks([...decks, newDeck]);
      setNewDeckName('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Decks</h1>
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          placeholder="Enter deck name (e.g., English Vocabulary)"
          className="border rounded-lg p-2 flex-grow"
        />
        <button
          onClick={handleCreateDeck}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Deck
        </button>
      </div>
      {decks.length === 0 ? (
        <p className="text-gray-600">No decks yet. Create one to start!</p>
      ) : (
        <ul className="space-y-4">
          {decks.map((deck) => (
            <li
              key={deck.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <Link href={`/decks/${deck?.id}`}>
                <span className="text-blue-600 text-lg font-semibold">{deck?.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}