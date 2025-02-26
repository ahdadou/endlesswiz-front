import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../Button";
import { PlayIcon } from "@/Icons/PlayIcon";
import { PauseIcon } from "@/Icons/PauseIcon";
import { PreviousIcon } from "@/Icons/PreviousIcon";
import { NextIcon } from "@/Icons/NextIcon";
import { SeekForwardIcon } from "@/Icons/SeekForwardIcon";
import { SeekBackIcon } from "@/Icons/SeekBackIcon";

import cx from "classnames";
import useVideosStore from "@/stores/useVideosStore";
import api from "@/clients/api/api";

interface VideoButtonsBarProps {
  seekBackward: () => void;
  toggleVideo: () => void;
  seekForward: () => void;
  changeSpeed: (speed: number) => void;
  pause: boolean;
  style: string;
}

const speedOptions: number[] = [0.5, 1, 1.5, 2]; // Define playback speed options

const VideoButtonsBar: React.FC<VideoButtonsBarProps> = ({
  seekBackward,
  toggleVideo,
  seekForward,
  changeSpeed,
  pause,
  style,
}) => {
  const {
    videos,
    setVideos,
    highlitedWord,
    currentVideoPosition,
    setCurrentVideoPosition,
  } = useVideosStore();

  const fetchMoreVideos = async (page: number) => {
    const response = await api.searchVideosByWord(highlitedWord, page);
    setVideos(response);
    setCurrentVideoPosition(0);
  };

  const nextVideo = () => {
    if (videos.pageSize > currentVideoPosition + 1) {
      setCurrentVideoPosition(currentVideoPosition + 1);
    } else if (videos.currentPage < videos.totalPages - 1) {
      fetchMoreVideos(videos.currentPage + 1);
    }
  };

  const previousVideo = () => {
    if (currentVideoPosition > 0)
      setCurrentVideoPosition(currentVideoPosition - 1);
  };

  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false);
  const [currentSpeed, SetCurrentSpeed] = useState(1);

  return (
    <div className={cx(style, "flex items-center justify-between w-full px-4 py-2")}>
      {/* Previous/Next Video Buttons */}
      <div className="flex items-center gap-3">
        <Button
          style="rounded-full p-2 hover:bg-white/10 transition-colors"
          onClick={previousVideo}
          disabled={currentVideoPosition < 1}
        >
          <PreviousIcon style="h-5 w-5 text-white" />
        </Button>
        <Button
          style="rounded-full p-2 hover:bg-white/10 transition-colors"
          onClick={nextVideo}
          disabled={currentVideoPosition >= videos.pageSize - 1 && videos.currentPage >= videos.totalPages - 1}
        >
          <NextIcon style="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center gap-3">
        <Button
          style="rounded-full p-2 hover:bg-white/10 transition-colors"
          onClick={seekBackward}
        >
          <SeekBackIcon style="h-5 w-5 text-white" />
        </Button>

        <Button
          style="rounded-full p-3 bg-white/10 hover:bg-white/20 transition-colors"
          onClick={toggleVideo}
        >
          {pause ? (
            <PlayIcon style="h-6 w-6 text-white" />
          ) : (
            <PauseIcon style="h-6 w-6 text-white" />
          )}
        </Button>

        <Button
          style="rounded-full p-2 hover:bg-white/10 transition-colors"
          onClick={seekForward}
        >
          <SeekForwardIcon style="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Speed Dropdown */}
      <div className="relative group">
        <Button
          style="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          onClick={() => setShowSpeedDropdown(!showSpeedDropdown)}
        >
          <span className="text-sm text-white">{currentSpeed}x</span>
          {/* <ChevronDownIcon className="h-4 w-4 text-white transition-transform group-hover:rotate-180" /> */}
        </Button>
        
        {showSpeedDropdown && (
          <div 
            className="absolute bottom-full right-0 mb-2 w-20 bg-black/80 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden"
            onMouseLeave={() => setShowSpeedDropdown(false)}
          >
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  changeSpeed(speed);
                  SetCurrentSpeed(speed)
                  setShowSpeedDropdown(false);
                }}
                className={`w-full px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors
                  ${currentSpeed === speed ? 'bg-blue-500/80' : ''}`}
              >
                {speed}x
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoButtonsBar;
