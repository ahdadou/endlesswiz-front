"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/clients/api/api";
import { GetPracticeSetDetailsResponse } from "@/clients/types/apiTypes";
import VictoryAnimation from "@/components/effects/victory-animation";
import SoundEffects from "@/utils/sound-effects";

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
  const [isCompleted, setIsCompleted] = useState(false); // New state to toggle completion view
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await api.fetchPracticeSetDetailsById(id as string);
      setSet(data);
      const shuffled = [...data.words].sort(() => Math.random() - 0.5);
      setShuffledWords(shuffled);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (shuffledWords.length > 0) {
      setProgress(((currentIndex + 1) / shuffledWords.length) * 100);
    }
  }, [currentIndex, shuffledWords.length]);

  const handleNext = () => {
    if (currentIndex < shuffledWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      // Show completion view instead of redirecting
      setIsCompleted(true);
      SoundEffects.play("correct"); // Play sound when completion view is shown
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
    setIsCompleted(false); // Reset to flashcard view
  };

  const speakWord = () => {
    if ("speechSynthesis" in window && shuffledWords[currentIndex]) {
      const utterance = new SpeechSynthesisUtterance(
        shuffledWords[currentIndex].word
      );
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRestart = () => {
    setShuffledWords([...shuffledWords].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setFlipped(false);
    setIsCompleted(false); // Reset to flashcard view
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
        <Button
          onClick={() => {
            if (id == "words-library") {
              router.push("/user/words");
              return;
            }
            router.push("/user/practice");
          }}
        >
          Back to Sets
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 relative min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (id == "words-library") {
              router.push("/user/words");
              return;
            }
            router.push("/user/practice");
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Back to sets</span>
        </Button>
        <span className="text-muted-foreground">Back to sets</span>
      </div>

      {/* Victory Animation (shown only in completion view) */}
      <VictoryAnimation isActive={isCompleted} />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{set.title} - Flashcards</h1>
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
                  className="border-forest hover:bg-forest hover:text-cream"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="completion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">🎉 Amazing Job!</h1>
              <p className="text-xl text-gray-600 mb-6">
                You've completed all the flashcards in{" "}
                <span className="font-semibold">{set.title}</span>!
              </p>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-md mx-auto mb-8"
            >
              <Card className="p-6 bg-white shadow-lg border-t-4 border-forest-500">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mr-3" />
                  <div className="text-left">
                    <p className="text-lg font-semibold text-gray-800">
                      Completed
                    </p>
                    <p className="text-2xl font-bold text-forest-600">
                      {set.words.length}/{set.words.length}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="outline"
                onClick={handleRestart}
                className=" px-6 py-3 rounded-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart Flashcards
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
