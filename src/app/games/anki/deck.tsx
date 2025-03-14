import { createContext, useContext, useState, useEffect } from 'react';

interface Card {
  id: number;
  front: string;
  back: string;
  interval: number;
  nextReview: Date;
}

interface Deck {
  id: number;
  name: string;
  cards: Card[];
}

interface DecksContextType {
  decks: Deck[];
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
}

const DecksContext = createContext<DecksContextType | undefined>(undefined);

export function DecksProvider({ children }: { children: React.ReactNode }) {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const savedDecks = localStorage.getItem('decks');
    if (savedDecks) {
      setDecks(
        JSON.parse(savedDecks, (key, value) => {
          if (key === 'nextReview') return new Date(value);
          return value;
        })
      );
    }
  }, []);

  useEffect(() => {
    if (decks.length > 0) {
      localStorage.setItem('decks', JSON.stringify(decks));
    }
  }, [decks]);

  return (
    <DecksContext.Provider value={{ decks, setDecks }}>
      {children}
    </DecksContext.Provider>
  );
}

export function useDecks() {
  const context = useContext(DecksContext);
  if (!context) {
    throw new Error('useDecks must be used within a DecksProvider');
  }
  return context;
}