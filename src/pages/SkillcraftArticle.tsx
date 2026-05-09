import { useEffect, useState } from "react";

interface Coefficient {
  readonly name: string;
  readonly effect: number;
  readonly direction: "positive" | "negative";
  readonly note: string;
}

const coefficients: readonly Coefficient[] = [
  {
    name: "ActionLatency",
    effect: 0.433,
    direction: "negative",
    note: "milliseconds from screen-fixation to first action — lower is better",
  },
  {
    name: "TotalHours",
    effect: 0.253,
    direction: "positive",
    note: "lifetime hours played",
  },
  {
    name: "AssignToHotkeys",
    effect: 0.157,
    direction: "positive",
    note: "rate of binding units & buildings to hotkeys",
  },
  {
    name: "MinimapAttacks",
    effect: 0.109,
    direction: "positive",
    note: "attack commands issued via the minimap",
  },
  {
    name: "SelectByHotkeys",
    effect: 0.105,
    direction: "positive",
    note: "selecting via hotkey rather than clicking",
  },
];

export function SkillcraftArticle() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      setProgress(pct);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <article className="min-h-screen bg-zinc-950 font-serif text-zinc-200 antialiased">
      <div
        className="fixed inset-x-0 top-0 z-20 h-0.5 origin-left bg-cyan-400"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden
      />

      <header className="sticky top-0 z-10 border-b border-zinc-900/80 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <a
            href="/"
            className="font-mono text-sm text-zinc-400 transition hover:text-cyan-400"
          >
            ← skillcraft.codes
          </a>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">
            Essay · Data
          </span>
        </div>
      </header>

      <Hero />

      <Body />

      <footer className="border-t border-zinc-900 px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-zinc-500">
            About this piece
          </p>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            Adapted from a 2020 multivariate-regression analysis written in R
            against the{" "}
            <a
              href="https://archive.ics.uci.edu/ml/datasets/SkillCraft1+Master+Table+Dataset"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline-offset-2 hover:underline"
            >
              UCI SkillCraft1 Master Table
            </a>
            . Full original analysis with diagnostics, BoxCox, Cook's distance,
            and the ordinal-logistic remediation lives in the source repo.
          </p>
          <p className="mt-8 font-mono text-xs text-zinc-600">
            <a
              href="/"
              className="text-zinc-400 transition hover:text-cyan-400"
            >
              Back to skillcraft.codes
            </a>
          </p>
        </div>
      </footer>
    </article>
  );
}

function Hero() {
  return (
    <section className="border-b border-zinc-900 px-6 pb-20 pt-24 sm:pt-32">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
          The SkillCraft Question
        </p>
        <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl md:text-7xl">
          What makes a StarCraft player{" "}
          <span className="italic text-cyan-300">skilled</span>?
        </h1>
        <p className="mt-8 max-w-2xl font-serif text-xl leading-relaxed text-zinc-300 sm:text-2xl">
          Twenty in-game metrics, three thousand ranked players, and the
          awkward truth that speed alone isn't enough.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
          <span className="text-zinc-300">By Arrington Walters</span>
          <span className="text-zinc-700">·</span>
          <span>November 4, 2020</span>
          <span className="text-zinc-700">·</span>
          <span>6 min read</span>
        </div>
      </div>
    </section>
  );
}

function Body() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-10">
        <Lede />
        <ByTheNumbers />
        <Section title="The dataset">
          <p>
            The{" "}
            <a
              href="https://archive.ics.uci.edu/ml/datasets/SkillCraft1+Master+Table+Dataset"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline-offset-2 hover:underline"
            >
              UCI SkillCraft1 Master Table
            </a>{" "}
            captures a slice of the 2013 ranked season: roughly thirty-three
            hundred players, twenty in-game metrics each, all averaged across a
            season's worth of matches. The response variable is{" "}
            <em className="font-serif italic text-zinc-100">LeagueIndex</em> —
            an integer from 1 (Bronze) to 8 (Professional). Everything else is
            the question: which behaviors actually move you up the ladder?
          </p>
          <p>
            APMs measure raw clicking speed. PACs — perception-action cycles —
            count screen fixations that contain at least one action. Hotkey
            metrics measure how players bind, select, and switch between
            unit groups. Workers and minimap actions stand in for economic and
            strategic awareness. None of them, on their own, mean very much. The
            point of the analysis is to see which ones still mean something
            after you've controlled for the rest.
          </p>
        </Section>

        <Section title="Cleaning the noise">
          <p>
            Before any of that, the data has to be wrestled into shape. The
            cleaning notes read like a small forensics report.
          </p>
          <p>
            One player, GameID 5140, reported{" "}
            <strong className="font-serif font-semibold text-zinc-50">
              one million total hours played
            </strong>
            . That's 114 years on a game that, in 2020, was ten years old.
            Maybe a typo — strip a zero and it's 14 years, which is still more
            than the game has existed. Strip another and it's 1.4 years.
            Another, and it's 51 days. The actual answer is unrecoverable, so
            the row gets dropped.
          </p>
          <PullQuote>
            One player reported a hundred and sixty-eight hours per week. There
            are exactly that many hours in a week.
          </PullQuote>
          <p>
            The 168-hour-per-week player stays in. Probably a shared account.
            Possibly an early DeepMind agent. Possibly someone gaming the
            self-report field. The next-highest value is 140, which isn't much
            more believable, so the cutoff is arbitrary either way and the row
            gets to live.
          </p>
          <p>
            The fifty-five players at LeagueIndex 8 — the professionals — get
            dropped too. Their <em className="italic">Age</em> field is empty
            and their <em className="italic">HoursPerWeek</em> is zero, because
            "professional" isn't earned through the matchmaker; it's a separate
            tier that doesn't share the same data. The question this analysis
            cares about is how regular players move from average to good. So:
            stop short of the pros.
          </p>
        </Section>

        <Section title="What stuck">
          <p>
            The first model throws every predictor at the wall. Then,
            iteratively, the ones with p-values above 5% come off, one at a
            time. Age leaves first. Then UniqueUnitsMade. Then ComplexUnitsMade.
            Then MinimapRightClicks. Then TotalMapExplored. By the end,{" "}
            <strong className="font-serif font-semibold text-zinc-50">
              five predictors carry most of the signal
            </strong>{" "}
            in the standardized ordinal model.
          </p>
        </Section>

        <CoefficientChart coefficients={coefficients} />

        <Section title="The translation">
          <p>
            The coefficients are easier to feel as ratios. To climb a single
            tier on the ladder — from Silver to Gold, say, or from Diamond to
            Master — the multivariate model says you'd need to do roughly one
            of the following:
          </p>
          <ul className="ml-0 mt-4 flex flex-col gap-3 border-l-2 border-cyan-400/40 pl-6 text-zinc-300">
            <li>
              <strong className="font-serif font-semibold text-zinc-50">
                +68 APM.
              </strong>{" "}
              Speed is the single most legible predictor. Every additional 68
              actions per minute is worth one tier of progress, which is a lot
              and not a lot — Bronze averages around 50, Master around 200.
            </li>
            <li>
              <strong className="font-serif font-semibold text-zinc-50">
                +5,000 total hours played.
              </strong>{" "}
              The grinder's tax. The model is honest about how slowly raw
              practice pays off in isolation.
            </li>
            <li>
              <strong className="font-serif font-semibold text-zinc-50">
                One worker every 2.65 seconds.
              </strong>{" "}
              Steady macro production. Watch any pro replay; this is a metronome.
            </li>
          </ul>
          <p className="mt-6">
            But the strongest single coefficient in the standardized version of
            the model isn't APM at all. It's{" "}
            <strong className="font-serif font-semibold text-zinc-50">
              ActionLatency
            </strong>{" "}
            — the time between a player's eye landing somewhere on the screen
            and their first action there. Skilled players don't just click
            faster. They commit faster. Their hands move because they've already
            decided.
          </p>
        </Section>

        <Section title="What we can't say">
          <p>
            The model is, by its own admission, a flawed instrument. LeagueIndex
            is ordinal — the gap from Bronze to Silver isn't necessarily the
            same as the gap from Diamond to Master — and a multivariate linear
            regression assumes residuals that are roughly normal. They aren't.
            The R-squared of the final model{" "}
            <strong className="font-serif font-semibold text-zinc-50">
              tops out around 0.56
            </strong>
            : about half of the variance in player rank goes unexplained by
            twenty in-game metrics combined.
          </p>
          <p>
            Half. That's the part the data can't see. Reading professional
            replays, the missing half is obvious — it's strategy, build orders,
            scouting timing, the read of an opponent's intent. None of which
            shows up in a per-timestamp average of clicks. The model knows
            speed; it doesn't know <em className="italic">why</em>.
          </p>
        </Section>

        <Section title="What it means">
          <p>
            For an aspiring player, the practical take is unromantic. Drill
            hotkey assignment until it's muscle memory. Practice committing on
            sight rather than thinking through every action. Build workers
            until you can't name a moment in the early game where you weren't
            building one. Speed will follow these things; raw clicking exercises
            won't.
          </p>
          <p>
            For everyone else, the more interesting result is the half that
            went missing. A regression on twenty player-summary stats explains
            the bottom half of the SC2 ladder reasonably well and the top half
            very poorly. Whatever distinguishes a Diamond from a Master — and
            a Master from a Grandmaster — isn't in the metrics this dataset
            collects. It's somewhere upstream, in the decisions the player
            makes before their hands even move.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Lede() {
  return (
    <p className="font-serif text-lg leading-[1.7] text-zinc-200 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:font-medium first-letter:leading-[0.85] first-letter:text-cyan-300 sm:text-xl">
      The first time I sat in an arena and watched someone play StarCraft for
      money, I came away unsure of what I'd actually seen. The hands moved too
      fast. The screen flickered with selection boxes that vanished before the
      eye could fix on them. Commentators said things like{" "}
      <em className="italic">macro is clean</em> and{" "}
      <em className="italic">that's a great PAC</em> with the offhand confidence
      of people watching a sport they understood. I did not, exactly, understand
      it. What I had was a question: what is the thing that makes these players
      better than everyone else, and can it be measured?
    </p>
  );
}

function ByTheNumbers() {
  const stats = [
    { value: "3,338", label: "ranked players" },
    { value: "20", label: "in-game metrics" },
    { value: "0.56", label: "R² of the final model" },
    { value: "5", label: "predictors that survived" },
  ];

  return (
    <aside className="my-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-start gap-1 bg-zinc-950 px-5 py-4"
        >
          <span className="font-serif text-3xl font-medium text-zinc-100 sm:text-4xl">
            {stat.value}
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-zinc-500">
            {stat.label}
          </span>
        </div>
      ))}
    </aside>
  );
}

interface SectionProps {
  readonly title: string;
  readonly children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="mt-6 font-serif text-2xl font-medium text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      <div className="flex flex-col gap-5 text-lg leading-[1.75] text-zinc-300 sm:text-[1.15rem]">
        {children}
      </div>
    </section>
  );
}

interface PullQuoteProps {
  readonly children: React.ReactNode;
}

function PullQuote({ children }: PullQuoteProps) {
  return (
    <blockquote className="my-4 border-l-2 border-cyan-400 pl-6 font-serif text-2xl italic leading-snug text-zinc-100 sm:text-3xl">
      {children}
    </blockquote>
  );
}

interface CoefficientChartProps {
  readonly coefficients: readonly Coefficient[];
}

function CoefficientChart({ coefficients }: CoefficientChartProps) {
  const max = Math.max(...coefficients.map((c) => c.effect));

  return (
    <figure className="my-2 rounded-lg border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
      <figcaption className="mb-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-cyan-400">
          Figure 1
        </p>
        <p className="mt-2 font-serif text-base text-zinc-300">
          Standardized coefficients of the five predictors that survived
          stepwise selection. Negative coefficients pull{" "}
          <em className="italic">downward</em> on rank — lower ActionLatency
          means higher LeagueIndex.
        </p>
      </figcaption>
      <ul className="flex flex-col gap-5">
        {coefficients.map((c) => {
          const widthPct = (c.effect / max) * 100;
          const isNeg = c.direction === "negative";
          return (
            <li key={c.name} className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-4 font-mono">
                <span className="text-sm text-zinc-100">{c.name}</span>
                <span
                  className={`text-xs ${
                    isNeg ? "text-rose-300" : "text-cyan-300"
                  }`}
                >
                  {isNeg ? "−" : "+"}
                  {c.effect.toFixed(3)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-sm bg-zinc-800">
                <div
                  className={`h-full ${
                    isNeg
                      ? "bg-gradient-to-r from-rose-400/80 to-rose-300"
                      : "bg-gradient-to-r from-cyan-500/70 to-cyan-300"
                  }`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              <p className="font-serif text-sm leading-snug text-zinc-500">
                {c.note}
              </p>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
