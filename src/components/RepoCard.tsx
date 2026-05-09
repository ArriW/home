import type { GitHubRepo } from "../types";
import { getLanguageColor } from "../lib/languageColors";

interface RepoCardProps {
  readonly repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  const lastUpdated =
    repo.pushedAt !== null
      ? new Date(repo.pushedAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
        })
      : null;

  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-4 transition hover:border-cyan-400/60 hover:bg-zinc-900/60"
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-mono text-base font-medium text-cyan-400 group-hover:text-cyan-300">
          {repo.name}
        </h3>
        {repo.stargazersCount > 0 && (
          <span className="font-mono text-xs text-zinc-500">
            ★ {repo.stargazersCount}
          </span>
        )}
      </div>
      {repo.description !== null && repo.description.length > 0 && (
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-zinc-300">
          {repo.description}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
        {repo.language !== null && (
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
        <span className="font-mono">updated {lastUpdated ?? "—"}</span>
      </div>
    </a>
  );
}
