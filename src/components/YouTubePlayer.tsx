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
  start_time: number;
  end_time: number;
}

const YouTubePlayerComponent = ({ video }: YouTubePlayerComponentProps) => {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [transcript, setTranscript] = useState<Transcript[]>([]);

  const [currentTime, setCurrentTime] = useState<number | undefined>(
    video?.start_time
  );
  const [currentTranscript, setCurrentTranscript] = useState<string>("");

  const fetchTranscript = useCallback(async () => {
    const response = await api.fetchVideosTranscript(video.videoId);
    setTranscript(response);
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
        start: video?.start_time,
      },
    };
  }, [video.start_time]);

  const onReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
  };

  const onStateChange = (event: { data: number }) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      const interval = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          setCurrentTime(currentTime);
          updateTranscript(currentTime);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  };

  const updateTranscript = (time: number) => {
    const transcriptEntry = transcript.find((entry) => {
      return time >= entry.start_time && time < entry.end_time; // Assuming each entry is 2 seconds long
    });

    if (transcriptEntry) {
      setCurrentTranscript(transcriptEntry.paragraph);
    }
  };

  const stopVideo = () => {
    playerRef.current?.stopVideo();
  };

  const seekBackward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(0, currentTime - 5), true);
    }
  };

  const seekForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 5, true);
    }
  };

  if (!video) {
    return null;
  }

  return (
    <div>
      <YouTube
        videoId={video.vid}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={stopVideo}>Stop</button>
        <button onClick={seekBackward}>Back 5s</button>
        <button onClick={seekForward}>Forward 5s</button>
      </div>
      <div
        className="bg-slate-600 w-full h-[100px]"
        style={{ marginTop: "20px", fontSize: "16px" }}
      >
        {currentTranscript}
      </div>
    </div>
  );
};

export default YouTubePlayerComponent;
