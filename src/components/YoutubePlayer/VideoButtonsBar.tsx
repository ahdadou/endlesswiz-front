import React, { useCallback, useEffect } from "react";
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
  pause: boolean;
  style: string;
}

const VideoButtonsBar: React.FC<VideoButtonsBarProps> = ({
  seekBackward,
  toggleVideo,
  seekForward,
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

  return (
    <div className={cx(style, "flex flex-row gap-2 justify-center")}>
      <Button
        style="rounded-lg bg-black rounded-[100%] h-8 w-8 flex items-center justify-center p-2"
        onClick={previousVideo}
        disabled={currentVideoPosition < 1}
      >
        <PreviousIcon style="h-4 w-4" />
      </Button>
      <Button
        style="rounded-lg bg-black rounded-[100%] h-8 w-8 flex items-center justify-center  p-2"
        onClick={seekBackward}
      >
        <SeekBackIcon style="h-4 w-4" />
      </Button>
      <Button
        style="rounded-lg bg-black rounded-[100%] h-8 w-8 flex items-center justify-center"
        onClick={toggleVideo}
      >
        {pause ? <PlayIcon style="h-8 w-8" /> : <PauseIcon style="h-3 w-3" />}
      </Button>
      <Button
        style="rounded-lg bg-black rounded-[100%] h-8 w-8 flex items-center justify-center  p-2"
        onClick={seekForward}
      >
        <SeekForwardIcon style="h-4 w-4" />
      </Button>
      <Button
        style="rounded-lg bg-black rounded-[100%] h-8 w-8 flex items-center justify-center  p-2"
        onClick={nextVideo}
        disabled={
          currentVideoPosition >= videos.pageSize - 1 &&
          videos.currentPage >= videos.totalPages - 1
        }
      >
        <NextIcon style="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VideoButtonsBar;
