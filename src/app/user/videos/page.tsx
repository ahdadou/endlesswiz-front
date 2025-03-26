"use client";

import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import api from "@/clients/api/api";
import YouTubePlayerComponentV2 from "@/components/YouTubePlayerComponent/YouTubePlayerComponentV2";
import { SubTitleComponentV2 } from "@/components/SubTitleComponent/SubTitleComponentV2";
import {
  Loader2,
  Play,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useWindowDimensions, {
  SMALL_MIN_WIDTH,
} from "@/utils/useWindowDimensions";
import { formatTime } from "@/components/utils/TypeFormatUtils";

export const categories = [
  { id: "Favorite", label: "⭐ Favorites" },
  { id: "Technology", label: "💻 Technology" },
  { id: "Sports", label: "🏈 Sports" },
  { id: "Politics", label: "🏛️ Politics" },
  { id: "Comedy", label: "🎭 Comedy" },
  { id: "Science", label: "🔬 Science" },
  { id: "Others", label: "➕ Others" },
];

const VideoLibraryPage = () => {
  const { currentVideo, setVideos, videos, setCurrentVideo } =
    useZustandState();
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const observer = useRef<IntersectionObserver>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const { innerWidth } = useWindowDimensions();
  const isExtraSmall = useMemo(
    () => innerWidth < SMALL_MIN_WIDTH,
    [innerWidth],
  );

  const checkScroll = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
      const tolerance = 1; // Adjust this value if needed (e.g., 2 or 5 pixels)
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - tolerance);
    }
  };

  const handleCategoryScroll = (direction: "left" | "right") => {
    if (categoriesRef.current) {
      const scrollAmount = direction === "right" ? 200 : -200;
      categoriesRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const fetchVideos = async (pageNumber: number) => {
    setIsLoading(true);
    setError("");
    try {
      const response =
        selectedCategory === "Favorite"
          ? await api.getVideosByUser(
              undefined,
              pageNumber,
              10,
              undefined,
              true,
            )
          : await api.getVideosByUser(
              undefined,
              pageNumber,
              10,
              selectedCategory,
            );

      if (!response || response.videosDetailResponse.length === 0) {
        setHasMore(false);
        setVideos({
          currentPage: 0,
          totalPages: 0,
          pageSize: 0,
          videosDetailResponse: [],
        });
        return;
      }

      const videosRes =
        pageNumber === 0
          ? response.videosDetailResponse
          : [...videos.videosDetailResponse, ...response.videosDetailResponse];

      setVideos({
        currentPage: response.currentPage,
        pageSize: response.pageSize ?? 0,
        totalPages: response.totalPages,
        videosDetailResponse: videosRes,
      });

      setHasMore(response.currentPage < response.totalPages - 1);
    } catch (err) {
      console.error("Failed to fetch videos ", err);
      setError("Failed to fetch videos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchVideos(0);
  }, [selectedCategory]);

  useEffect(() => {
    if (page > 0) fetchVideos(page);
  }, [page]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);
    if (loaderRef.current) observer.current.observe(loaderRef.current);
  }, [hasMore, isLoading]);

  return (
    <div className="flex flex-col md:p-8 bg-gradient-to-b from-background">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-3xl font-bold bg-clip-text">Video Library</h1>
        <div className="relative group">
          {isExtraSmall && (
            <>
              <button
                onClick={() => handleCategoryScroll("left")}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#2d5a3d]/90 rounded-full transition-opacity ${
                  showLeftArrow ? "opacity-100" : "opacity-0"
                }`}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={() => handleCategoryScroll("right")}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#2d5a3d]/90 rounded-full transition-opacity ${
                  showRightArrow ? "opacity-100" : "opacity-0"
                }`}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </>
          )}
          <div
            ref={categoriesRef}
            onScroll={checkScroll}
            className="flex gap-2 no-scrollbar overflow-x-auto pb-2 scrollbar-thumb-[#2d5a3d]/20"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-[#2d5a3d] text-white shadow-lg"
                    : "bg-[#e0efe3] hover:bg-[#cde0d1] text-[#2d5a3d]"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex gap-6 ${isExtraSmall ? "flex-col" : "flex-row"}`}>
        {/* Player and Subtitles Section */}
        <div className={`flex flex-col gap-4 w-full`}>
          <div className="rounded-xl shadow-lg overflow-hidden">
            <YouTubePlayerComponentV2 />
          </div>

          <div className={`${isExtraSmall ? "h-[40vh]" : "h-[60vh]"}`}>
            <SubTitleComponentV2
              isAuthenticated={true}
              showCurrentTranscriptInTheMiddle={false}
            />
          </div>
        </div>

        {/* Video List */}
        <div
          ref={listRef}
          className="w-[100%] md:w-[40%] flex flex-col gap-4 no-scrollbar overflow-y-auto h-[60vh] md:h-[120vh] p-2 relative"
        >
          <div className="space-y-3">
            {videos.videosDetailResponse.map((video, index) => (
              <motion.div
                key={video.videoId}
                onClick={() => setCurrentVideo(index, video)}
                className={`group relative cursor-pointer rounded-lg p-2 transition-all ${
                  currentVideo?.video?.videoId === video.videoId
                    ? "ring-2 ring-[#2d5a3d] "
                    : "hover:bg-[#e0efe3]/50"
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="relative aspect-video w-full rounded-md overflow-hidden shadow-sm">
                  <img
                    src={`https://img.youtube.com/vi/${video.vid}/hqdefault.jpg`}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 text-xs bg-[#2d5a3d]/90 text-white px-2 py-1 rounded">
                    {formatTime(video.duration)}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white fill-white/20 stroke-[3]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <div ref={loaderRef} className="w-full flex flex-col gap-2 p-3">
              <Skeleton className="w-full aspect-video rounded-md bg-muted" />
              <Skeleton className="w-3/4 h-4 rounded bg-muted" />
              <Skeleton className="w-1/2 h-4 rounded bg-muted" />
            </div>
          )}

          {isLoading && (
            <div className="w-full py-4 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#2d5a3d]" />
            </div>
          )}

          {error && <div className="text-center text-red-600 p-4">{error}</div>}

          {!hasMore && (
            <p className="text-center text-[#2d5a3d]/70 text-sm p-4">
              🎉 You've reached the end!
            </p>
          )}

          {hasMore && (
            <div className="absolute bottom-[40%] right-[45%] bg-white rounded-full p-2 shadow-lg">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex justify-center"
              >
                <ArrowDown className="h-6 w-6 text-[#2d5a3d] animate-bounce" />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoLibraryPage;
