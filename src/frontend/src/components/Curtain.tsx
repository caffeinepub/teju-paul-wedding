import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface CurtainProps {
  onComplete: () => void;
}

// Pleat strip data: each strip has a width% and brightness factor
const PLEAT_STRIPS = [
  { w: 3, l: 0.55 }, // deep shadow
  { w: 5, l: 0.75 }, // mid
  { w: 4, l: 0.92 }, // highlight
  { w: 3, l: 0.72 }, // mid
  { w: 3, l: 0.52 }, // deep shadow
  { w: 4, l: 0.7 },
  { w: 5, l: 0.88 },
  { w: 3, l: 0.95 }, // bright highlight
  { w: 4, l: 0.78 },
  { w: 3, l: 0.55 },
  { w: 4, l: 0.68 },
  { w: 5, l: 0.82 },
  { w: 3, l: 0.9 },
  { w: 4, l: 0.7 },
  { w: 3, l: 0.52 },
  { w: 5, l: 0.75 },
  { w: 3, l: 0.88 },
  { w: 4, l: 0.6 },
  { w: 3, l: 0.78 },
  { w: 5, l: 0.55 },
];

// Build a CSS gradient string from pleat strips for one curtain side
function buildPleatGradient(side: "left" | "right"): string {
  // Base burgundy velvet: oklch(0.32 0.13 13)
  // Lighter folds: ~oklch(0.42 0.12 13)
  // Deep shadows: oklch(0.22 0.1 13)
  const stops: string[] = [];
  let pos = 0;
  const strips = side === "right" ? [...PLEAT_STRIPS].reverse() : PLEAT_STRIPS;
  const total = strips.reduce((s, p) => s + p.w, 0);

  for (const strip of strips) {
    const pct1 = (pos / total) * 100;
    const pct2 = ((pos + strip.w) / total) * 100;
    const l = 0.18 + strip.l * 0.28; // range 0.18–0.46
    const c = 0.08 + strip.l * 0.06; // range 0.08–0.14
    stops.push(`oklch(${l.toFixed(2)} ${c.toFixed(3)} 13) ${pct1.toFixed(1)}%`);
    stops.push(`oklch(${l.toFixed(2)} ${c.toFixed(3)} 13) ${pct2.toFixed(1)}%`);
    pos += strip.w;
  }

  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

// Individual tassel component
function Tassel({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="relative flex flex-col items-center"
      style={{ width: 14, ...style }}
    >
      {/* Tassel head/knot */}
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, oklch(0.82 0.1 78) 0%, oklch(0.58 0.08 72) 100%)",
          boxShadow: "0 1px 3px oklch(0.15 0.04 30 / 0.6)",
          flexShrink: 0,
        }}
      />
      {/* Tassel body strands */}
      <div className="flex gap-px mt-px">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 3,
              height: 32 + i * 4,
              borderRadius: "0 0 2px 2px",
              background:
                "linear-gradient(180deg, oklch(0.72 0.09 75) 0%, oklch(0.55 0.07 70) 60%, oklch(0.45 0.06 68) 100%)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Curtain({ onComplete }: CurtainProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGone, setIsGone] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 800);

    const goneTimer = setTimeout(() => {
      setIsGone(true);
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(goneTimer);
    };
  }, [onComplete]);

  if (isGone) return null;

  const leftGradient = buildPleatGradient("left");
  const rightGradient = buildPleatGradient("right");

  // Tassel positions spread across the bottom of each half
  const tassels = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <AnimatePresence>
      {!isGone && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {/* ── Cornice / Valance ── */}
          <div
            className="absolute top-0 left-0 right-0 z-20"
            style={{
              height: 48,
              background:
                "linear-gradient(180deg, oklch(0.52 0.1 72) 0%, oklch(0.44 0.09 70) 60%, oklch(0.38 0.08 68) 100%)",
              boxShadow:
                "0 4px 18px oklch(0.1 0.02 30 / 0.7), 0 2px 4px oklch(0.1 0.02 30 / 0.5)",
              borderBottom: "3px solid oklch(0.62 0.1 74)",
            }}
          >
            {/* Cornice decorative rope detail */}
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: 6,
                background:
                  "repeating-linear-gradient(90deg, oklch(0.65 0.1 76) 0px, oklch(0.65 0.1 76) 8px, oklch(0.5 0.08 70) 8px, oklch(0.5 0.08 70) 16px)",
                opacity: 0.7,
              }}
            />
            {/* Cornice center ornament */}
            <div
              className="absolute left-1/2 bottom-1"
              style={{
                transform: "translateX(-50%)",
                width: 40,
                height: 20,
                background:
                  "linear-gradient(180deg, oklch(0.78 0.12 80) 0%, oklch(0.58 0.09 73) 100%)",
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              }}
            />
          </div>

          {/* ── Left Curtain Panel ── */}
          <motion.div
            data-ocid="curtain.panel"
            className="absolute top-0 left-0 w-1/2 h-full"
            style={{ transformOrigin: "left center" }}
            initial={{ x: 0, scaleX: 1 }}
            animate={isOpen ? { x: "-92%", scaleX: 0.18 } : { x: 0, scaleX: 1 }}
            transition={{
              duration: 2.5,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Fabric body with pleats */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: leftGradient,
                // subtle vertical fabric texture overlay
              }}
            />
            {/* Fabric sheen overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.1 0.04 13 / 0.35) 0%, transparent 40%, oklch(0.95 0.02 80 / 0.04) 70%, oklch(0.1 0.04 13 / 0.2) 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Top gathered header with horizontal pleating lines */}
            <div
              className="absolute top-12 left-0 right-0"
              style={{
                height: 60,
                background:
                  "linear-gradient(180deg, oklch(0.22 0.09 13) 0%, transparent 100%)",
                backgroundImage:
                  "repeating-linear-gradient(180deg, transparent, transparent 6px, oklch(0.18 0.08 13 / 0.6) 6px, oklch(0.18 0.08 13 / 0.6) 7px)",
                opacity: 0.8,
              }}
            />
            {/* Gold inner-edge trim */}
            <div
              className="absolute right-0 top-0 bottom-0"
              style={{
                width: 5,
                background:
                  "linear-gradient(180deg, oklch(0.82 0.1 78) 0%, oklch(0.62 0.08 73) 30%, oklch(0.78 0.1 77) 60%, oklch(0.58 0.07 70) 100%)",
                boxShadow: "0 0 8px oklch(0.72 0.1 75 / 0.5)",
              }}
            />
            {/* Tassels at the bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-around items-end px-3"
              style={{ height: 56 }}
            >
              {tassels.map((i) => (
                <Tassel key={i} />
              ))}
            </div>
          </motion.div>

          {/* ── Right Curtain Panel ── */}
          <motion.div
            data-ocid="curtain.panel"
            className="absolute top-0 right-0 w-1/2 h-full"
            style={{ transformOrigin: "right center" }}
            initial={{ x: 0, scaleX: 1 }}
            animate={isOpen ? { x: "92%", scaleX: 0.18 } : { x: 0, scaleX: 1 }}
            transition={{
              duration: 2.5,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {/* Fabric body with pleats */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: rightGradient,
              }}
            />
            {/* Fabric sheen overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.1 0.04 13 / 0.2) 0%, oklch(0.95 0.02 80 / 0.04) 30%, transparent 60%, oklch(0.1 0.04 13 / 0.35) 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Top gathered header */}
            <div
              className="absolute top-12 left-0 right-0"
              style={{
                height: 60,
                background:
                  "linear-gradient(180deg, oklch(0.22 0.09 13) 0%, transparent 100%)",
                backgroundImage:
                  "repeating-linear-gradient(180deg, transparent, transparent 6px, oklch(0.18 0.08 13 / 0.6) 6px, oklch(0.18 0.08 13 / 0.6) 7px)",
                opacity: 0.8,
              }}
            />
            {/* Gold inner-edge trim */}
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{
                width: 5,
                background:
                  "linear-gradient(180deg, oklch(0.82 0.1 78) 0%, oklch(0.62 0.08 73) 30%, oklch(0.78 0.1 77) 60%, oklch(0.58 0.07 70) 100%)",
                boxShadow: "0 0 8px oklch(0.72 0.1 75 / 0.5)",
              }}
            />
            {/* Tassels at the bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-around items-end px-3"
              style={{ height: 56 }}
            >
              {tassels.map((i) => (
                <Tassel key={i} />
              ))}
            </div>
          </motion.div>

          {/* ── Center "An Invitation" text ── */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-center px-8">
              <p
                className="font-serif text-2xl md:text-4xl tracking-widest"
                style={{
                  color: "oklch(0.88 0.1 78)",
                  textShadow:
                    "0 2px 12px oklch(0.15 0.05 30 / 0.8), 0 0 30px oklch(0.72 0.1 75 / 0.4)",
                  letterSpacing: "0.2em",
                }}
              >
                An Invitation
              </p>
              <div className="mt-3 flex items-center justify-center gap-3">
                <div
                  className="h-px w-16"
                  style={{ background: "oklch(0.72 0.09 75 / 0.7)" }}
                />
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "oklch(0.72 0.09 75)",
                  }}
                />
                <div
                  className="h-px w-16"
                  style={{ background: "oklch(0.72 0.09 75 / 0.7)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
