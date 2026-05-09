import type { GitHubRepo } from "../types";

const GITHUB_API = "https://api.github.com";

interface RawGitHubRepo {
  readonly id: number;
  readonly name: string;
  readonly full_name: string;
  readonly description: string | null;
  readonly html_url: string;
  readonly homepage: string | null;
  readonly language: string | null;
  readonly stargazers_count: number;
  readonly forks_count: number;
  readonly updated_at: string;
  readonly pushed_at: string;
  readonly fork: boolean;
  readonly archived: boolean;
  readonly topics?: readonly string[];
}

export async function fetchUserRepos(
  username: string,
  signal?: AbortSignal,
): Promise<GitHubRepo[]> {
  const url = `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&type=owner`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error ${response.status}: ${response.statusText}`,
    );
  }

  const raw: unknown = await response.json();
  if (!Array.isArray(raw)) {
    throw new Error("Unexpected GitHub API response: expected an array");
  }

  return raw.map(toRepo);
}

function toRepo(raw: unknown): GitHubRepo {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid repo entry: not an object");
  }
  const r = raw as RawGitHubRepo;
  return {
    id: r.id,
    name: r.name,
    fullName: r.full_name,
    description: r.description,
    htmlUrl: r.html_url,
    homepage: r.homepage,
    language: r.language,
    stargazersCount: r.stargazers_count,
    forksCount: r.forks_count,
    updatedAt: r.updated_at,
    pushedAt: r.pushed_at,
    fork: r.fork,
    archived: r.archived,
    topics: r.topics ?? [],
  };
}
