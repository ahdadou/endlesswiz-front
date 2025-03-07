// app/dashboard/videoslibrary/page.tsx
"use client";

import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import api from "@/clients/api/api";
import YouTubePlayerComponent from "@/components/YouTubePlayerComponent/YouTubePlayerComponent";
import { SubTitleComponent } from "@/components/SubTitleComponent/SubTitleComponent";
import { Loader2, Play } from "lucide-react";
import useWindowDimensions, {
  SMALL_MIN_WIDTH,
} from "@/utils/useWindowDimensions";

export const categories = [
  { id: "Favorite", label: "Favorite" },
  { id: "Technology", label: "Technology" },
  { id: "Sports", label: "Sports" },
  { id: "Politics", label: "Politics" },
  { id: "Comedy", label: "Comedy" },
  { id: "Science", label: "Science" },
  { id: "Others", label: "Others" },
];

const VideoLibraryPage = () => {
  const { currentVideo, setVideos, videos, setCurrentVideo } =
    useZustandState();
  const [selectedCategory, setSelectedCategory] = useState("Favorite");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const observer = useRef<IntersectionObserver>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { innerWidth } = useWindowDimensions();
  const isExtraSmall = useMemo(
    () => innerWidth < SMALL_MIN_WIDTH,
    [innerWidth]
  );

  const fetchVideos = useCallback(
    async (pageNumber: number) => {
      setIsLoading(true);
      setError("");
      console.log("###  -------> page :", page);
      try {
        const response =
          selectedCategory === "Favorite"
            ? await api.getVideosByUser(undefined, page, undefined, true)
            : await api.getVideosByUser(undefined, page, selectedCategory);

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

        var totalVideos = [
          ...videos.videosDetailResponse,
          ...response.videosDetailResponse,
        ];
        setVideos({
          currentPage: response.currentPage,
          pageSize: totalVideos.length ?? 0,
          totalPages: response.totalPages,
          videosDetailResponse:
            pageNumber === 1 ? response.videosDetailResponse : totalVideos,
        });

        setHasMore(response.currentPage < response.totalPages - 1);
      } catch (err) {
        console.log("Failed to fetch videos ", err);
        setError("Failed to fetch videos");
      } finally {
        setIsLoading(false);
      }
    },
    [page, selectedCategory, videos.videosDetailResponse]
  );

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

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchVideos(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (page > 0) fetchVideos(page);
  }, [page]);

  return (
    <div className="flex bg-background">
      <div className="flex-1 p-6 h-screen overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header */}
          <div className=" flex items-center justify-between mb-6 flex-col md:flex-row gap-6">
            <h1 className="text-2xl font-bold">Video Library</h1>
            <div
              className="flex gap-2 px-4 w-[90%] overflow-x-auto 
               [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
               md:w-[auto] md:overflow-hidden"
            >
              {" "}
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                  whileHover={{ scale: 1.03 }}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Content */}

          {isExtraSmall ? (
            <div className="flex overflow-hidden flex-col md:flex-row">
              {/* Video Player Section */}
              <div className="w-[100%] h-[100%] flex flex-col gap-4 overflow-y-auto">
                <div className="aspect-video bg-muted rounded-md overflow-hidden">
                  {currentVideo ? (
                    <YouTubePlayerComponent />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <p className="text-muted-foreground">
                        Select a video to play
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Video List */}
              <div
                ref={listRef}
                className="w-[100%] md:w-[40%] flex flex-col gap-4 overflow-y-auto pr-4"
              >
                {/* Subtitles */}
                <div className="flex-1">
                  {currentVideo ? (
                    <SubTitleComponent isAuthenticated={true} />
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      Video subtitles will appear here
                    </div>
                  )}
                </div>
                {videos.videosDetailResponse.map((video) => (
                  <motion.div
                    key={video.videoId}
                    onClick={() => setCurrentVideo(0, video)}
                    className={`cursor-pointer group rounded-lg p-3 transition-colors ${
                      currentVideo?.video.videoId === video.videoId
                        ? "bg-primary/10 border-2 border-primary"
                        : "transition-transform duration-300 ease-in-out hover:scale-95 hover:bg-muted"
                    }`}
                  >
                    <div className="relative aspect-video w-full rounded-md overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${video.vid}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white fill-white/20 stroke-[3]" />
                      </div>
                      <span className="absolute bottom-2 right-2 text-xs bg-background/90 px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {hasMore && (
                  <div
                    ref={loaderRef}
                    className="w-full flex flex-col gap-2 p-3"
                  >
                    <Skeleton className="w-full aspect-video rounded-md bg-muted" />
                    <Skeleton className="w-3/4 h-4 rounded bg-muted" />
                    <Skeleton className="w-1/2 h-4 rounded bg-muted" />
                  </div>
                )}

                {isLoading && (
                  <div className="w-full py-4 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                )}

                {error && (
                  <div className="text-center text-destructive p-4">
                    {error}
                  </div>
                )}

                {!hasMore && (
                  <p className="text-center text-muted-foreground text-sm p-4">
                    No more videos to load
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-6 overflow-hidden flex-col md:flex-row">
              {/* Video Player Section */}
              <div className="w-[100%] flex flex-col gap-4 overflow-y-auto">
                <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                  {currentVideo ? (
                    <YouTubePlayerComponent />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <p className="text-muted-foreground">
                        Select a video to play
                      </p>
                    </div>
                  )}
                </div>

                {/* Subtitles */}
                <div className="flex-1">
                  {currentVideo ? (
                    <SubTitleComponent isAuthenticated={true} />
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      Video subtitles will appear here
                    </div>
                  )}
                </div>
              </div>

              {/* Video List */}
              <div
                ref={listRef}
                className="w-[100%] md:w-[40%] flex flex-col gap-4 overflow-y-auto pr-4"
              >
                {videos.videosDetailResponse.map((video) => (
                  <motion.div
                    key={video.videoId}
                    onClick={() => setCurrentVideo(0, video)}
                    className={`cursor-pointer group rounded-lg p-3 transition-colors ${
                      currentVideo?.video.videoId === video.videoId
                        ? "bg-primary/10 border-2 border-primary"
                        : "transition-transform duration-300 ease-in-out hover:scale-95 hover:bg-muted"
                    }`}
                  >
                    <div className="relative aspect-video w-full rounded-md overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${video.vid}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white fill-white/20 stroke-[3]" />
                      </div>
                      <span className="absolute bottom-2 right-2 text-xs bg-background/90 px-2 py-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {hasMore && (
                  <div
                    ref={loaderRef}
                    className="w-full flex flex-col gap-2 p-3"
                  >
                    <Skeleton className="w-full aspect-video rounded-md bg-muted" />
                    <Skeleton className="w-3/4 h-4 rounded bg-muted" />
                    <Skeleton className="w-1/2 h-4 rounded bg-muted" />
                  </div>
                )}

                {isLoading && (
                  <div className="w-full py-4 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                )}

                {error && (
                  <div className="text-center text-destructive p-4">
                    {error}
                  </div>
                )}

                {!hasMore && (
                  <p className="text-center text-muted-foreground text-sm p-4">
                    No more videos to load
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoLibraryPage;
