import { SectionHeading } from "./SectionHeading";

interface Article {
  readonly slug: string;
  readonly title: string;
  readonly dek: string;
  readonly date: string;
  readonly readingTime: string;
  readonly tag: string;
}

const articles: readonly Article[] = [
  {
    slug: "/skillcraft-regression",
    title: "What Makes a StarCraft Player Skilled?",
    dek: "Twenty in-game metrics, three thousand ranked players, and the awkward truth that speed isn't everything.",
    date: "November 4, 2020",
    readingTime: "6 min read",
    tag: "Essay · Data",
  },
];

export function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-3xl px-6 py-20">
      <SectionHeading>writing</SectionHeading>
      <ul className="mt-8 flex flex-col gap-4">
        {articles.map((article) => (
          <li key={article.slug}>
            <a
              href={article.slug}
              className="group block rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-6 transition hover:border-cyan-400/40 hover:bg-zinc-900/70"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cyan-400">
                {article.tag}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-medium text-zinc-100 transition group-hover:text-cyan-100 sm:text-3xl">
                {article.title}
              </h3>
              <p className="mt-3 font-serif text-base leading-relaxed text-zinc-400 sm:text-lg">
                {article.dek}
              </p>
              <p className="mt-4 font-mono text-xs text-zinc-500">
                {article.date} · {article.readingTime}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
