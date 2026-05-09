import type { ProfileData } from "../data/profile";

interface NavLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

interface NavProps {
  readonly profile: ProfileData;
}

export function Nav({ profile }: NavProps) {
  const links: readonly NavLink[] = [
    { label: "about", href: "#about" },
    { label: "writing", href: "#writing" },
    { label: "repos", href: "#repos" },
    { label: "resume", href: profile.resumeUrl, external: true },
    { label: "contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-base font-bold text-cyan-400">
          {profile.siteTitle}
        </a>
        <ul className="flex gap-4 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-zinc-300 transition hover:text-cyan-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
