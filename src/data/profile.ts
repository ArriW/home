export interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly handle: string;
}

export interface EmailEntry {
  readonly label: string;
  readonly address: string;
}

export interface ProfileData {
  readonly name: string;
  readonly handle: string;
  readonly siteTitle: string;
  readonly tagline: string;
  readonly bio: string;
  readonly photoUrl: string;
  readonly photoAlt: string;
  readonly githubUsername: string;
  readonly resumeUrl: string;
  readonly emails: readonly EmailEntry[];
  readonly social: readonly SocialLink[];
  readonly featuredRepoNames: readonly string[];
}

export const profile: ProfileData = {
  name: "Arrington Walters",
  handle: "AW",
  siteTitle: "Skillcraft.Codes",
  tagline:
    "Process Engineer at Tesla's Gigafactory 1. My work is focused on sustaining Tesla's Energy products lines. My skills are focused on applications of Lean Six Sigma and statistics. This is my home for my professional and creative interests.",
  bio: "Ive spent most of my years in Maryland, before moving to Nevada. I am a gamer, baker, statistician, and a explorer.",
  photoUrl: "/assets/redwoods_0.png",
  photoAlt: "Arrington Walters in the redwoods",
  githubUsername: "ArriW",
  resumeUrl: "https://registry.jsonresume.org/arriw/",
  emails: [
    { label: "personal", address: "arrington.walters@gmail.com" },
    { label: "work", address: "arwalters@tesla.com" },
  ],
  social: [
    { name: "GitHub", url: "https://github.com/ArriW", handle: "ArriW" },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/arrington-walters-85b86ba8",
      handle: "arrington-walters",
    },
    { name: "Twitch", url: "https://www.twitch.tv/conjura", handle: "conjura" },
  ],
  featuredRepoNames: [],
};
