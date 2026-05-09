import type { ProfileData } from "../data/profile";
import { SectionHeading } from "./SectionHeading";
import { SocialLinks } from "./SocialLinks";

interface AboutProps {
  readonly profile: ProfileData;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeading>about</SectionHeading>
      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
        <img
          src={profile.photoUrl}
          alt={profile.photoAlt}
          className="h-64 w-auto rounded-lg border border-zinc-800/80 object-cover shadow-lg shadow-black/40"
        />
        <div className="flex-1">
          <p className="leading-relaxed text-zinc-300">{profile.bio}</p>
          <div className="mt-6">
            <SocialLinks links={profile.social} />
          </div>
        </div>
      </div>
    </section>
  );
}
