"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useZustandState } from "@/provider/ZustandStoreProvider";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatTime } from "../utils/TypeFormatUtils";
import { WordDictionaryComponent } from "../WordDictionaryComponent/WordDictionaryComponent";

interface SubTitleComponentProps {
  isAuthenticated?: boolean;
  showCurrentTranscriptInTheMiddle?: boolean;
}

export function SubTitleComponentV2({
  isAuthenticated = false,
  showCurrentTranscriptInTheMiddle = true,
}: SubTitleComponentProps) {
  const { currentTranscript, transcript, highlitedWord } = useZustandState();
  const subtitlesRef = useRef<HTMLDivElement | null>(null); // Properly typed ref
  const [selectedWord, setSelectedWord] = useState<string | undefined>(
    undefined
  );
  const [showWordModal, setShowWordModal] = useState(false);
  const handleCloseModal = useCallback(() => {
    setShowWordModal(false);
    setSelectedWord(undefined);
  }, []);

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    setShowWordModal(true);
  };

  // Split subtitle text into words for interactive clicking
  const renderSubtitleWords = (text: string) => {
    return text.split(/\s+/).map((word, index, array) => {
      const cleanedWord = word.replace(/[.,!?;:'"()]/g, "");

      const isHighlighted =
        cleanedWord.toLowerCase() === highlitedWord.toLocaleLowerCase();

      return (
        <span key={index}>
          <span
            className={`cursor-pointer hover:hover:underline ${
              isHighlighted
                ? "font-bold text-forest-700 bg-forest/10 px-1 rounded"
                : ""
            }`}
            onClick={() => handleWordClick(cleanedWord)}
          >
            {word}
          </span>
          {index < array.length - 1 ? " " : ""}
        </span>
      );
    });
  };

  useEffect(() => {
    if (currentTranscript && transcript && subtitlesRef.current) {
      const subtitleElements =
        subtitlesRef.current.querySelectorAll("[data-subtitle]");
      const index = transcript.indexOf(currentTranscript);
      if (subtitleElements[index]) {
        const container = subtitlesRef.current;
        const subtitleElement = subtitleElements[index] as HTMLElement;

        // Calculate the offset and adjust scrolling
        const offsetTop =
          subtitleElement.offsetTop -
          container.offsetTop -
          container.clientHeight / 2 +
          subtitleElement.clientHeight / 2;

        container.scrollTo({
          top: showCurrentTranscriptInTheMiddle ? offsetTop : offsetTop + 100,
          behavior: "smooth",
        });
      }
    }
  }, [currentTranscript, transcript]);

  return (
    <>
      <Card className="border-forest-100 shadow-sm h-full flex flex-col">
        <CardHeader className="h-14">
          <CardTitle className=" text-lg">Subtitles</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <div
            className="h-full overflow-y-auto custom-scrollbar"
            ref={subtitlesRef}
          >
            {transcript ? (
              transcript.map((subtitle) => (
                <div
                  key={subtitle.transcriptId}
                  data-subtitle={subtitle.transcriptId}
                  className={`p-3 mb-2 rounded-md ${
                    subtitle.transcriptId === currentTranscript.transcriptId
                      ? "bg-forest-100 border-l-4 border-forest"
                      : "bg-gray-100"
                  }`}
                >
                  <div className="text-xs text-muted-foreground mb-1">
                    {formatTime(subtitle.startTime)} -{" "}
                    {formatTime(subtitle.endTime)}
                  </div>
                  <p className="text-forest-800">
                    {renderSubtitleWords(subtitle.paragraph)}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No subtitles available for this video
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      {showWordModal && selectedWord && (
        <WordDictionaryComponent
          word={selectedWord}
          handleCloseModal={handleCloseModal}
          transcriptId={currentTranscript.transcriptId}
        />
      )}
    </>
  );
}
