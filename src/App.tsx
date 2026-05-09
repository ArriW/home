import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Repos } from "./components/Repos";
import { Contact } from "./components/Contact";
import { profile } from "./data/profile";

export function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Nav profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Repos username={profile.githubUsername} />
        <Contact profile={profile} />
      </main>
      <footer className="border-t border-zinc-900 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
