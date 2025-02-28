"use client";

import { useState } from "react";
import { Captions } from "lucide-react";
import cx from "classnames";
import useTranscriptStore from "@/stores/useTranscriptStore";
import type { Transcript } from "@/stores/useTranscriptStore";

interface SubtitleSectionProps {
  transcript: Transcript;
  highlightedWord: string;
}

export function SubtitleSection({
  transcript,
  highlightedWord,
}: SubtitleSectionProps) {
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    pronunciation: string;
    definition: string;
  } | null>(null);

  const handleWordClick = (word: string) => {
    setSelectedWord({
      word,
      pronunciation: "/ˌser.ənˈdɪp.ə.ti/",
      definition: "The occurrence of events by chance in a happy way",
    });
  };

  // Mock subtitle data for empty state
  const mockSubtitle = {
    paragraph:
      "Click any word in this example sentence to see its definition. Try serendipity for a demonstration.",
    start_time: 0,
  };

  const displayTranscript = transcript?.paragraph ? transcript : mockSubtitle;

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 sticky top-4 h-full">
      <div className="flex gap-3 items-center mb-4">
        <Captions className="w-6 h-6 text-gray-900" />
        <h3 className="text-xl font-semibold text-gray-900">Live Subtitles</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-gray-700">
            {displayTranscript.paragraph.split(" ").map((word, index) => {
              const cleanWord = word.replace(/[.,]/g, "");
              const isExampleWord = cleanWord.toLowerCase() === "serendipity";

              return (
                <span
                  key={index}
                  onClick={() => handleWordClick(cleanWord)}
                  className={cx(
                    "cursor-pointer hover:bg-gray-200 rounded px-1 py-0.5 transition-colors",
                    highlightedWord.includes(cleanWord) &&
                      "bg-blue-100 text-blue-600",
                    selectedWord?.word === cleanWord && "ring-2 ring-blue-300",
                    isExampleWord && "text-blue-500 font-medium"
                  )}
                >
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>

        {selectedWord ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-gray-900">
                {selectedWord.word}
              </span>
              <span className="text-sm text-gray-500">
                {selectedWord.pronunciation}
              </span>
            </div>
            <p className="text-gray-700 text-sm">{selectedWord.definition}</p>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p className="text-gray-500 text-sm text-center">
              {!transcript?.paragraph && (
                <span className="block mb-2">
                  ✨ Welcome to pronunciation helper!
                </span>
              )}
              Click any word in the subtitle above to see:
              <ul className="list-disc pl-4 mt-2 text-left">
                <li>Detailed definition</li>
                <li>Usage examples</li>
              </ul>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
