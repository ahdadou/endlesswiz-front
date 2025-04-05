"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  BookOpen,
  ChevronLeft,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import api from "@/clients/api/api";
import { GetStory } from "@/clients/types/apiTypes";
import { formatTime } from "@/components/utils/TypeFormatUtils";
import { WordDictionaryComponent } from "@/components/WordDictionaryComponent/WordDictionaryComponent";

export default function StoryPage() {
  const params = useParams();
  const id = params.id as string;

  // State for fetched story data and loading
  const [story, setStory] = useState<GetStory | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State for audio and UI controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fontSize, setFontSize] = useState(16);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  const [showWordModal, setShowWordModal] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | undefined>(
    undefined
  );

  // Fetch story data from API and process content
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await api.fetchStory(id);
        // Clean content: remove backticks and replace <br> with proper line breaks
        const processedContent = response.content
        .replace(/`<br>`/g, "\n") // Replace <br> with newline
        .replace(/<br>/g, "\n") // Replace <br> with newline
        .replace(/\.\s+/g, ".\n") // Replace period followed by whitespace with period and newline
        .replace(/\n+/g, "\n") // Replace multiple newlines with single newline
        .replace(/\n+/g, "\n") // Replace multiple newlines with single newline
        .replace(/"/g, "") // Replace multiple newlines with single newline
        .trim(); // Trim leading/trailing whitespace

        setStory({ ...response, content: processedContent });
      } catch (error) {
        console.error("Failed to fetch story:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  // Sync audio progress with UI
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const newProgress = (currentTime / duration) * 100 || 0;
      setProgress(newProgress);

      // Update word highlighting based on progress
      const words =
        story?.content.split(/\s+/).filter((word) => word.length > 0) || [];
      const wordIndex = Math.floor((newProgress / 100) * words.length);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [story?.content, isPlaying]);

  const handleCloseModal = useCallback(() => {
    setShowWordModal(false);
    setSelectedWord(undefined);
  }, []);

  const handleWordClick = (word: string) => {
    const cleanedWord = word.replace(/[.,!?;:'"()]/g, "");
    setSelectedWord(cleanedWord);
    setShowWordModal(true);
  };

  // Handle loading state
  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  // Handle case where story is not found
  if (!story) {
    return <div className="container mx-auto px-4 py-8">Story not found</div>;
  }

  // Split the story content into lines for display
  const lines = story.content.split("\n");
  const words = story.content.split(/\s+/).filter((word) => word.length > 0);

  // Toggle play/pause for audio
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Skip back 5 seconds
  const skipBack = () => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - 5, 0);
      audioRef.current.currentTime = newTime;
      setProgress((newTime / audioRef.current.duration) * 100 || 0);
    }
  };

  // Skip forward 5 seconds
  const skipForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(
        audioRef.current.currentTime + 5,
        audioRef.current.duration
      );
      audioRef.current.currentTime = newTime;
      setProgress((newTime / audioRef.current.duration) * 100 || 0);
    }
  };

  // Change font size
  const changeFontSize = (increase: boolean) => {
    if (increase) {
      setFontSize((prevSize) => Math.min(prevSize + 2, 24));
    } else {
      setFontSize((prevSize) => Math.max(prevSize - 2, 12));
    }
  };

  return (
    <div className={`h-screen flex flex-col `}>
      {/* Top Navigation Bar */}
      <div className="border-b bg-background py-3 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link href="/user/stories">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Stories
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Book Cover and Info */}
        <div className="md:w-64 p-4 md:p-6 md:border-r bg-background">
          <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-md mb-4">
            <img
              src={story.cover}
              alt={story.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
              {story.level}
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold mb-2">{story.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {words.length} words • {Math.ceil(words.length / 200)} min read
            </span>
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm">Text Size:</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeFontSize(false)}
              disabled={fontSize <= 12}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeFontSize(true)}
              disabled={fontSize >= 24}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Story Text and Audio Controls */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Audio Controller */}
          <div className="bg-background border-b p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={skipBack}>
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button
                  variant="default"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </Button>

                <Button variant="outline" size="icon" onClick={skipForward}>
                  <SkipForward className="h-4 w-4" />
                </Button>

                <div className="flex-1 flex flex-col">
                  <Progress value={progress} className="h-2 mb-1" />
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>
                      {formatTime(audioRef.current?.currentTime || 0)}
                    </span>
                    <span>{formatTime(audioRef.current?.duration || 180)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    defaultValue={[80]}
                    max={100}
                    step={1}
                    className="w-20"
                    onValueChange={(value) => {
                      if (audioRef.current)
                        audioRef.current.volume = value[0] / 100;
                    }}
                  />
                </div>
              </div>

              <audio ref={audioRef} src={story.audio} />
            </div>
          </div>

          {/* Story Content */}
          <div
            ref={textContainerRef}
            className={`flex-1 overflow-y-auto p-4 md:p-8`}
          >
            <div
              className="bg-card rounded-lg p-6 shadow-sm max-w-3xl mx-auto"
              style={{ fontSize: `${fontSize}px` }}
            >
              <div className="prose max-w-none dark:prose-invert">
                {lines.map((line, lineIndex) => (
                  <p key={lineIndex}>
                    {line.split(/\s+/).map((word, wordIndex) => (
                      <span
                        onClick={() => handleWordClick(word)}
                        key={wordIndex}
                        className={`cursor-pointer hover:text-blue-500 transition-colors`}
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showWordModal && selectedWord && (
        <WordDictionaryComponent
          word={selectedWord}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}
