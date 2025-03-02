import React, { useCallback, useState } from "react";
import cx from "classnames";
import { Clock, Heart } from "lucide-react";
import { Button } from "../ui/button";
import api from "@/clients/api/api";
import { highlightWord } from "@/utils/highlightWord";
import { PreviousIcon } from "@/Icons/PreviousIcon";
import { NextIcon } from "@/Icons/NextIcon";
import { SeekForwardIcon } from "@/Icons/SeekForwardIcon";
import { SeekBackIcon } from "@/Icons/SeekBackIcon";
import { useZustandState } from "@/provider/ZustandStoreProvider";

interface VideoButtonsBarProps {
  seekBackward: () => void;
  toggleVideo: () => void;
  seekForward: () => void;
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
  const isFirstItem = currentPosition == 0;
  const isFirstPage = currentPage == 0;
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
          setVideos(response);
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
        {/* Controls Left Section */}
        <div className="flex items-center gap-4">
          {/* Navigation Controls */}
          <div className="flex gap-2">
            <Button
              onClick={() => navigateVideo("previous")}
              disabled={!hasPrevious}
              className={NAV_BUTTON_CLASSES}
              aria-label="Previous video"
            >
              <PreviousIcon style="h-6 w-6 fill-current text-[#4C585B]" />
            </Button>
            <Button
              onClick={() => navigateVideo("next")}
              disabled={isLastItem && isLastPage}
              className={NAV_BUTTON_CLASSES}
              aria-label="Next video"
            >
              <NextIcon style="h-6 w-6 fill-current text-[#4C585B]" />
            </Button>
          </div>

          {/* Playback Controls */}
          <div className="flex gap-2">
            <button
              onClick={seekBackward}
              className={COMMON_BUTTON_CLASSES}
              aria-label="Seek backward"
            >
              <SeekBackIcon style="h-6 w-6 fill-current text-[#4C585B]" />
            </button>
            <button
              onClick={toggleVideo}
              className={COMMON_BUTTON_CLASSES}
              aria-label={pause ? "Play" : "Pause"}
            >
              <div
                className={cx(
                  "w-6 h-6 rounded-full",
                  pause ? "bg-gray-700" : "border-2 border-gray-700",
                )}
              />
            </button>
            <button
              onClick={seekForward}
              className={COMMON_BUTTON_CLASSES}
              aria-label="Seek forward"
            >
              <SeekForwardIcon style="h-6 w-6 fill-current text-[#4C585B]" />
            </button>
          </div>

          {/* Speed Control */}
          <div className="relative">
            <button
              onClick={() => setShowSpeedDropdown(!showSpeedDropdown)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Change playback speed"
            >
              <Clock className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Speed: {currentSpeed}x</span>
            </button>

            {showSpeedDropdown && (
              <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {SPEED_OPTIONS.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={cx(
                      "w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
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
        <button
          onClick={toggleFavorite}
          className={COMMON_BUTTON_CLASSES}
          aria-label={
            currentVideoData?.isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          <Heart
            className={cx(
              "w-5 h-5 transition-all duration-300",
              currentVideoData?.isFavorite
                ? "text-red-500 fill-red-500 scale-110"
                : "text-gray-700 fill-transparent",
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default VideoButtonsBar;
