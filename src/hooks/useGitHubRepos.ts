import { useEffect, useState } from "react";
import { fetchUserRepos } from "../lib/github";
import type { FetchState, GitHubRepo } from "../types";

export function useGitHubRepos(username: string): FetchState<readonly GitHubRepo[]> {
  const [state, setState] = useState<FetchState<readonly GitHubRepo[]>>({
    status: "idle",
  });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });
    fetchUserRepos(username, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setState({ status: "success", data });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ status: "error", error });
      });
    return () => {
      controller.abort();
    };
  }, [username]);

  return state;
}
