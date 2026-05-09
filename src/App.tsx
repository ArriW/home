import { HomePage } from "./pages/HomePage";
import { SkillcraftArticle } from "./pages/SkillcraftArticle";

export function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  if (path === "/skillcraft-regression") {
    return <SkillcraftArticle />;
  }
  return <HomePage />;
}
