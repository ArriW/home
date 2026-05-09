interface RepoCardSkeletonProps {
  readonly count?: number;
}

export function RepoCardSkeleton({ count = 4 }: RepoCardSkeletonProps) {
  return (
    <ul aria-busy="true" aria-label="Loading repositories" className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, idx) => (
        <li
          key={idx}
          className="rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-4"
        >
          <div className="flex items-baseline justify-between gap-2">
            <div className="shimmer h-4 w-24 rounded" />
            <div className="shimmer h-3 w-8 rounded" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="shimmer h-3 w-full rounded" />
            <div className="shimmer h-3 w-4/5 rounded" />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="shimmer h-3 w-16 rounded" />
            <div className="shimmer h-3 w-20 rounded" />
          </div>
        </li>
      ))}
    </ul>
  );
}
