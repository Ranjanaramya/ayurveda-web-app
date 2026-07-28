export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-pulse">
      {/* Hero / Header Skeleton */}
      <div className="space-y-4 text-center max-w-2xl mx-auto pt-8">
        <div className="h-4 w-28 bg-mint-200/60 dark:bg-neutral-800 rounded-full mx-auto" />
        <div className="h-8 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-xl mx-auto" />
        <div className="h-4 w-5/6 bg-neutral-200/70 dark:bg-neutral-800/60 rounded-md mx-auto" />
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neutral-200/60 dark:border-white/10 bg-mint-50/50 dark:bg-neutral-900/40 p-4 space-y-4 backdrop-blur-xl"
          >
            {/* Image Skeleton */}
            <div className="aspect-video w-full rounded-xl bg-neutral-200 dark:bg-neutral-800" />
            
            {/* Text Line Skeletons */}
            <div className="space-y-2">
              <div className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-3 w-full bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
              <div className="h-3 w-4/5 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}