import type { ProfileData } from "../data/profile";

interface HeroProps {
  readonly profile: ProfileData;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section id="top" className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-mono text-5xl font-bold text-zinc-100 sm:text-6xl">
        --{profile.handle}--
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-zinc-300">
        {profile.tagline}
      </p>
    </section>
  );
}
