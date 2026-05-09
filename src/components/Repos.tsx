import { useGitHubRepos } from "../hooks/useGitHubRepos";
import { RepoCard } from "./RepoCard";

interface ReposProps {
  readonly username: string;
}

const MAX_VISIBLE_REPOS = 12;

export function Repos({ username }: ReposProps) {
  const state = useGitHubRepos(username);

  return (
    <section id="repos" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-3xl font-bold text-zinc-100">repos</h2>
      <p className="mt-2 text-sm text-zinc-500">
        Live from{" "}
        <a
          className="underline hover:text-cyan-400"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/{username}
        </a>
      </p>
      <div className="mt-8">
        {state.status === "loading" && (
          <p className="text-zinc-400">Loading...</p>
        )}
        {state.status === "error" && (
          <p className="text-red-400">
            Could not load repos: {state.error.message}
          </p>
        )}
        {state.status === "success" && (
          <ul className="grid gap-4 sm:grid-cols-2">
            {state.data
              .filter((r) => !r.fork && !r.archived)
              .slice(0, MAX_VISIBLE_REPOS)
              .map((repo) => (
                <li key={repo.id}>
                  <RepoCard repo={repo} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}
