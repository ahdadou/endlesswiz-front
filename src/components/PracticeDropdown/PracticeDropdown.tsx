"use client";
import { useState } from "react";
import {
  ChevronDown,
  BookOpen,
  PenTool,
  Brain,
  Puzzle,
  Gamepad2,
} from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust import path
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Adjust import path
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Adjust import path

interface PracticeDropdownProps {
  hasNoWords: boolean;
  handlePractice: (mode: string) => void;
}

const PracticeDropdown = ({
  hasNoWords,
  handlePractice,
}: PracticeDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <DropdownMenu open={open && !hasNoWords} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  className={`flex items-center gap-2 ${hasNoWords ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !hasNoWords && setOpen(true)} // Only open if there are words
                >
                  Practice <ChevronDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => {
                  handlePractice("flashcards");
                  setOpen(false); // Close dropdown after selection
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Flashcards</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handlePractice("test");
                  setOpen(false);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <PenTool className="h-4 w-4" />
                <span>Test</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handlePractice("learn");
                  setOpen(false);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Brain className="h-4 w-4" />
                <span>Learn</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handlePractice("puzzle");
                  setOpen(false);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Puzzle className="h-4 w-4" />
                <span>Word Puzzle</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handlePractice("hangman");
                  setOpen(false);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Gamepad2 className="h-4 w-4" />
                <span>Hangman</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {hasNoWords && (
            <TooltipContent>
              <p>Still No Word Exist</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PracticeDropdown;
