import { useId } from "react";
import { dpBowls, dpLetters, markCircle, wordmark } from "./paths";

type SvgProps = { className?: string; title?: string };

/** "digi paradise. STUDIO" wordmark, traced from the supplied logo. Inherits currentColor. */
export function Wordmark({ className, title = "Digiparadise Studio" }: SvgProps) {
  return (
    <svg viewBox={wordmark.viewBox} className={className} role="img" aria-label={title} fill="currentColor">
      <path fillRule="evenodd" d={wordmark.d} />
    </svg>
  );
}

/** Circular dp badge with "STUDIOS" underneath. */
export function MarkCircle({ className, title = "Digiparadise" }: SvgProps) {
  return (
    <svg viewBox={markCircle.viewBox} className={className} role="img" aria-label={title} fill="currentColor">
      <path fillRule="evenodd" d={markCircle.d} />
    </svg>
  );
}

/** The dp letters with aqua-filled bowls. `letters` and `bowls` classes allow animating each part. */
export function DpMark({
  className,
  lettersClassName,
  bowlsClassName = "text-aqua",
  title = "Digiparadise",
}: SvgProps & { lettersClassName?: string; bowlsClassName?: string }) {
  return (
    <svg viewBox="0 0 628 600" className={className} role="img" aria-label={title}>
      <path className={bowlsClassName} fill="currentColor" fillRule="evenodd" d={dpBowls.d} />
      <path className={lettersClassName} fill="currentColor" fillRule="evenodd" d={dpLetters.d} />
    </svg>
  );
}

/**
 * Camera-aperture glyph echoing the dots on the logo's i's.
 * Blades are cut out with a mask, so the gaps are truly transparent on any background.
 */
export function Aperture({ className, title }: SvgProps) {
  const id = useId().replace(/:/g, "");
  // Pinwheel blades: each cut starts at a vertex of the inner hexagon and runs along
  // that hexagon edge's direction out past the rim, like a camera iris.
  // Values are rounded so server and client render identical attributes (no hydration mismatch).
  const f = (n: number) => Math.round(n * 100) / 100;
  const ri = 17;
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3 - Math.PI / 6;
    return [50 + ri * Math.cos(a), 50 + ri * Math.sin(a)] as const;
  });
  const chords = hex.map(([x, y], i) => {
    const [nx, ny] = hex[(i + 1) % 6];
    const dx = nx - x;
    const dy = ny - y;
    const len = Math.hypot(dx, dy);
    return { x1: f(x - (dx / len) * 4), y1: f(y - (dy / len) * 4), x2: f(x + (dx / len) * 70), y2: f(y + (dy / len) * 70) };
  });
  const hexPoints = hex.map(([x, y]) => `${f(x)},${f(y)}`).join(" ");
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <mask id={`ap-${id}`}>
          <circle cx="50" cy="50" r="49" fill="white" />
          <polygon points={hexPoints} fill="black" />
          {chords.map((c, i) => (
            <line key={i} {...c} stroke="black" strokeWidth="4.5" strokeLinecap="round" />
          ))}
        </mask>
      </defs>
      <circle cx="50" cy="50" r="49" fill="currentColor" mask={`url(#ap-${id})`} />
    </svg>
  );
}
