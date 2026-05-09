import type { ProfileData } from "../data/profile";

interface HeroProps {
  readonly profile: ProfileData;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section id="top" className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
        {profile.name}
      </p>
      <h1 className="mt-3 font-mono text-5xl font-bold tracking-tight text-zinc-100 sm:text-7xl">
        --{profile.handle}--
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300">
        {profile.tagline}
      </p>
    </section>
  );
}
