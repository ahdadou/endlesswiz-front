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
}

const SPEED_OPTIONS = [0.5, 1, 1.5, 2];
const COMMON_BUTTON_CLASSES =
  "p-2 hover:bg-gray-100 rounded-lg transition-colors";
const NAV_BUTTON_CLASSES =
  "hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 bg-white cursor-pointer w-11";

const VideoButtonsBar: React.FC<VideoButtonsBarProps> = ({
  seekBackward,
  toggleVideo,
  seekForward,
  changeSpeed,
  handleReset,
  pause,
  style,
}) => {
  const {
    videos: { totalPages, currentPage, pageSize, videosDetailResponse },
    currentVideo,
    setCurrentVideo,
    highlitedWord,
    setCurrentVideoIsFavorite,
    setVideos,
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
          const response = await api.searchVideosByWordAndUser(
            highlitedWord,
            nextPage,
          );
          response && setVideos(response);
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
        "w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100",
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
              onClick={handleReset}
              className={NAV_BUTTON_CLASSES}
              aria-label="Reset"
            >
              <ResetIcon style="h-5 w-5 text-gray-700" />
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
              onClick={seekForward}
              className={NAV_BUTTON_CLASSES}
            >
              <SeekForwardIcon style="h-5 w-5 text-gray-700" />
            </Button>
          </div>

          {/* Speed Control */}
          <div className="relative">
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
              <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-32">
                {SPEED_OPTIONS.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={cx(
                      "w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2",
                      currentSpeed === speed && "bg-blue-50 text-blue-600",
                    )}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>
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
  );
};

export default VideoButtonsBar;
