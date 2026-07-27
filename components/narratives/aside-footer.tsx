"use client";

type AsideFooterProps = {
  onExplore: () => void;
};

export function AsideFooter({ onExplore }: AsideFooterProps) {
  return (
    <footer className="shrink-0 border-t border-nara-grey-300/20 px-6 py-5">
      <button
        type="button"
        onClick={onExplore}
        className="h-10 w-full border border-nara-navy/35 bg-transparent font-sans text-xs font-medium tracking-[0.12em] text-nara-navy uppercase transition-colors duration-300 hover:bg-nara-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nara-navy/30"
      >
        Explore Narratives
      </button>
    </footer>
  );
}
