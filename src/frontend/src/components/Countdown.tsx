import { motion } from "motion/react";
import { useEffect, useState } from "react";

function getTimeLeft() {
  // March 28, 2026 10:00 AM IST = UTC+5:30
  const target = new Date("2026-03-28T04:30:00Z"); // 10:00 AM IST
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

interface FlipUnitProps {
  value: number;
  label: string;
}

function FlipUnit({ value, label }: FlipUnitProps) {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const t = setTimeout(() => {
        setIsFlipping(false);
        setPrevValue(value);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [value, prevValue]);

  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          width: "clamp(64px, 14vw, 100px)",
          height: "clamp(64px, 14vw, 100px)",
          background:
            "linear-gradient(135deg, oklch(0.18 0.03 40) 0%, oklch(0.22 0.04 35) 100%)",
          border: "1px solid oklch(0.72 0.07 75 / 0.4)",
          boxShadow:
            "0 0 20px oklch(0.72 0.06 75 / 0.15), inset 0 1px 0 oklch(0.72 0.09 75 / 0.2)",
        }}
      >
        {/* Center divider line */}
        <div
          className="absolute inset-x-0 top-1/2 h-px z-10"
          style={{ background: "oklch(0.72 0.06 75 / 0.3)" }}
        />
        <motion.div
          key={value}
          initial={
            isFlipping
              ? { rotateX: -90, opacity: 0 }
              : { rotateX: 0, opacity: 1 }
          }
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className="font-serif font-light"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            {display}
          </span>
        </motion.div>
      </div>
      <p
        className="mt-2 font-sans text-xs tracking-widest uppercase"
        style={{ color: "oklch(0.65 0.05 70)" }}
      >
        {label}
      </p>
    </div>
  );
}

export function Countdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      data-ocid="countdown.section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 px-4"
      style={{
        background: `
          radial-gradient(ellipse at 50% 50%, oklch(0.2 0.04 15 / 0.4) 0%, transparent 70%),
          linear-gradient(180deg, oklch(0.12 0.01 50) 0%, oklch(0.16 0.015 45) 100%)
        `,
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="font-sans text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "oklch(0.72 0.07 75)" }}
        >
          Counting Down
        </p>
        <h2
          className="font-serif text-3xl md:text-4xl mb-2"
          style={{ color: "oklch(0.95 0.01 85)" }}
        >
          Until We Say "I Do"
        </h2>
        <p className="font-serif italic mb-10" style={{ color: "#ffffff" }}>
          28 March 2026 · 10:00 AM IST
        </p>

        <div className="flex items-start justify-center gap-4 md:gap-8">
          <FlipUnit value={time.days} label="Days" />
          <span
            className="font-serif text-2xl md:text-4xl mt-4"
            style={{ color: "oklch(0.72 0.09 75)" }}
          >
            :
          </span>
          <FlipUnit value={time.hours} label="Hours" />
          <span
            className="font-serif text-2xl md:text-4xl mt-4"
            style={{ color: "oklch(0.72 0.09 75)" }}
          >
            :
          </span>
          <FlipUnit value={time.minutes} label="Minutes" />
          <span
            className="font-serif text-2xl md:text-4xl mt-4"
            style={{ color: "oklch(0.72 0.09 75)" }}
          >
            :
          </span>
          <FlipUnit value={time.seconds} label="Seconds" />
        </div>

        <p
          className="mt-10 font-serif italic text-lg"
          style={{ color: "oklch(0.72 0.09 75 / 0.7)" }}
        >
          ✦ Every moment brings us closer ✦
        </p>
      </div>
    </motion.section>
  );
}
