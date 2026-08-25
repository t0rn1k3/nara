import Link from "next/link";

type BrandLinkProps = {
  tagline: string;
  size?: "default" | "large";
  className?: string;
};

export function BrandLink({
  tagline,
  size = "default",
  className,
}: BrandLinkProps) {
  const isLarge = size === "large";

  return (
    <Link href="/" className={`group inline-block ${className ?? ""}`}>
      <span
        className={`block font-serif text-black ${
          isLarge
            ? "text-[2.75rem] leading-none tracking-tight"
            : "text-2xl"
        }`}
      >
        NA-RA
      </span>
      <span
        className={`block font-sans font-medium tracking-[0.16em] text-black/70 uppercase group-hover:text-black ${
          isLarge ? "mt-2 text-[13px] tracking-[0.18em]" : "mt-0.5 text-[10px]"
        }`}
      >
        {tagline}
      </span>
    </Link>
  );
}
