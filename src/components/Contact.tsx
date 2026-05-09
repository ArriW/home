import type { ProfileData } from "../data/profile";

interface ContactProps {
  readonly profile: ProfileData;
}

export function Contact({ profile }: ContactProps) {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-3xl font-bold text-zinc-100">contact</h2>
      <ul className="mt-6 space-y-2">
        {profile.emails.map((email) => (
          <li key={email.address} className="text-zinc-300">
            <span className="text-zinc-500">{email.label}: </span>
            <a className="hover:text-cyan-400" href={`mailto:${email.address}`}>
              {email.address}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
