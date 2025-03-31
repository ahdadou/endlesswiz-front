import { Skeleton } from "@/components/ui/skeleton"

export default function ReadsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="mb-12">
          <Skeleton className="h-10 w-1/3 mb-4" />
          <Skeleton className="h-5 w-2/3 mb-2" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        {/* Search and filters skeleton */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-10 md:col-span-2" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>

        {/* Stories grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton className="h-[320px] w-full rounded-lg mb-3" />
              <div className="flex justify-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

