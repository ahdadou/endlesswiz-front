"use client";

import { ParagraphsDetail } from "@/app/home/page";
import api from "@/clients/api/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";

interface YouTubePlayerComponentProps {
  video: ParagraphsDetail;
}

interface Transcript {
  paragraph: string;
  time: number;
}

const YouTubePlayerComponent = ({ video }: YouTubePlayerComponentProps) => {
  const playerRef = useRef<YouTubePlayer | null>(null); // 🔹 Add type here
  const [transcript, setTranscript] = useState<Transcript[]>([]);

  const fetchTranscript = useCallback(async () => {
    const response = await api.fetchVideosTranscript(video.videoId);
    setTranscript(response);
    console.log("### transcript", transcript);
  }, [video.videoId]);

  useEffect(() => {
    fetchTranscript();
  }, [fetchTranscript]);

  const opts = useMemo(() => {
    return {
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 1,
        start: video.time,
      },
    };
  }, [video.time]);

  const onReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target; // 🔹 Now TypeScript recognizes it
  };

  const stopVideo = () => {
    playerRef.current?.stopVideo(); // 🔹 Optional chaining (safe)
  };

  const seekBackward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(0, currentTime - 5), true); // 🔹 Fix
    }
  };

  const seekForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 5, true); // 🔹 Fix
    }
  };

  return (
    <div>
      <YouTube videoId={video.vid} opts={opts} onReady={onReady} />
      <div style={{ marginTop: "10px" }}>
        <button onClick={stopVideo}>Stop</button>
        <button onClick={seekBackward}>Back 5s</button>
        <button onClick={seekForward}>Forward 5s</button>
      </div>
    </div>
  );
};

export default YouTubePlayerComponent;
