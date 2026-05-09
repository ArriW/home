import { z } from "zod";
import type { GitHubRepo } from "../types";

const GITHUB_API = "https://api.github.com";

const RawGitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  updated_at: z.string(),
  pushed_at: z.string(),
  fork: z.boolean(),
  archived: z.boolean(),
  topics: z.array(z.string()).optional(),
});

type RawGitHubRepo = z.infer<typeof RawGitHubRepoSchema>;

const RawGitHubReposResponseSchema = z.array(RawGitHubRepoSchema);

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

  const raw: unknown = await response.json();
  const parsed = RawGitHubReposResponseSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Invalid GitHub API response: ${parsed.error.message}`);
  }

  return parsed.data.map(toRepo);
}

function toRepo(r: RawGitHubRepo): GitHubRepo {
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
