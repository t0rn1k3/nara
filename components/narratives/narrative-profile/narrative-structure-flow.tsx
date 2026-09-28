type NarrativeStructureFlowProps = {
  steps: string[];
};

export function NarrativeStructureFlow({ steps }: NarrativeStructureFlowProps) {
  if (steps.length === 0) return null;

  return (
    <div className="border border-black/15">
      {steps.map((step, index) => (
        <div key={`${index}-${step}`}>
          <p className="px-4 py-3 font-sans text-sm leading-relaxed text-black/80">
            {step}
          </p>
          {index < steps.length - 1 ? (
            <div
              className="flex justify-start border-t border-black/10 px-4 py-1.5 font-mono text-sm text-black/35"
              aria-hidden
            >
              ↓
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
