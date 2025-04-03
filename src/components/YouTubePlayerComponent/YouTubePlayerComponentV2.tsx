"use client";

import api from "@/clients/api/api";
import { useCallback, useEffect, useRef, useState } from "react";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import { TranscriptResponse } from "@/clients/types/apiTypes";
import ReactPlayer from "react-player";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Pause,
  Play,
  RotateCcw,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PreviousIcon } from "@/Icons/PreviousIcon";
import { NextIcon } from "@/Icons/NextIcon";
import { formatTime } from "../utils/TypeFormatUtils";
import cx from "classnames";
import useActivityTimer from "../utils/useActivityTimer";

interface YouTubePlayerComponentV2Props {
  style: string;
  isPublicPage?: boolean;
}

const YouTubePlayerComponentV2 = ({
  style,
  isPublicPage,
}: YouTubePlayerComponentV2Props) => {
  const {
    currentVideo,
    transcript,
    setTranscript,
    setCurrentTranscript,
    setVid,
    videos: { totalPages, currentPage, pageSize, videosDetailResponse },
    setCurrentVideo,
    highlitedWord,
    setCurrentVideoIsFavorite,
    setVideosWithPosition,
    transcriptToPlay,
  } = useZustandState();

  const playerRef = useRef<ReactPlayer | null>(null);
  const [pip, setPip] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [controls, setControls] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop, setLoop] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const isVisible = useActivityTimer(3000); // 3000ms = 3 seconds

  const currentPosition = currentVideo.position;
  const currentVideoData = currentVideo.video;

  const hasNext =
    currentPosition < pageSize - 1 || currentPage < totalPages - 1;
  const hasPrevious = currentPosition > 0 || currentPage > 0;

  const toggleFavorite = useCallback(async () => {
    if (!currentVideoData) return;

    const action = currentVideoData.isFavorite
      ? api.deleteVideoIntoFavorite
      : api.addVideoIntoFavorite;

    await action(currentVideoData.videoId);
    setCurrentVideoIsFavorite(!currentVideoData.isFavorite);
  }, [currentVideoData, setCurrentVideoIsFavorite]);

  const navigateVideo = useCallback(
    async (direction: "next" | "previous") => {
      const pageSizeMinusOne = pageSize - 1;
      const totalPagesMinusOne = totalPages - 1;
      const isLastItem = currentPosition >= pageSizeMinusOne;
      const isLastPage = currentPage >= totalPagesMinusOne;

      const loadNewPage = async (newPage: number, newPosition: number) => {
        const response = isPublicPage
          ? await api.getVideos(highlitedWord, newPage)
          : await api.getVideosByUser(highlitedWord, newPage);
        if (response) {
          setVideosWithPosition(response, newPosition);
        }
      };

      if (direction === "next") {
        if (!isLastItem) {
          setCurrentVideo(currentPosition + 1);
          return;
        }
        if (!isLastPage) {
          await loadNewPage(currentPage + 1, 0);
        }
        return;
      }

      // Previous direction
      if (currentPosition > 0) {
        setCurrentVideo(currentPosition - 1);
        return;
      }
      if (currentPage > 0) {
        await loadNewPage(currentPage - 1, pageSizeMinusOne);
      }
    },
    [
      currentPosition,
      currentPage,
      highlitedWord,
      pageSize,
      totalPages,
      setVideosWithPosition,
      setCurrentVideo,
    ]
  );
  const handlePlaybackSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
  };

  const handleReset = () => {
    if (playerRef.current) {
      if (currentVideo.video?.transcriptResponse?.startTime) {
        playerRef.current.seekTo(
          currentVideo.video.transcriptResponse.startTime
        );
        setCurrentTranscript(currentVideo.video.transcriptResponse);
      } else {
        playerRef.current.seekTo(0);
      }
    }
  };

  const fetchTranscript = useCallback(async () => {
    if (currentVideo.video?.videoId) {
      const response = isPublicPage
        ? await api.fetchVideosTranscriptPublic(currentVideo.video?.videoId)
        : await api.fetchVideosTranscript(currentVideo.video?.videoId);
      response && setTranscript(response);
      setVid(currentVideo.video?.vid);
    }
  }, [
    currentVideo?.video?.videoId,
    currentVideo?.video?.transcriptResponse,
    setTranscript,
    setCurrentTranscript,
    setVid,
  ]);

  useEffect(() => {
    if (currentVideo.video?.transcriptResponse) {
      setCurrentTranscript(currentVideo.video.transcriptResponse);
      if (playerRef.current) {
        playerRef.current.seekTo(
          currentVideo.video?.transcriptResponse?.startTime
        );
      }
    }
    fetchTranscript();
  }, [currentVideo?.video?.transcriptResponse, currentVideo?.video?.vid]);

  const updateTranscript = (time: number) => {
    const transcriptEntry = transcript.find((entry: TranscriptResponse) => {
      return time >= entry.startTime && time < entry.endTime; // Assuming each entry is 2 seconds long
    });

    if (transcriptEntry) {
      setCurrentTranscript(transcriptEntry);
    }
  };

  const handleTimeChange = (value: number[]) => {
    setPlayedSeconds(value[0]);
    if (playerRef.current) {
      playerRef.current.seekTo(value[0]);
    }
  };

  useEffect(() => {
    if (transcriptToPlay) {
      if (playerRef.current)
        playerRef.current.seekTo(transcriptToPlay.startTime);
    }
  }, [transcriptToPlay]);

  if (!currentVideo?.video?.vid) {
    return <div className="h-[25vh] lg:h-[60vh] bg-black "></div>;
  }

  const ControlBar = (
    <div
      className={cx(
        "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4 pointer-events-none cursor-pointer",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Slider and Time Display */}
      <div className="mb-4 pointer-events-auto">
        <Slider
          value={[playedSeconds]}
          min={0}
          max={currentVideo.video.duration}
          step={1}
          onValueChange={handleTimeChange}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-white mt-1">
          <span>{formatTime(playedSeconds)}</span>
          <span>{formatTime(currentVideo.video.duration)}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setMuted(!muted)}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            {muted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handleReset}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => navigateVideo("previous")}
            disabled={!hasPrevious}
          >
            <PreviousIcon style="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-white hover:bg-white/20"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => navigateVideo("next")}
            disabled={!hasNext}
          >
            <NextIcon style="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={toggleFavorite}
          >
            <Heart
              className="h-5 w-5"
              fill={currentVideo.video.isFavorite ? "currentColor" : "none"}
            />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handlePlaybackSpeedChange(0.5)}
                className={playbackRate === 0.5 ? "bg-forest-100" : ""}
              >
                0.5x
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePlaybackSpeedChange(0.75)}
                className={playbackRate === 0.75 ? "bg-forest-100" : ""}
              >
                0.75x
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePlaybackSpeedChange(1.0)}
                className={playbackRate === 1.0 ? "bg-forest-100" : ""}
              >
                Normal (1x)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePlaybackSpeedChange(1.25)}
                className={playbackRate === 1.25 ? "bg-forest-100" : ""}
              >
                1.25x
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePlaybackSpeedChange(1.5)}
                className={playbackRate === 1.5 ? "bg-forest-100" : ""}
              >
                1.5x
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePlaybackSpeedChange(2.0)}
                className={playbackRate === 2.0 ? "bg-forest-100" : ""}
              >
                2x
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div
        className={cx("relative rounded-[5px] bg-black overflow-hidden", style)}
      >
        <ReactPlayer
          ref={playerRef}
          className="react-player absolute inset-0 w-full h-full"
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${currentVideo.video?.vid}`}
          pip={pip}
          playing={playing}
          controls={controls}
          light={false}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          muted={muted}
          onReady={(event) => setPlaying(true)}
          // onStart={() => console.log("onStart")}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          // onBuffer={() => console.log("onBuffer")}
          // onSeek={(e) => console.log("onSeek", e)}
          // onError={(e) => console.log("onError", e)}
          onProgress={({ played, loaded, playedSeconds }) => {
            updateTranscript(playedSeconds);
            if (!seeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
              setLoaded(loaded);
            }
          }}
          config={{
            youtube: {
              playerVars: {
                start: Math.floor(
                  currentVideo.video?.transcriptResponse?.startTime || 0
                ),
              },
            },
          }}
        />
        {ControlBar}
      </div>
    </div>
  );
};

export default YouTubePlayerComponentV2;
