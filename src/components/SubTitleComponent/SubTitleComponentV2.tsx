"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, Bookmark, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import api from "@/clients/api/api";
import TextToSpeech from "../TextToSpeech/TextToSpeech";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatTime } from "../utils/TypeFormatUtils";
import { DictionaryResponse } from "@/clients/types/apiTypes";

interface SubTitleComponentProps {
  isAuthenticated?: boolean;
  showCurrentTranscriptInTheMiddle?: boolean;
}

export function SubTitleComponentV2({
  isAuthenticated = false,
  showCurrentTranscriptInTheMiddle = true,
}: SubTitleComponentProps) {
  const { currentTranscript, transcript, currentVideo, highlitedWord } =
    useZustandState();
  const subtitlesRef = useRef<HTMLDivElement | null>(null); // Properly typed ref
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    data: DictionaryResponse;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );
  const [showWordModal, setShowWordModal] = useState(false);

  useEffect(() => {
    setSaveStatus("idle");
  }, [selectedWord?.word]);

  const handleWordClick = async (word: string) => {
    setShowWordModal(true);
    setIsLoading(true);
    try {
      const data = await api.fetchWordDictionary(word);
      setSelectedWord({ word, data });
    } catch (error) {
      console.error("Failed to fetch word details:", error);
      setSelectedWord(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveWord = useCallback(async () => {
    if (!selectedWord || !isAuthenticated) return;

    setSaveStatus("saving");
    try {
      currentTranscript?.paragraph &&
        (await api.addWordIntoFavorite({
          word: selectedWord.word,
          source: "VIDEO",
          transcript_id: currentTranscript.transcriptId,
        }));
      setSaveStatus("saved");
    } catch (error) {
      setSaveStatus("idle");
    }
  }, [selectedWord, isAuthenticated, currentTranscript]);

  const handleCloseModal = useCallback(() => {
    setShowWordModal(false);
    setSelectedWord(null);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Split subtitle text into words for interactive clicking
  const renderSubtitleWords = (text: string) => {
    return text.split(/\s+/).map((word, index, array) => {
      const cleanedWord = word.replace(/[.,!?;:'"()]/g, "");

      const isHighlighted = cleanedWord === highlitedWord;

      return (
        <span key={index}>
          <span
            className={`cursor-pointer hover:text-forest hover:underline ${
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
      <Card className="border-forest-100 shadow-sm h-full">
        <CardHeader>
          <CardTitle className="text-forest">Subtitles</CardTitle>
          <CardDescription>
            Click on any word to see its definition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="h-[300px] overflow-y-auto pr-2 custom-scrollbar"
            ref={subtitlesRef}
          >
            {transcript ? (
              transcript.map((subtitle, index) => (
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

      {showWordModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[70vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4 px-6 pb-6 relative overflow-y-auto">
              {isLoading ? (
                <div className="text-center p-4 flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : selectedWord ? (
                <>
                  <div className="flex items-start p-4 justify-between sticky top-0 pb-4 z-20 bg-white">
                    <div className="pr-4 ">
                      <div className="flex items-center gap-2 ">
                        <h3 className="text-3xl font-bold text-gray-900">
                          {selectedWord.word}
                        </h3>
                        <TextToSpeech text={selectedWord.word} />
                      </div>
                      <div className="mt-1 flex gap-2 flex-wrap">
                        {selectedWord.data.entries.map((entry, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              handleScrollToSection(`pos-${index}`)
                            }
                            className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 
                              hover:bg-blue-200 transition-colors cursor-pointer"
                          >
                            {entry.partOfSpeech}
                          </button>
                        ))}
                      </div>
                    </div>
                    {isAuthenticated && (
                      <motion.button
                        onClick={handleSaveWord}
                        className="p-2 hover:bg-gray-100 rounded-lg shrink-0"
                        whileHover={{ scale: 1.05 }}
                        disabled={saveStatus === "saved"}
                      >
                        {saveStatus === "saved" ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Bookmark className="w-6 h-6 text-gray-400 hover:text-blue-500" />
                        )}
                      </motion.button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {selectedWord.data.entries.map((entry, index) => (
                      <div
                        key={index}
                        id={`pos-${index}`}
                        className="border-l-4 border-blue-200 pl-4 pt-2 scroll-mt-16"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-semibold uppercase text-blue-600">
                            {entry.partOfSpeech}
                          </span>
                        </div>

                        <div className="space-y-4">
                          {entry.definitions.map((definition, defIndex) => (
                            <div key={defIndex} className="group">
                              <div className="flex items-start gap-2">
                                <div className="mt-1 w-2 h-2 rounded-full bg-blue-200 shrink-0"></div>
                                <div className="flex-1">
                                  <p className="text-gray-800 font-medium">
                                    {definition.definition}
                                  </p>
                                  {definition.examples.length > 0 && (
                                    <div className="mt-2 ml-4 space-y-1">
                                      {definition.examples.map(
                                        (example, exIndex) => (
                                          <div
                                            key={exIndex}
                                            className="flex items-start gap-2 text-gray-600"
                                          >
                                            <span className="text-xs mt-1">
                                              •
                                            </span>
                                            <p className="text-sm italic">
                                              "{example}"
                                            </p>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              {defIndex < entry.definitions.length - 1 && (
                                <hr className="my-4 border-gray-100" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-4  rounded-lg h-[50vh] w-full flex justify-center items-center  text-red-600">
                    Failed to load word details
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
