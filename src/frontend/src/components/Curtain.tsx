import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface CurtainProps {
  onComplete: () => void;
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

  return (
    <AnimatePresence>
      {!isGone && (
        <div className="fixed inset-0 z-50 flex pointer-events-none">
          {/* Left Curtain */}
          <motion.div
            data-ocid="curtain.panel"
            className="w-1/2 h-full curtain-texture relative overflow-hidden"
            initial={{ x: 0 }}
            animate={isOpen ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Curtain fold highlights */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 20px, oklch(0.38 0.12 13 / 0.4) 20px, oklch(0.38 0.12 13 / 0.4) 21px, transparent 21px, transparent 40px)",
              }}
            />
            {/* Gold trim edge */}
            <div
              className="absolute right-0 top-0 bottom-0 w-4"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.72 0.09 75) 0%, oklch(0.6 0.07 70) 50%, oklch(0.72 0.09 75) 100%)",
              }}
            />
            {/* Tassels at bottom */}
            <div className="absolute bottom-0 right-0 w-full h-16 flex justify-end gap-3 pr-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-2 h-16 rounded-b-full"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.72 0.09 75) 0%, oklch(0.6 0.07 70) 100%)",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Curtain */}
          <motion.div
            data-ocid="curtain.panel"
            className="w-1/2 h-full curtain-texture relative overflow-hidden"
            initial={{ x: 0 }}
            animate={isOpen ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Curtain fold highlights */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 20px, oklch(0.38 0.12 13 / 0.4) 20px, oklch(0.38 0.12 13 / 0.4) 21px, transparent 21px, transparent 40px)",
              }}
            />
            {/* Gold trim edge */}
            <div
              className="absolute left-0 top-0 bottom-0 w-4"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.72 0.09 75) 0%, oklch(0.6 0.07 70) 50%, oklch(0.72 0.09 75) 100%)",
              }}
            />
            {/* Tassels at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-16 flex gap-3 pl-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-2 h-16 rounded-b-full"
                  style={{
                    background:
                      "linear-gradient(180deg, oklch(0.72 0.09 75) 0%, oklch(0.6 0.07 70) 100%)",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Center text before opening */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center z-10">
              <p
                className="font-serif text-2xl md:text-4xl gold-text"
                style={{ color: "oklch(0.85 0.09 75)" }}
              >
                An Invitation
              </p>
              <div className="mt-2 flex justify-center">
                <div
                  className="h-px w-24"
                  style={{ background: "oklch(0.72 0.09 75)" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
