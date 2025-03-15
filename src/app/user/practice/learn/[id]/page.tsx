"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight, Volume2, Check, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import api from "@/clients/api/api";
import { GetPracticeSetDetailsResponse } from "@/clients/types/apiTypes";

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

type LearnStep = "introduce" | "recall" | "review";

export default function LearnPage() {
  const [set, setSet] = useState<GetPracticeSetDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [step, setStep] = useState<LearnStep>("introduce");
  const [progress, setProgress] = useState(0);
  const [mastered, setMastered] = useState<string[]>([]);
  const [needsReview, setNeedsReview] = useState<string[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
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
    // Calculate overall progress
    if (shuffledWords.length > 0) {
      const totalSteps = shuffledWords.length * 2; // introduce + recall for each word
      const completedSteps = mastered.length + needsReview.length;
      setProgress((completedSteps / totalSteps) * 100);

      // Check if session is complete
      if (
        currentWordIndex >= shuffledWords.length &&
        step === "review" &&
        needsReview.length === 0
      ) {
        setSessionComplete(true);
      }
    }
  }, [
    currentWordIndex,
    shuffledWords.length,
    step,
    mastered.length,
    needsReview.length,
  ]);

  useEffect(() => {
    // Reset state when moving to a new word
    if (step === "introduce") {
      setShowAnswer(false);
    }
  }, [currentWordIndex, step]);

  const handleNextStep = () => {
    const currentWord = shuffledWords[currentWordIndex];
    if (!currentWord) return;

    if (step === "introduce") {
      setStep("recall");
      setShowAnswer(false);
    } else if (step === "recall") {
      if (currentWordIndex < shuffledWords.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setStep("introduce");
      } else {
        setStep("review");
        setCurrentWordIndex(0);
        // If no words need review, complete the session
        if (needsReview.length === 0) {
          setSessionComplete(true);
        }
      }
    } else if (step === "review") {
      // Remove the current word from review list
      setNeedsReview(needsReview.filter((id) => id !== currentWord.id));

      // Move to next review word or complete session
      if (needsReview.length > 1) {
        const nextReviewIndex = shuffledWords.findIndex(
          (word) => word.id !== currentWord.id && needsReview.includes(word.id),
        );
        if (nextReviewIndex !== -1) {
          setCurrentWordIndex(nextReviewIndex);
        }
      } else {
        setSessionComplete(true);
      }
    }
  };

  const handleKnowIt = () => {
    const currentWord = shuffledWords[currentWordIndex];
    if (!currentWord) return;

    setMastered([...mastered, currentWord.id]);
    handleNextStep();
  };

  const handleNeedReview = () => {
    const currentWord = shuffledWords[currentWordIndex];
    if (!currentWord) return;

    if (!needsReview.includes(currentWord.id)) {
      setNeedsReview([...needsReview, currentWord.id]);
    }
    handleNextStep();
  };

  const speakWord = () => {
    const currentWord = shuffledWords[currentWordIndex];
    if (!currentWord) return;

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const resetSession = () => {
    if (!set) return;

    const shuffled = [...set.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setShuffledWords(shuffled);
    setCurrentWordIndex(0);
    setStep("introduce");
    setMastered([]);
    setNeedsReview([]);
    setShowAnswer(false);
    setSessionComplete(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-8 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Loading learn mode...</span>
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

  if (sessionComplete) {
    const masteredCount = mastered.length;
    const totalCount = shuffledWords.length;
    const percentage = Math.round((masteredCount / totalCount) * 100);

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
          <h1 className="text-2xl font-bold">{set.title} - Learn</h1>
          <p className="text-muted-foreground">{set.description}</p>
        </div>

        <Card className="w-full max-w-2xl p-8 text-center mx-auto">
          <h2 className="text-2xl font-bold mb-4">
            Learning Session Complete!
          </h2>
          <p className="text-xl mb-6">
            You've mastered {masteredCount} out of {totalCount} words (
            {percentage}%)
          </p>

          <div className="mb-8">
            {percentage >= 80 ? (
              <div className="text-green-500 font-bold text-lg">
                Excellent progress!
              </div>
            ) : percentage >= 60 ? (
              <div className="text-amber-500 font-bold text-lg">
                Good work! Keep practicing!
              </div>
            ) : (
              <div className="text-blue-500 font-bold text-lg">
                Great start! Continue learning!
              </div>
            )}
          </div>

          <Button onClick={resetSession}>Start New Session</Button>
        </Card>
      </div>
    );
  }

  const currentWord = shuffledWords[currentWordIndex];
  const isReviewMode = step === "review";
  const currentWordInReview =
    isReviewMode && needsReview.includes(currentWord.id);

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
        <h1 className="text-3xl font-bold text-forest">{set.title} - Learn</h1>
        <p className="text-muted-foreground">{set.description}</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              {isReviewMode
                ? "Review Phase"
                : `Word ${currentWordIndex + 1} of ${shuffledWords.length}`}
            </span>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="bg-green-100 dark:bg-green-900/20"
              >
                Mastered: {mastered.length}
              </Badge>
              <Badge
                variant="outline"
                className="bg-amber-100 dark:bg-amber-900/20"
              >
                To Review: {needsReview.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="w-full max-w-2xl p-6 shadow-custom border-forest-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              {isReviewMode
                ? "Review Words"
                : step === "introduce"
                  ? "Learn New Word"
                  : "Test Your Memory"}
            </h2>
            <Button variant="outline" size="sm" onClick={speakWord}>
              <Volume2 className="h-4 w-4" />
              <span className="sr-only">Speak</span>
            </Button>
          </div>

          <Separator className="mb-6" />

          {step === "introduce" && (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">{currentWord.word}</h3>
              <p className="text-lg mb-8">{currentWord.description}</p>

              <div className="flex justify-center">
                <Button
                  onClick={handleNextStep}
                  className="bg-forest hover:bg-forest-700 text-cream"
                >
                  Got it <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === "recall" && (
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">
                {currentWord.description}
              </h3>

              {!showAnswer ? (
                <div className="mb-8">
                  <p className="text-muted-foreground mb-4">
                    Can you recall the word?
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowAnswer(true)}
                    className="border-forest text-forest hover:bg-forest hover:text-cream"
                  >
                    Show Answer
                  </Button>
                </div>
              ) : (
                <div className="mb-8">
                  <p className="text-2xl font-bold text-primary mb-4">
                    {currentWord.word}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Did you remember it correctly?
                  </p>
                </div>
              )}

              {showAnswer && (
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-forest-300 text-forest-500 hover:bg-forest-100"
                    onClick={handleNeedReview}
                  >
                    <X className="h-4 w-4" />
                    Need Review
                  </Button>
                  <Button
                    className="flex items-center gap-2 bg-forest hover:bg-forest-700 text-cream"
                    onClick={handleKnowIt}
                  >
                    <Check className="h-4 w-4" />I Know It
                  </Button>
                </div>
              )}
            </div>
          )}

          {step === "review" && currentWordInReview && (
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Review Word</h3>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md mb-6">
                <h4 className="text-2xl font-bold mb-2">{currentWord.word}</h4>
                <p className="text-lg">{currentWord.description}</p>
              </div>

              <Button onClick={handleNextStep}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
