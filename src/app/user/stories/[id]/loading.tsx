import { Skeleton } from "@/components/ui/skeleton";

export default function ReadStoryLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header skeleton */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-9 w-9 rounded-md" />
            <div>
              <Skeleton className="h-6 w-40 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-9 w-9 rounded-md" />
            ))}
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Reading progress skeleton */}
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-10 rounded-md" />
            <Skeleton className="h-8 w-10 rounded-md" />
          </div>
        </div>

        {/* Story content skeleton */}
        <div className="mb-8 p-6 rounded-lg bg-gray-100 shadow-md">
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-6 w-full mb-3" />
          <Skeleton className="h-6 w-3/4 mb-3" />

          <div className="mt-6 flex justify-center">
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>

        {/* Navigation skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-4 w-full mx-4 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </main>
    </div>
  );
}
