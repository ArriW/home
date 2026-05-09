import type { SocialLink } from "../data/profile";

interface SocialLinksProps {
  readonly links: readonly SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-cyan-400 hover:text-cyan-400"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
