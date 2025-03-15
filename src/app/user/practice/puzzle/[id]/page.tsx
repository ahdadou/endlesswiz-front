"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { RefreshCw, ArrowRight, Volume2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GetPracticeSetDetailsResponse } from "@/clients/types/apiTypes";
import api from "@/clients/api/api";

type Word = {
  id: string;
  word: string;
  description: string;
};

type StudySet = {
  id: string;
  title: string;
  description: string;
  words: Word[];
};

export default function PuzzlePage() {
  const [set, setSet] = useState<GetPracticeSetDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // Load the set data
      setIsLoading(true);
      const data = await api.fetchPracticeSetDetailsById(id as string);
      setSet(data);
      // Shuffle words initially
      const shuffled = [...data.words].sort(() => Math.random() - 0.5);
      setShuffledWords(shuffled);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (shuffledWords.length > 0) {
      resetPuzzle();
    }
  }, [currentIndex, shuffledWords]);

  const resetPuzzle = () => {
    if (!shuffledWords[currentIndex]) return;

    const currentWord = shuffledWords[currentIndex].word.toUpperCase() || "";
    // Remove spaces and special characters
    const cleanWord = currentWord.replace(/[^A-Z]/gi, "");

    // Scramble the letters
    const letters = cleanWord.split("");
    const scrambled = [...letters].sort(() => Math.random() - 0.5);

    setScrambledLetters(scrambled);
    setSelectedLetters([]);
    setIsCorrect(false);
    setShowHint(false);
  };

  const handleLetterClick = (letter: string, index: number) => {
    if (isCorrect) return;

    // Add letter to selected letters
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);

    // Remove letter from scrambled letters
    const newScrambled = [...scrambledLetters];
    newScrambled.splice(index, 1);
    setScrambledLetters(newScrambled);

    // Check if word is complete and correct
    const currentWord =
      shuffledWords[currentIndex]?.word.toUpperCase().replace(/[^A-Z]/gi, "") ||
      "";
    if (newSelected.join("") === currentWord) {
      setIsCorrect(true);
      setScore(score + 1);
    }
  };

  const handleSelectedLetterClick = (letter: string, index: number) => {
    if (isCorrect) return;

    // Remove letter from selected letters
    const newSelected = [...selectedLetters];
    newSelected.splice(index, 1);
    setSelectedLetters(newSelected);

    // Add letter back to scrambled letters
    setScrambledLetters([...scrambledLetters, letter]);
  };

  const handleNextWord = () => {
    if (currentIndex < shuffledWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Game completed
      alert(
        `Puzzle game completed! Your score: ${score}/${shuffledWords.length}`,
      );
      // Reset game
      setCurrentIndex(0);
      setScore(0);
    }
  };

  const handleReset = () => {
    resetPuzzle();
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const speakWord = () => {
    if ("speechSynthesis" in window && shuffledWords[currentIndex]) {
      const utterance = new SpeechSynthesisUtterance(
        shuffledWords[currentIndex].word,
      );
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-8 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Loading word puzzle...</span>
        </div>
        <div className="h-8 w-1/3 bg-muted animate-pulse rounded mb-2"></div>
        <div className="h-4 w-1/4 bg-muted animate-pulse rounded mb-8"></div>
        <div className="h-[400px] bg-muted animate-pulse rounded"></div>
      </div>
    );
  }

  if (!set || shuffledWords.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Set not found</h1>
        <p className="text-muted-foreground mb-6">
          The study set you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push("/user/practice")}>
          Back to Sets
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/user/practice")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to sets</span>
        </Button>
        <span className="text-muted-foreground">Back to sets</span>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-forest">
          {set.title} - Word Puzzle
        </h1>
        <p className="text-muted-foreground">{set.description}</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Word {currentIndex + 1} of {shuffledWords.length}
            </span>
            <div className="flex gap-2">
              <Badge variant="outline">Score: {score}</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="border-forest text-forest hover:bg-forest hover:text-cream"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          <Progress
            value={((currentIndex + 1) / shuffledWords.length) * 100}
            className="h-2"
          />
        </div>

        <Card className="w-full max-w-2xl p-6 shadow-custom border-forest-100">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold mb-2">Unscramble the Word</h2>
            <p className="text-muted-foreground">
              Arrange the letters to form the correct English word
            </p>
          </div>

          {/* Definition/Hint */}
          <div className="mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleHint}
              className="mb-2"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={speakWord}
              className="ml-2 mb-2"
            >
              <Volume2 className="h-4 w-4" />
              <span className="sr-only">Speak</span>
            </Button>

            {showHint && shuffledWords[currentIndex] && (
              <div className="p-3 bg-muted rounded-md">
                <p>{shuffledWords[currentIndex].description}</p>
              </div>
            )}
          </div>

          {/* Selected letters */}
          <div className="flex flex-wrap justify-center gap-2 min-h-[60px] mb-8 p-4 border rounded-md">
            {selectedLetters.map((letter, index) => (
              <Button
                key={`selected-${index}`}
                variant="default"
                size="lg"
                className="h-12 w-12 text-lg font-bold"
                onClick={() => handleSelectedLetterClick(letter, index)}
                disabled={isCorrect}
              >
                {letter}
              </Button>
            ))}
          </div>

          {/* Scrambled letters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {scrambledLetters.map((letter, index) => (
              <Button
                key={`scrambled-${index}`}
                variant="outline"
                size="lg"
                className="h-12 w-12 text-lg font-bold"
                onClick={() => handleLetterClick(letter, index)}
              >
                {letter}
              </Button>
            ))}
          </div>

          {/* Result and next button */}
          {isCorrect && (
            <div className="text-center">
              <p className="text-green-500 font-bold mb-4">Correct!</p>
              <Button
                onClick={handleNextWord}
                variant="default"
                className="flex items-center hover:bg-forest-700 "
              >
                Next Word
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
