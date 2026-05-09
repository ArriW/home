export interface GitHubRepo {
  readonly id: number;
  readonly name: string;
  readonly fullName: string;
  readonly description: string | null;
  readonly htmlUrl: string;
  readonly homepage: string | null;
  readonly language: string | null;
  readonly stargazersCount: number;
  readonly forksCount: number;
  readonly updatedAt: string | null;
  readonly pushedAt: string | null;
  readonly fork: boolean;
  readonly archived: boolean;
  readonly topics: readonly string[];
}

export type FetchState<T> =
  | { readonly status: "idle" }
  | { readonly status: "loading" }
  | { readonly status: "success"; readonly data: T }
  | { readonly status: "error"; readonly error: Error };
