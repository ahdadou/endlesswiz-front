import React, { useState } from "react";
import cx from "classnames";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Captions,
  Settings,
} from "lucide-react";
import useVideosStore from "@/stores/useVideosStore";
import { PreviousIcon } from "@/Icons/PreviousIcon";
import { NextIcon } from "@/Icons/NextIcon";
import { SeekForwardIcon } from "@/Icons/SeekForwardIcon";
import { SeekBackIcon } from "@/Icons/SeekBackIcon";
import { Button } from "../ui/button";

interface VideoButtonsBarProps {
  seekBackward: () => void;
  toggleVideo: () => void;
  seekForward: () => void;
  changeSpeed: (speed: number) => void;
  pause: boolean;
  style: string;
}

const speedOptions: number[] = [0.5, 1, 1.5, 2];

const VideoButtonsBar: React.FC<VideoButtonsBarProps> = ({
  seekBackward,
  toggleVideo,
  seekForward,
  changeSpeed,
  pause,
  style,
}) => {
  const { currentVideoPosition, setCurrentVideoPosition, videos } =
    useVideosStore();
  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);

  const nextVideo = () => {
    if (currentVideoPosition < videos.pageSize - 1) {
      setCurrentVideoPosition(currentVideoPosition + 1);
    }
  };

  const previousVideo = () => {
    if (currentVideoPosition > 0) {
      setCurrentVideoPosition(currentVideoPosition - 1);
    }
  };

  return (
    <div
      className={cx(
        style,
        "w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100",
      )}
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Video Navigation */}
          <div className="flex gap-2">
            <Button
              onClick={previousVideo}
              disabled={currentVideoPosition < 1}
              className="hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 bg-white cursor-pointer w-11"
            >
              <PreviousIcon style="h-6 w-6 fill-current text-[#4C585B]" />
            </Button>
            <Button
              onClick={nextVideo}
              disabled={
                currentVideoPosition >= videos.pageSize - 1 &&
                videos.currentPage >= videos.totalPages - 1
              }
              className="hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 bg-white cursor-pointer w-11"
            >
              <NextIcon style="h-6 w-6 fill-current text-[#4C585B]" />
            </Button>
          </div>

          {/* Seek Controls */}
          <div className="flex gap-2">
            <button
              onClick={seekBackward}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SeekBackIcon style="h-6 w-6 fill-current text-[#4C585B]" />
            </button>
            <button
              onClick={toggleVideo}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {pause ? (
                <div className="w-6 h-6 bg-gray-700 rounded-full" />
              ) : (
                <div className="w-6 h-6 border-2 border-gray-700 rounded-full" />
              )}
            </button>
            <button
              onClick={seekForward}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <SeekForwardIcon style="h-6 w-6 fill-current text-[#4C585B]" />
            </button>
          </div>

          {/* Speed Control */}
          <div className="relative">
            <button
              onClick={() => setShowSpeedDropdown(!showSpeedDropdown)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Clock className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700">Speed: {currentSpeed}x</span>
            </button>

            {showSpeedDropdown && (
              <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {speedOptions.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => {
                      changeSpeed(speed);
                      setCurrentSpeed(speed);
                      setShowSpeedDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 ${
                      currentSpeed === speed ? "bg-blue-50 text-blue-600" : ""
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Captions className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoButtonsBar;
