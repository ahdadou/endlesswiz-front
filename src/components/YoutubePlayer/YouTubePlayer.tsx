"use client";

import api from "@/clients/api/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import useTranscriptStore from "@/stores/useTranscriptStore";
import useVideosStore from "@/stores/useVideosStore";
import VideoButtonsBar from "./VideoButtonsBar";

const YouTubePlayerComponent = () => {
  const { currentVideo } = useVideosStore();
  const { transcript, setTranscript, setCurrentTranscript, setVid } =
    useTranscriptStore();

  const playerRef = useRef<YouTubePlayer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [pause, setPause] = useState(false);

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

  const opts = useMemo(() => {
    return {
      height: "100%",
      width: "100%",
      playerVars: {
        autoplay: 1,
        start: currentVideo?.start_time,
        controls: 1,
        fs: 0,
        iv_load_policy: 3,
        rel: 0, // 🔥 Prevents related videos from showing - Deprecated
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
      setCurrentTranscript(transcriptEntry);
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

  const changeSpeed = (speed: number) => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(speed);
    }
  };

  if (!currentVideo) {
    return null;
  }

  return (
    <div className="relative h-full w-full flex flex-row md:flex-col gap-4 bg-white">
      {/* YouTube Player Container */}
      <YouTube
        className="h-full w-full"
        onPause={() => setPause(true)}
        onPlay={() => setPause(false)}
        videoId={currentVideo.vid}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />

      {/* Control Bar Container */}
      <VideoButtonsBar
        toggleVideo={toggleVideo}
        seekBackward={seekBackward}
        seekForward={seekForward}
        changeSpeed={changeSpeed}
        pause={pause}
        style="w-full"
      />
    </div>
  );
};

export default YouTubePlayerComponent;
