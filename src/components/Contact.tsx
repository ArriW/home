import type { ProfileData } from "../data/profile";
import { SectionHeading } from "./SectionHeading";

interface ContactProps {
  readonly profile: ProfileData;
}

export function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeading>contact</SectionHeading>
      <ul className="mt-6 space-y-2">
        {profile.emails.map((email) => (
          <li key={email.address} className="font-mono text-sm">
            <span className="text-zinc-500">{email.label}</span>
            <span className="text-zinc-700"> :: </span>
            <a
              className="text-zinc-200 underline-offset-4 hover:text-cyan-400 hover:underline"
              href={`mailto:${email.address}`}
            >
              {email.address}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
