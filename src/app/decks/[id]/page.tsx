"use client";

import Link from "next/link";
import { useDecks } from "@/app/games/anki/deck";
import { useRouter, useParams } from "next/navigation";

export default function DeckPage() {
  const router = useRouter();
  const { id } = useParams();
  const { decks, setDecks } = useDecks();
  const deck = decks.find((d) => d.id === Number(id));

  if (!deck) {
    return <div className="p-6 text-red-600">Deck not found</div>;
  }

  const handleAddCard = (front: string, back: string) => {
    const newCard = {
      id: Date.now(),
      front,
      back,
      interval: 1,
      nextReview: new Date(),
    };
    setDecks(
      decks.map((d) =>
        d.id === deck.id ? { ...d, cards: [...d.cards, newCard] } : d,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{deck.name}</h1>
      <Link href={`/decks/${id}/review`}>
        <span className="bg-green-600 text-white px-4 py-2 rounded-lg mb-6 inline-block hover:bg-green-700 transition">
          Start Review
        </span>
      </Link>

      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cards</h2>
      {deck.cards.length === 0 ? (
        <p className="text-gray-600">No cards yet. Add some below!</p>
      ) : (
        <ul className="space-y-4">
          {deck.cards.map((card) => (
            <li
              key={card.id}
              className="p-4 rounded-lg shadow-md flex flex-col gap-2"
            >
              <div>
                <span className="font-semibold">Front:</span> {card.front}
              </div>
              <div>
                <span className="font-semibold">Back:</span> {card.back}
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Add New Card
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const front = (e.target as any).front.value;
          const back = (e.target as any).back.value;
          if (front.trim() && back.trim()) {
            handleAddCard(front, back);
            (e.target as any).reset();
          }
        }}
        className="p-4 rounded-lg shadow-md space-y-4"
      >
        <input
          type="text"
          name="front"
          placeholder="Front (e.g., 'Hello')"
          className="border rounded-lg p-2 w-full"
        />
        <input
          type="text"
          name="back"
          placeholder="Back (e.g., 'Hola')"
          className="border rounded-lg p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Card
        </button>
      </form>
    </div>
  );
}
