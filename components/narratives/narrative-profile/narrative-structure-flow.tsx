type NarrativeStructureFlowProps = {
  steps: string[];
};

export function NarrativeStructureFlow({ steps }: NarrativeStructureFlowProps) {
  if (steps.length === 0) return null;

  return (
    <ol className="space-y-0 border border-black/15">
      {steps.map((step, index) => (
        <li key={`${index}-${step}`} className="relative px-4 py-3">
          <span className="font-mono text-[10px] tracking-wide text-black/45 uppercase">
            Step {index + 1}
          </span>
          <p className="mt-1 font-sans text-sm leading-relaxed text-black/80">
            {step}
          </p>
          {index < steps.length - 1 ? (
            <span
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-mono text-xs text-black/35"
              aria-hidden
            >
              ↓
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
