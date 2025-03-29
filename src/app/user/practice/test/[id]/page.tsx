"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check, X, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

type QuestionType = "multiple-choice" | "write-answer" | "true-false";

interface Question {
  type: QuestionType;
  word: Word;
  options?: string[];
  correctAnswer: string;
}

export default function TestPage({ params }: { params: { id: string } }) {
  const [set, setSet] = useState<GetPracticeSetDetailsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await api.fetchPracticeSetDetailsById(id as string);
      setSet(data);
      if (data.words.length > 0) {
        generateQuestions(data.words);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const generateQuestions = (words: Word[]) => {
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    const newQuestions: Question[] = [];

    shuffledWords.forEach((word) => {
      const questionTypes: QuestionType[] = [
        "multiple-choice",
        "write-answer",
        "true-false",
      ];
      const randomType =
        questionTypes[Math.floor(Math.random() * questionTypes.length)];

      let question: Question;

      switch (randomType) {
        case "multiple-choice":
          const incorrectOptions = shuffledWords
            .filter((w) => w.id !== word.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((w) => w.description);

          const allOptions = [...incorrectOptions, word.description].sort(
            () => Math.random() - 0.5,
          );

          question = {
            type: "multiple-choice",
            word,
            options: allOptions,
            correctAnswer: word.description,
          };
          break;

        case "write-answer":
          question = {
            type: "write-answer",
            word,
            correctAnswer: word.word,
          };
          break;

        case "true-false":
          const isCorrectPairing = Math.random() > 0.5;
          const randomIncorrectWord = shuffledWords
            .filter((w) => w.id !== word.id)
            .sort(() => Math.random() - 0.5)[0];

          question = {
            type: "true-false",
            word: {
              ...word,
              description: isCorrectPairing
                ? word.description
                : randomIncorrectWord.description,
            },
            correctAnswer: isCorrectPairing ? "true" : "false",
          };
          break;
      }

      newQuestions.push(question);
    });

    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setTestCompleted(false);
  };

  const handleAnswerSubmit = () => {
    if (isAnswered || !questions[currentQuestionIndex]) return;

    const currentQuestion = questions[currentQuestionIndex];
    let correct = false;

    if (currentQuestion.type === "write-answer") {
      correct =
        selectedAnswer.trim().toLowerCase() ===
        currentQuestion.correctAnswer.toLowerCase();
    } else {
      correct = selectedAnswer === currentQuestion.correctAnswer;
    }

    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      setTestCompleted(true);
    }
  };

  const restartTest = () => {
    if (set) {
      generateQuestions(set.words);
    }
  };

  const calculateSuccessRate = () => {
    const successPercent = (score / questions.length) * 100;
    const failPercent = 100 - successPercent;
    return { successPercent, failPercent };
  };

  const renderSummaryPage = () => {
    const { successPercent, failPercent } = calculateSuccessRate();
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Test Completed!</h1>
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
          You successfully answered {score} out of {questions.length} questions.
        </p>
        <p className="text-muted-foreground mb-6">
          Failed answers: {questions.length - score}
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={restartTest} className="hover:bg-forest-700">
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
          <span>Loading test questions...</span>
        </div>
        <div className="h-8 w-1/3 bg-muted animate-pulse rounded mb-2"></div>
        <div className="h-4 w-1/4 bg-muted animate-pulse rounded mb-8"></div>
        <div className="h-[400px] bg-muted animate-pulse rounded"></div>
      </div>
    );
  }

  if (!set || questions.length === 0) {
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

  if (testCompleted) {
    return renderSummaryPage();
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            if (id == "words-library") {
              router.push("/user/words");
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
        <h1 className="text-3xl font-bold ">{set.title} - Test</h1>
        <p className="text-muted-foreground">{set.description}</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <Badge variant="outline">Score: {score}</Badge>
          </div>
          <Progress
            value={((currentQuestionIndex + 1) / questions.length) * 100}
            className="h-2"
          />
        </div>

        <Card className="w-full max-w-2xl p-6 shadow-custom border-forest-100">
          {currentQuestion.type === "multiple-choice" && (
            <div>
              <h2 className="text-xl font-bold mb-6">
                What is the definition of "{currentQuestion.word.word}"?
              </h2>

              <RadioGroup
                value={selectedAnswer}
                onValueChange={setSelectedAnswer}
                className="mb-6"
              >
                {currentQuestion.options?.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 p-3 rounded-md ${
                      isAnswered && option === currentQuestion.correctAnswer
                        ? "bg-green-100 dark:bg-green-900/20"
                        : isAnswered && option === selectedAnswer
                          ? "bg-red-100 dark:bg-red-900/20"
                          : ""
                    }`}
                  >
                    <RadioGroupItem
                      value={option}
                      id={`option-${index}`}
                      disabled={isAnswered}
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                    {isAnswered && option === currentQuestion.correctAnswer && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    {isAnswered &&
                      option === selectedAnswer &&
                      option !== currentQuestion.correctAnswer && (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {currentQuestion.type === "write-answer" && (
            <div>
              <h2 className="text-xl font-bold mb-6">
                Write the word that matches this definition:
              </h2>
              <p className="mb-6 p-4 bg-muted rounded-md">
                {currentQuestion.word.description}
              </p>

              <div className="mb-6">
                <Input
                  placeholder="Type your answer"
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  disabled={isAnswered}
                  className={
                    isAnswered
                      ? isCorrect
                        ? "border-green-500"
                        : "border-red-500"
                      : ""
                  }
                />

                {isAnswered && (
                  <div className="mt-2">
                    {isCorrect ? (
                      <p className="text-green-500 flex items-center">
                        <Check className="h-4 w-4 mr-2" /> Correct!
                      </p>
                    ) : (
                      <p className="text-red-500 flex items-center">
                        <X className="h-4 w-4 mr-2" /> Incorrect. The correct
                        answer is "{currentQuestion.correctAnswer}
                        ".
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentQuestion.type === "true-false" && (
            <div>
              <h2 className="text-xl font-bold mb-6">True or False?</h2>
              <p className="mb-4">
                The definition of "{currentQuestion.word.word}" is:
              </p>
              <p className="mb-6 p-4 bg-muted rounded-md">
                {currentQuestion.word.description}
              </p>

              <RadioGroup
                value={selectedAnswer}
                onValueChange={setSelectedAnswer}
                className="mb-6"
              >
                <div
                  className={`flex items-center space-x-2 p-3 rounded-md ${
                    isAnswered && "true" === currentQuestion.correctAnswer
                      ? "bg-green-100 dark:bg-green-900/20"
                      : isAnswered &&
                          "true" === selectedAnswer &&
                          "true" !== currentQuestion.correctAnswer
                        ? "bg-red-100 dark:bg-red-900/20"
                        : ""
                  }`}
                >
                  <RadioGroupItem
                    value="true"
                    id="true"
                    disabled={isAnswered}
                  />
                  <Label htmlFor="true" className="cursor-pointer">
                    True
                  </Label>
                  {isAnswered && "true" === currentQuestion.correctAnswer && (
                    <Check className="h-5 w-5 text-green-500 ml-auto" />
                  )}
                  {isAnswered &&
                    "true" === selectedAnswer &&
                    "true" !== currentQuestion.correctAnswer && (
                      <X className="h-5 w-5 text-red-500 ml-auto" />
                    )}
                </div>

                <div
                  className={`flex items-center space-x-2 p-3 rounded-md ${
                    isAnswered && "false" === currentQuestion.correctAnswer
                      ? "bg-green-100 dark:bg-green-900/20"
                      : isAnswered &&
                          "false" === selectedAnswer &&
                          "false" !== currentQuestion.correctAnswer
                        ? "bg-red-100 dark:bg-red-900/20"
                        : ""
                  }`}
                >
                  <RadioGroupItem
                    value="false"
                    id="false"
                    disabled={isAnswered}
                  />
                  <Label htmlFor="false" className="cursor-pointer">
                    False
                  </Label>
                  {isAnswered && "false" === currentQuestion.correctAnswer && (
                    <Check className="h-5 w-5 text-green-500 ml-auto" />
                  )}
                  {isAnswered &&
                    "false" === selectedAnswer &&
                    "false" !== currentQuestion.correctAnswer && (
                      <X className="h-5 w-5 text-red-500 ml-auto" />
                    )}
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="bg-forest hover:bg-forest-700 text-cream"
            >
              Check Answer
            </Button>
            <Button
              onClick={handleNextQuestion}
              className="flex items-center bg-forest hover:bg-forest-700 text-cream"
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "See Results"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
