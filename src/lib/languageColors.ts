const LANGUAGE_COLORS: Readonly<Record<string, string>> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  R: "#198CE7",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  "Jupyter Notebook": "#DA5B0B",
  Lua: "#000080",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Clojure: "#db5855",
  Markdown: "#083fa1",
  TeX: "#3D6117",
  Solidity: "#AA6746",
  Zig: "#ec915c",
  Nix: "#7e7eff",
  Astro: "#ff5a03",
  MDX: "#fcb32c",
  SQL: "#e38c00",
};

const FALLBACK_COLOR = "#6b7280";

export function getLanguageColor(language: string | null): string {
  if (language === null) return FALLBACK_COLOR;
  return LANGUAGE_COLORS[language] ?? FALLBACK_COLOR;
}
