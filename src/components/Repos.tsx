import { useGitHubRepos } from "../hooks/useGitHubRepos";
import type { GitHubRepo } from "../types";
import { RepoCard } from "./RepoCard";
import { RepoCardSkeleton } from "./RepoCardSkeleton";
import { SectionHeading } from "./SectionHeading";

interface ReposProps {
  readonly username: string;
  readonly featuredNames: readonly string[];
}

const MAX_OTHER_REPOS = 9;

function rankRepos(repos: readonly GitHubRepo[]): readonly GitHubRepo[] {
  return [...repos]
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => {
      if (b.stargazersCount !== a.stargazersCount) {
        return b.stargazersCount - a.stargazersCount;
      }
      return (b.pushedAt ?? "").localeCompare(a.pushedAt ?? "");
    });
}

function splitFeatured(
  repos: readonly GitHubRepo[],
  featuredNames: readonly string[],
): { readonly featured: readonly GitHubRepo[]; readonly other: readonly GitHubRepo[] } {
  if (featuredNames.length === 0) {
    return { featured: [], other: repos };
  }
  const featuredSet = new Set(featuredNames);
  const featured = featuredNames
    .map((name) => repos.find((r) => r.name === name))
    .filter((r): r is GitHubRepo => r !== undefined);
  const other = repos.filter((r) => !featuredSet.has(r.name));
  return { featured, other };
}

export function Repos({ username, featuredNames }: ReposProps) {
  const state = useGitHubRepos(username);

  return (
    <section id="repos" className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeading>repos</SectionHeading>
      <p className="mt-2 font-mono text-xs text-zinc-500">
        live from{" "}
        <a
          className="underline-offset-4 hover:text-cyan-400 hover:underline"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/{username}
        </a>
      </p>

      <div className="mt-8">
        {state.status === "idle" || state.status === "loading" ? (
          <RepoCardSkeleton />
        ) : state.status === "error" ? (
          <p className="text-sm text-red-400">
            Could not load repos: {state.error.message}
          </p>
        ) : (
          <ReposGrid
            repos={rankRepos(state.data)}
            featuredNames={featuredNames}
          />
        )}
      </div>
    </section>
  );
}

interface ReposGridProps {
  readonly repos: readonly GitHubRepo[];
  readonly featuredNames: readonly string[];
}

function ReposGrid({ repos, featuredNames }: ReposGridProps) {
  const { featured, other } = splitFeatured(repos, featuredNames);
  const visibleOther = other.slice(0, MAX_OTHER_REPOS);

  return (
    <div className="space-y-10">
      {featured.length > 0 && (
        <div>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
            featured
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {featured.map((repo) => (
              <li key={repo.id}>
                <RepoCard repo={repo} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {visibleOther.length > 0 && (
        <div>
          {featured.length > 0 && (
            <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              more
            </h3>
          )}
          <ul className="grid gap-4 sm:grid-cols-2">
            {visibleOther.map((repo) => (
              <li key={repo.id}>
                <RepoCard repo={repo} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
