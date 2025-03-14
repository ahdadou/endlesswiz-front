"use client";

import { useState } from "react";
import { useDecks } from "@/app/games/anki/deck";
import Flashcard from "@/app/games/anki/Flashcard";
import { useParams, useRouter } from "next/navigation";

export default function ReviewPage() {
  const router = useRouter();
  const { id } = useParams();
  const { decks, setDecks } = useDecks();
  const deck = decks.find((d) => d.id === Number(id));

  if (!deck) {
    return <div className="p-6 text-red-600">Deck not found</div>;
  }

  const [cardsToReview] = useState(
    deck.cards.filter((card) => new Date(card.nextReview) <= new Date()),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (cardsToReview.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <p className="text-gray-600 text-lg">No cards to review right now.</p>
      </div>
    );
  }

  const currentCard = cardsToReview[currentIndex];

  const handleRating = (rating: "again" | "good" | "easy") => {
    let interval = currentCard.interval || 1;
    switch (rating) {
      case "again":
        interval = 1;
        break;
      case "good":
        interval *= 1.5;
        break;
      case "easy":
        interval *= 2;
        break;
    }
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + Math.round(interval));
    const updatedCard = { ...currentCard, interval, nextReview };

    setDecks(
      decks.map((d) =>
        d.id === deck.id
          ? {
              ...d,
              cards: d.cards.map((c) =>
                c.id === currentCard.id ? updatedCard : c,
              ),
            }
          : d,
      ),
    );

    setIsFlipped(false);
    if (currentIndex < cardsToReview.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Review session complete!");
      router.push(`/decks/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Review Session</h1>
      <p className="text-gray-600 mb-6">
        Card {currentIndex + 1} of {cardsToReview.length}
      </p>
      <Flashcard
        front={currentCard.front}
        back={currentCard.back}
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />
      {isFlipped && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleRating("again")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Again
          </button>
          <button
            onClick={() => handleRating("good")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Good
          </button>
          <button
            onClick={() => handleRating("easy")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Easy
          </button>
        </div>
      )}
    </div>
  );
}
