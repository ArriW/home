import type { GitHubRepo } from "../types";

interface RepoCardProps {
  readonly repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  const lastUpdated = new Date(repo.pushedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });

  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full rounded border border-zinc-800 bg-zinc-900/40 p-4 transition hover:border-cyan-400"
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-mono text-base text-cyan-400">{repo.name}</h3>
        <span className="text-xs text-zinc-500">★ {repo.stargazersCount}</span>
      </div>
      {repo.description !== null && repo.description.length > 0 && (
        <p className="mt-2 text-sm text-zinc-300">{repo.description}</p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
        {repo.language !== null && <span>{repo.language}</span>}
        <span>updated {lastUpdated}</span>
      </div>
    </a>
  );
}
