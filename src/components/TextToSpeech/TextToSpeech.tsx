"use client";
import { useState, useEffect } from "react";

const TextToSpeech = ({ text }: { text: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const synth = window.speechSynthesis;
      setSynth(synth);
      const u = new SpeechSynthesisUtterance(text);
      setUtterance(u);
      
      return () => {
        synth.cancel();
      };
    }
  }, [text]);

  const handlePlayPause = () => {
    if (!synth || !utterance) return;

    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
    } else {
      synth.resume();
      if (synth.paused) {
        synth.resume();
      } else {
        synth.speak(utterance);
      }
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (synth) {
      synth.cancel();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (!utterance) return;

    utterance.onend = () => {
      setIsPlaying(false);
    };
  }, [utterance]);

  return (
    <button 
      onClick={handlePlayPause}
      className="p-2 hover:bg-gray-100 rounded-full"
      aria-label={isPlaying ? "Pause pronunciation" : "Pronounce word"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${isPlaying ? "text-blue-500" : "text-gray-600"}`}
      >
        {isPlaying ? (
          <path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07" />
        ) : (
          <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        )}
      </svg>
    </button>
  );
};

export default TextToSpeech;