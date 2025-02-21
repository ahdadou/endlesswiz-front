"use client";

import { ParagraphsDetail } from "@/app/home/page";
import api from "@/clients/api/api";
import { Roboto } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import cx from "classnames";
import YouTube, { YouTubePlayer } from "react-youtube";
import { highlightWord } from "@/utils/highlightWord";
import { Button } from "./Button";
import { StopIcon } from "@/Icons/StopIcon";
import { PreviousIcon } from "@/Icons/PreviousIcon";
import { NextIcon } from "@/Icons/NextIcon";
import { SeekForwardIcon } from "@/Icons/SeekForwardIcon";
import { SeekBackIcon } from "@/Icons/SeekBackIcon";

interface YouTubePlayerComponentProps {
  video: ParagraphsDetail;
  search: string;
}

interface Transcript {
  paragraph: string;
  start_time: number;
  end_time: number;
}

const roboto = Roboto({
  weight: "900",
  subsets: ["latin"],
});

const YouTubePlayerComponent = ({
  video,
  search,
}: YouTubePlayerComponentProps) => {
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
      height: "400px",
      width: "100%",
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

  const toggleVideo = () => {
    if (playerRef.current) {
      const state = playerRef.current.getPlayerState(); // Get current video state
  
      if (state === 1) { // 1 = Playing (YouTube API)
        playerRef.current.pauseVideo(); // Pause instead of stopping
        console.log("Video paused.");
      } else {
        playerRef.current.playVideo(); // Resume from where it was paused
        console.log("Video playing.");
      }
    }
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
    <div className="relative h-full bg-black bg-opacity-50">
      <YouTube
        videoId={video.vid}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />
      <div className="flex flex-row gap-2 mt-2 ml-2">
        <Button
          style="rounded-lg bg-black rounded-[100%] h-8 w-8"
          onClick={toggleVideo}
        >
          <PreviousIcon style="h-4 w-4" />
        </Button>
        <Button
          style="rounded-lg bg-black rounded-[100%] h-8 w-8"
          onClick={seekBackward}
        >
          <SeekBackIcon style="h-4 w-4" />
        </Button>
        <Button
          style="rounded-lg bg-black rounded-[100%] h-8 w-8"
          onClick={toggleVideo}
        >
          <StopIcon />
        </Button>
        <Button
          style="rounded-lg bg-black rounded-[100%] h-8 w-8"
          onClick={seekForward}
        >
          <SeekForwardIcon style="h-4 w-4" />
        </Button>
        <Button
          style="rounded-lg bg-black rounded-[100%] h-8 w-8"
          onClick={toggleVideo}
        >
          <NextIcon style="h-4 w-4" />
        </Button>
      </div>
      {transcript && (
        <div
          className={cx(
            roboto.className,
            "absolute bottom-[100px] left-40 right-40 z-20 text-white text-xl bg-black bg-opacity-50 p-5 text-center"
          )}
        >
          {highlightWord(currentTranscript, search, "bg-yellow-500")}
        </div>
      )}
    </div>
  );
};

export default YouTubePlayerComponent;
