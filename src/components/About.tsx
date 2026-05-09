import type { ProfileData } from "../data/profile";
import { SocialLinks } from "./SocialLinks";

interface AboutProps {
  readonly profile: ProfileData;
}

export function About({ profile }: AboutProps) {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-20">
      <h2 className="text-3xl font-bold text-zinc-100">about</h2>
      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
        <img
          src={profile.photoUrl}
          alt={profile.photoAlt}
          className="h-64 w-auto rounded border border-zinc-800 object-cover"
        />
        <div className="flex-1">
          <p className="text-zinc-300">{profile.bio}</p>
          <div className="mt-6">
            <SocialLinks links={profile.social} />
          </div>
        </div>
      </div>
    </section>
  );
}
