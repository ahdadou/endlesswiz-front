"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { RefreshCw, Volume2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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

export default function HangmanPage() {
  const [set, setSet] = useState<GetPracticeSetDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost" | "completed">(
    "playing",
  );
  const [score, setScore] = useState(0);
  const [hint, setHint] = useState(false);
  const maxWrongGuesses = 6;
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
    // Reset game state when moving to a new word
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus("playing");
    setHint(false);
  }, [currentWordIndex]);

  const currentWord = shuffledWords[currentWordIndex]?.word.toUpperCase() || "";
  // Create masked word with only guessed letters visible
  const maskedWord = currentWord
    .split("")
    .map((letter) =>
      guessedLetters.includes(letter) || letter === " " ? letter : "_",
    )
    .join(" ");
  // Check if all letters have been guessed
  const hasWon = currentWord
    .split("")
    .every(
      (letter) =>
        guessedLetters.includes(letter) ||
        letter === " " ||
        !letter.match(/[A-Z]/i),
    );
  // Check if player has lost
  const hasLost = wrongGuesses >= maxWrongGuesses;

  useEffect(() => {
    if (hasWon) {
      setGameStatus("won");
      setScore(score + 1);
    } else if (hasLost) {
      setGameStatus("lost");
    }
  }, [hasWon, hasLost]);

  const handleLetterGuess = (letter: string) => {
    if (gameStatus !== "playing" || guessedLetters.includes(letter)) return;
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    if (!currentWord.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < shuffledWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Game completed
      setGameStatus("completed");
    }
  };

  const resetGame = () => {
    if (!set) return;
    setShuffledWords([...set.words].sort(() => Math.random() - 0.5));
    setCurrentWordIndex(0);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus("playing");
    setScore(0);
    setHint(false);
  };

  const showHint = () => {
    setHint(true);
  };

  const speakWord = () => {
    if ("speechSynthesis" in window && currentWord) {
      const utterance = new SpeechSynthesisUtterance(currentWord);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Generate alphabet buttons
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Draw hangman figure based on wrong guesses
  const hangmanFigure = () => {
    const parts = [
      <circle
        key="head"
        cx="50"
        cy="25"
        r="10"
        className="stroke-current fill-none"
      />,
      <line
        key="body"
        x1="50"
        y1="35"
        x2="50"
        y2="70"
        className="stroke-current"
      />,
      <line
        key="arm1"
        x1="50"
        y1="45"
        x2="30"
        y2="55"
        className="stroke-current"
      />,
      <line
        key="arm2"
        x1="50"
        y1="45"
        x2="70"
        y2="55"
        className="stroke-current"
      />,
      <line
        key="leg1"
        x1="50"
        y1="70"
        x2="30"
        y2="90"
        className="stroke-current"
      />,
      <line
        key="leg2"
        x1="50"
        y1="70"
        x2="70"
        y2="90"
        className="stroke-current"
      />,
    ];
    return (
      <svg width="100" height="100" viewBox="0 0 100 100" className="stroke-2">
        {/* Gallows */}
        <line x1="10" y1="95" x2="90" y2="95" className="stroke-current" />
        <line x1="30" y1="95" x2="30" y2="5" className="stroke-current" />
        <line x1="30" y1="5" x2="50" y2="5" className="stroke-current" />
        <line x1="50" y1="5" x2="50" y2="15" className="stroke-current" />
        {/* Draw body parts based on wrong guesses */}
        {parts.slice(0, wrongGuesses)}
      </svg>
    );
  };

  const calculateSuccessRate = () => {
    const successPercent = (score / shuffledWords.length) * 100;
    const failPercent = 100 - successPercent;
    return { successPercent, failPercent };
  };

  const renderSummaryPage = () => {
    const { successPercent, failPercent } = calculateSuccessRate();
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Game Completed!</h1>
        <div className="relative w-48 h-48 mx-auto mb-4">
          <svg className="transform -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.91549430918954"
              fill="none"
              stroke="#e53e3e"
              strokeWidth="3"
              strokeDasharray={`${failPercent} ${100 - failPercent}`}
              strokeDashoffset="25"
              strokeLinecap="round"
            ></circle>
            <circle
              cx="18"
              cy="18"
              r="15.91549430918954"
              fill="none"
              stroke="#38a169"
              strokeWidth="3"
              strokeDasharray={`${successPercent} ${100 - successPercent}`}
              strokeDashoffset="25"
              strokeLinecap="round"
            ></circle>
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
            {Math.round(successPercent)}%
          </div>
        </div>
        <p className="text-muted-foreground mb-4">
          You successfully guessed {score} out of {shuffledWords.length} words.
        </p>
        <p className="text-muted-foreground mb-6">
          Failed words: {shuffledWords.length - score}
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={resetGame} className="hover:bg-forest-700">
            Play Again
          </Button>
          <Button
            onClick={() => {
              if (id == "words-library") {
                router.push("/user/words");
                return;
              }
              router.push("/user/practice");
            }}
            variant="outline"
          >
            Back to Sets
          </Button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-2 mb-8 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Loading hangman game...</span>
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

  if (gameStatus === "completed") {
    return renderSummaryPage();
  }

  return (
    <div className="container mx-auto py-8 px-4">
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold ">{set.title} - Hangman</h1>
        <p className="text-muted-foreground">{set.description}</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Word {currentWordIndex + 1} of {shuffledWords.length}
            </span>
            <div className="flex gap-2">
              <Badge variant="outline">Score: {score}</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={resetGame}
                className="border-forest hover:bg-forest hover:text-cream"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Restart
              </Button>
            </div>
          </div>
          <Progress
            value={((currentWordIndex + 1) / shuffledWords.length) * 100}
            className="h-2"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl mb-8">
          <Card className="flex-1 p-6 flex flex-col items-center justify-center shadow-custom border-forest-100">
            {hangmanFigure()}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                {maxWrongGuesses - wrongGuesses} attempts remaining
              </p>
            </div>
          </Card>
          <Card className="flex-1 p-6 shadow-custom border-forest-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">{maskedWord}</h2>
              {gameStatus === "playing" && (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {alphabet.map((letter) => (
                      <Button
                        key={letter}
                        variant={
                          guessedLetters.includes(letter)
                            ? currentWord.includes(letter)
                              ? "default"
                              : "destructive"
                            : "outline"
                        }
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => handleLetterGuess(letter)}
                        disabled={
                          guessedLetters.includes(letter) ||
                          gameStatus !== "playing"
                        }
                      >
                        {letter}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={showHint}
                      disabled={hint}
                    >
                      Hint
                    </Button>
                    <Button variant="outline" size="sm" onClick={speakWord}>
                      <Volume2 className="h-4 w-4" />
                      <span className="sr-only">Speak</span>
                    </Button>
                  </div>
                  {hint && shuffledWords[currentWordIndex] && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="text-sm">
                        {shuffledWords[currentWordIndex].description}
                      </p>
                    </div>
                  )}
                </>
              )}
              {gameStatus === "won" && (
                <div className="mt-4">
                  <p className="text-green-500 font-bold mb-2">Correct!</p>
                  <p className="mb-4">
                    {shuffledWords[currentWordIndex]?.description}
                  </p>
                  <Button
                    onClick={handleNextWord}
                    className="hover:bg-forest-700"
                    variant="default"
                  >
                    Next Word
                  </Button>
                </div>
              )}
              {gameStatus === "lost" && (
                <div className="mt-4">
                  <p className="text-destructive font-bold mb-2">Game Over!</p>
                  <p className="mb-2">The word was: {currentWord}</p>
                  <p className="mb-4">
                    {shuffledWords[currentWordIndex]?.description}
                  </p>
                  <Button
                    onClick={handleNextWord}
                    className="hover:bg-forest-700"
                    variant="default"
                  >
                    Next Word
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}