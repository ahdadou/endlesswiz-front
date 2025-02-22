"use client";

import api from "@/clients/api/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { highlightWord } from "@/utils/highlightWord";
import { Button } from "./Button";
import { StopIcon } from "@/Icons/StopIcon";
import { PreviousIcon } from "@/Icons/PreviousIcon";
import { NextIcon } from "@/Icons/NextIcon";
import { SeekForwardIcon } from "@/Icons/SeekForwardIcon";
import { SeekBackIcon } from "@/Icons/SeekBackIcon";
import { SubTitleComponent } from "./SubTitleComponent";
import useTranscriptStore from "@/stores/useTranscriptStore";
import useVideosStore from "@/stores/useVideosStore";

const YouTubePlayerComponent = () => {
  const {
    highlitedWord,
    currentVideo,
    setVideos,
    videos,
    setCurrentVideo,
    setCurrentVideoPosition,
    currentVideoPosition,
  } = useVideosStore();
  const {
    transcript,
    setTranscript,
    setCurrentTranscript,
    currentTranscript,
    setVid,
    vid,
  } = useTranscriptStore();

  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentTime, setCurrentTime] = useState<number | undefined>(
    currentVideo?.start_time
  );

  const fetchTranscript = useCallback(async () => {
    if (currentVideo) {
      const response = await api.fetchVideosTranscript(currentVideo.videoId);
      setVid(currentVideo.videoId);
      setTranscript(response);
    }
  }, [currentVideo?.videoId, setTranscript, setCurrentTranscript, setVid]);

  useEffect(() => {
    fetchTranscript();
  }, [currentVideo]);

  const fetchVideos = useCallback(
    async (page: number) => {
      const response = await api.searchVideosByWord(highlitedWord, page);
      setVideos(videos);
    },
    [highlitedWord]
  );

  const opts = useMemo(() => {
    return {
      height: "400px",
      width: "100%",
      playerVars: {
        autoplay: 1,
        start: currentVideo?.start_time,
      },
    };
  }, [currentVideo?.start_time]);

  const onReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
  };

  const onStateChange = (event: { data: number }) => {
    if (event.data === YouTube.PlayerState.PLAYING) {
      if (intervalRef.current) clearInterval(intervalRef.current); // Clear existing interval before starting a new one

      intervalRef.current = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          setCurrentTime(currentTime);
          updateTranscript(currentTime);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
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

      if (state === 1) {
        playerRef.current.pauseVideo(); // Pause instead of stopping
      } else {
        playerRef.current.playVideo(); // Resume from where it was paused
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

  const nextVideo = () => {
    if (videos.pageSize > currentVideoPosition+1)
      setCurrentVideoPosition(currentVideoPosition + 1);
  };

  const previousVideo = () => {
    if (currentVideoPosition > 0)
      setCurrentVideoPosition(currentVideoPosition - 1);
  };

  console.log('### videos : ', videos)
  if (!currentVideo) {
    return null;
  }

  return (
    <div className="relative h-full bg-black bg-opacity-50">
      <YouTube
        videoId={currentVideo.vid}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />
      <div className="flex flex-row gap-2 mt-2 ml-2 cursor-pointe z-30">
        <Button
          style="rounded-lg bg-black rounded-[100%] h-8 w-8"
          onClick={previousVideo}
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
          onClick={nextVideo}
        >
          <NextIcon style="h-4 w-4" />
        </Button>
      </div>
      {transcript && (
        <SubTitleComponent
          paragraph={currentTranscript}
          highlighted_word={highlitedWord}
        />
      )}
    </div>
  );
};

export default YouTubePlayerComponent;
