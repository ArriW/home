interface SectionHeadingProps {
  readonly children: string;
  readonly id?: string;
}

export function SectionHeading({ children, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="flex items-baseline gap-2 text-2xl font-semibold tracking-tight text-zinc-100"
    >
      <span className="font-mono text-cyan-400">#</span>
      <span>{children}</span>
    </h2>
  );
}
