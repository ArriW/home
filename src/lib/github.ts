import type { Endpoints } from "@octokit/types";
import type { GitHubRepo } from "../types";

type ListUserReposResponse =
  Endpoints["GET /users/{username}/repos"]["response"]["data"];
type RawGitHubRepo = ListUserReposResponse[number];

const GITHUB_API = "https://api.github.com";

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
    signal: signal ?? null,
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error ${response.status}: ${response.statusText}`,
    );
  }

  const data = (await response.json()) as ListUserReposResponse;
  return data.map(toRepo);
}

function toRepo(r: RawGitHubRepo): GitHubRepo {
  return {
    id: r.id,
    name: r.name,
    fullName: r.full_name,
    description: r.description ?? null,
    htmlUrl: r.html_url,
    homepage: r.homepage ?? null,
    language: r.language ?? null,
    stargazersCount: r.stargazers_count ?? 0,
    forksCount: r.forks_count ?? 0,
    updatedAt: r.updated_at ?? null,
    pushedAt: r.pushed_at ?? null,
    fork: r.fork,
    archived: r.archived ?? false,
    topics: r.topics ?? [],
  };
}
