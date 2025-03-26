import React, { useCallback, useState } from "react";
import cx from "classnames";
import { ChevronDown, Clock, Heart, Pause, PlayIcon } from "lucide-react";
import { Button } from "../ui/button";
import api from "@/clients/api/api";
import { PreviousIcon } from "@/Icons/PreviousIcon";
import { NextIcon } from "@/Icons/NextIcon";
import { SeekForwardIcon } from "@/Icons/SeekForwardIcon";
import { SeekBackIcon } from "@/Icons/SeekBackIcon";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import { ResetIcon } from "@/Icons/ResetIcon";

interface VideoButtonsBarProps {
  seekBackward: () => void;
  toggleVideo: () => void;
  seekForward: () => void;
  handleReset: () => void;
  changeSpeed: (speed: number) => void;
  pause: boolean;
  style: string;
  played: number;
  onSeekMouseDown: () => void;
  onSeekChange: (value: number) => void;
  onSeekMouseUp: (value: number) => void;
}

const SPEED_OPTIONS = [0.5, 1, 1.5, 2];
const NAV_BUTTON_CLASSES =
  "hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 cursor-pointer w-11";

const VideoButtonsBar: React.FC<VideoButtonsBarProps> = ({
  seekBackward,
  toggleVideo,
  seekForward,
  changeSpeed,
  handleReset,
  pause,
  style,
  played,
  onSeekMouseDown,
  onSeekChange,
  onSeekMouseUp,
}) => {
  const {
    videos: { totalPages, currentPage, pageSize, videosDetailResponse },
    currentVideo,
    setCurrentVideo,
    highlitedWord,
    setCurrentVideoIsFavorite,
    setVideosWithPosition,
  } = useZustandState();

  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);

  const currentPosition = currentVideo.position;
  const currentVideoData = currentVideo.video;

  const isLastItem = currentPosition >= pageSize - 1;
  const isLastPage = currentPage >= totalPages - 1;
  const hasPrevious = currentPosition > 0;

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
      if (direction === "next") {
        if (!isLastItem) {
          const newPosition = currentPosition + 1;
          setCurrentVideo(newPosition);
        } else if (!isLastPage) {
          const nextPage = currentPage + 1;
          const response = await api.getVideosByUser(highlitedWord, nextPage);
          response && setVideosWithPosition(response);
        }
      } else {
        if (currentPosition > 0) {
          setCurrentVideo(currentPosition - 1);
        }
      }
    },
    [currentPosition, videosDetailResponse, currentPage, isLastPage],
  );

  const handleSpeedChange = useCallback(
    (speed: number) => {
      setCurrentSpeed(speed);
      changeSpeed(speed);
      setShowSpeedDropdown(false);
    },
    [changeSpeed],
  );

  return (
    <div
      className={cx(
        style,
        "w-full p-2 rounded-t-sm shadow-sm border border-gray-100",
      )}
    >
      <div className="flex items-center justify-between">
        {/* Left Controls Section */}
        <div className="flex items-center gap-6">
          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigateVideo("previous")}
              disabled={!hasPrevious}
              className={NAV_BUTTON_CLASSES}
              aria-label="Previous video"
            >
              <PreviousIcon style="h-6 w-6 fill-current text-[#4C585B]" />
            </Button>

            <Button
              variant="ghost"
              onClick={toggleVideo}
              className="h-10 w-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
            >
              {pause ? (
                <PlayIcon className="h-6 w-6 text-gray-700 ml-0.5 fill-current" />
              ) : (
                <Pause className="h-6 w-6 text-gray-700 fill-current" />
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigateVideo("next")}
              disabled={isLastItem && isLastPage}
              className={NAV_BUTTON_CLASSES}
              aria-label="Next video"
            >
              <NextIcon style="h-6 w-6 fill-current text-[#4C585B]" />
            </Button>
          </div>
          {/* Playback Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={seekBackward}
              className={NAV_BUTTON_CLASSES}
            >
              <SeekBackIcon style="h-5 w-5 text-gray-700" />
            </Button>

            <Button
              variant="ghost"
              onClick={handleReset}
              className={`${NAV_BUTTON_CLASSES} hidden md:block`}
              aria-label="Reset"
            >
              <ResetIcon style="h-5 w-5 text-gray-700" />
            </Button>

            <Button
              variant="ghost"
              onClick={seekForward}
              className={NAV_BUTTON_CLASSES}
            >
              <SeekForwardIcon style="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Seek Bar */}
        <div className="flex-grow mx-4">
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={onSeekMouseDown}
            onChange={(e) => onSeekChange(parseFloat(e.target.value))}
            onMouseUp={(e) => onSeekMouseUp(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-slate-700 [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
          />
        </div>

        {/* Right Controls Section */}
        <div className="flex items-center gap-4">
          {/* Speed Control */}
          <div className="relative hidden md:block">
            <Button
              variant="ghost"
              onClick={() => setShowSpeedDropdown(!showSpeedDropdown)}
              className="h-10 gap-2 px-3 hover:bg-gray-100"
            >
              <Clock className="h-5 w-5 text-gray-700" />
              <span className="text-gray-700">{currentSpeed}x</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </Button>

            {showSpeedDropdown && (
              <div className="absolute bottom-full left-0 mb-2 border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                {SPEED_OPTIONS.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={cx(
                      "w-full px-4 py-2 text-sm text-gray-700 hover:flex items-center gap-2",
                      currentSpeed === speed && "bg-blue-50 text-blue-600",
                    )}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            onClick={toggleFavorite}
            className="h-10 w-10 p-2 hover:bg-red-50"
          >
            <Heart
              className={cx(
                "h-5 w-5 transition-all duration-300",
                currentVideoData?.isFavorite
                  ? "text-red-500 fill-red-500"
                  : "text-gray-700 fill-transparent hover:fill-red-200",
              )}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoButtonsBar;
