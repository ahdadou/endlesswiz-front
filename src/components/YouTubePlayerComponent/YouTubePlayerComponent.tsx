"use client";

import api from "@/clients/api/api";
import { useCallback, useEffect, useRef, useState } from "react";
import VideoButtonsBar from "./VideoButtonsBar";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import { TranscriptResponse } from "@/clients/types/apiTypes";
import ReactPlayer from "react-player";

const YouTubePlayerComponent = () => {
  const {
    currentVideo,
    transcript,
    setTranscript,
    setCurrentTranscript,
    setVid,
  } = useZustandState();

  const playerRef = useRef<ReactPlayer | null>(null);
  const [pip, setPip] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [controls, setControls] = useState(false);
  const [light, setLight] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop, setLoop] = useState(false);
  const [seeking, setSeeking] = useState(false);

  const handleToggleControls = () => {
    setPlaying(!playing);
  };

  const seekBackward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(0, currentTime - 5));
    }
  };

  const seekForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 5);
    }
  };

  const changeSpeed = (speed: number) => {
    setPlaybackRate(speed);
  };

  const handleReset = () => {
    if (
      playerRef.current &&
      currentVideo.video?.transcriptResponse?.startTime
    ) {
      playerRef.current.seekTo(currentVideo.video.transcriptResponse.startTime);
      setCurrentTranscript(currentVideo.video.transcriptResponse);
    }
  };

  const fetchTranscript = useCallback(async () => {
    if (currentVideo.video) {
      const response = await api.fetchVideosTranscript(
        currentVideo.video?.videoId
      );
      setVid(currentVideo.video?.vid);
      response && setTranscript(response);
    }
  }, [
    currentVideo?.video?.videoId,
    setTranscript,
    setCurrentTranscript,
    setVid,
  ]);

  useEffect(() => {
    setCurrentTranscript(currentVideo.video.transcriptResponse);
    if (playerRef.current) {
      playerRef.current.seekTo(
        currentVideo.video?.transcriptResponse?.startTime
      );
    }
    fetchTranscript();
  }, [currentVideo?.video?.videoId]);

  const updateTranscript = (time: number) => {
    const transcriptEntry = transcript.find((entry: TranscriptResponse) => {
      return time >= entry.startTime && time < entry.endTime; // Assuming each entry is 2 seconds long
    });

    if (transcriptEntry) {
      setCurrentTranscript(transcriptEntry);
    }
  };

  if (!currentVideo) {
    return null;
  }

  return (
    <div className="relative h-full w-full flex flex-col bg-white">
      <ReactPlayer
        key={currentVideo.video?.vid}
        ref={playerRef}
        className="react-player"
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
        onStart={() => console.log("onStart")}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onBuffer={() => console.log("onBuffer")}
        onSeek={(e) => console.log("onSeek", e)}
        onError={(e) => console.log("onError", e)}
        onProgress={({ played, loaded, playedSeconds }) => {
          updateTranscript(playedSeconds);
          if (!seeking) {
            setPlayed(played);
            setLoaded(loaded);
          }
        }}
        // onEnablePIP={this.handleEnablePIP}
        // onDisablePIP={this.handleDisablePIP}
        // onPlaybackRateChange={playbackRate}
        // onEnded={this.handleEnded}
        // onProgress={this.handleProgress}
        // onDuration={this.handleDuration}
        // onPlaybackQualityChange={e => console.log('onPlaybackQualityChange', e)}
      />
      <VideoButtonsBar
        toggleVideo={handleToggleControls}
        seekBackward={seekBackward}
        seekForward={seekForward}
        changeSpeed={changeSpeed}
        handleReset={handleReset}
        pause={!playing}

        played={played}
        onSeekMouseDown={()=>setSeeking(true)}
        onSeekChange={(value) => setPlayed(value)}
        onSeekMouseUp={(value) => {
          setSeeking(false);
          if (playerRef.current) {
            playerRef.current.seekTo(value);
          }
        }}
        style="w-full"
      />
    </div>
  );
};

export default YouTubePlayerComponent;
