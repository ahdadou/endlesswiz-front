"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/clients/api/api";
import {
  GetPracticeSetDetailsResponse,
  PracticeWordResponse,
} from "@/clients/types/apiTypes";

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

export default function FlashcardsPage() {
  const [set, setSet] = useState<GetPracticeSetDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
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
    // Update progress
    if (shuffledWords.length > 0) {
      setProgress(((currentIndex + 1) / shuffledWords.length) * 100);
    }
  }, [currentIndex, shuffledWords.length]);

  const handleNext = () => {
    if (currentIndex < shuffledWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleShuffle = () => {
    setShuffledWords([...shuffledWords].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setFlipped(false);
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
          <span>Loading flashcards...</span>
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
        <h1 className="text-3xl font-bold ">{set.title} - Flashcards</h1>
        <p className="text-muted-foreground">{set.description}</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Card {currentIndex + 1} of {shuffledWords.length}
            </span>
            <Button variant="outline" size="sm" onClick={handleShuffle}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Shuffle
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <div className="relative w-[60%] h-[50vh]">
          <motion.div
            className="absolute w-full h-full rounded-lg shadow-lg flex items-center justify-center p-6 cursor-pointer"
            style={{ backfaceVisibility: "hidden" }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            onClick={handleFlip}
          >
            <p className="text-xl text-gray-800">
              {shuffledWords[currentIndex].word}
            </p>
          </motion.div>
          <motion.div
            className="absolute w-full h-full rounded-lg shadow-lg flex items-center justify-center p-6 cursor-pointer"
            style={{ backfaceVisibility: "hidden", rotateY: 180 }}
            animate={{ rotateY: flipped ? 0 : 180 }}
            transition={{ duration: 0.6 }}
            onClick={handleFlip}
          >
            <p className="text-xl text-gray-800">
              {shuffledWords[currentIndex].description}
            </p>
          </motion.div>
        </div>
        <div className="flex justify-between items-center w-full max-w-2xl mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="border-forest hover:bg-forest hover:text-cream"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={speakWord}
            className="border-forest hover:bg-forest hover:text-cream"
          >
            <Volume2 className="h-4 w-4" />
            <span className="sr-only">Speak</span>
          </Button>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentIndex === shuffledWords.length - 1}
            className="border-forest hover:bg-forest hover:text-cream"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
