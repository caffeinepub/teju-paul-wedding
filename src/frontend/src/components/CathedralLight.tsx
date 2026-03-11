import { motion } from "motion/react";

const rays = [
  { left: "15%", rotate: "-15deg", delay: 0, id: "ray-1" },
  { left: "28%", rotate: "-8deg", delay: 0.3, id: "ray-2" },
  { left: "42%", rotate: "-2deg", delay: 0.1, id: "ray-3" },
  { left: "52%", rotate: "2deg", delay: 0.4, id: "ray-4" },
  { left: "63%", rotate: "8deg", delay: 0.2, id: "ray-5" },
  { left: "76%", rotate: "15deg", delay: 0.5, id: "ray-6" },
];

const windows = [
  { color: "oklch(0.6 0.12 25 / 0.5)", x: "15%", size: 60, id: "win-red" },
  { color: "oklch(0.55 0.1 200 / 0.4)", x: "35%", size: 50, id: "win-teal" },
  { color: "oklch(0.72 0.09 75 / 0.5)", x: "52%", size: 70, id: "win-gold" },
  { color: "oklch(0.5 0.1 150 / 0.4)", x: "70%", size: 55, id: "win-green" },
  { color: "oklch(0.65 0.12 280 / 0.4)", x: "85%", size: 45, id: "win-purple" },
];

const rosetteAngles = [0, 45, 90, 135];

export function CathedralLight() {
  return (
    <section
      className="relative py-28 px-4 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.12 0.015 45) 0%, oklch(0.17 0.02 35) 50%, oklch(0.12 0.015 45) 100%)",
      }}
    >
      {/* Stained glass circles at top */}
      <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none">
        {windows.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.2 }}
            className="rounded-full"
            style={{
              width: w.size,
              height: w.size,
              background: w.color,
              boxShadow: `0 0 40px ${w.color}, 0 0 80px ${w.color}`,
              filter: "blur(2px)",
              marginTop: i % 2 === 0 ? -w.size / 2 : -w.size / 3,
            }}
          />
        ))}
      </div>

      {/* Light rays */}
      {rays.map((ray) => (
        <motion.div
          key={ray.id}
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: ray.delay, ease: "easeOut" }}
          className="absolute top-0 light-ray pointer-events-none"
          style={{
            left: ray.left,
            width: "3px",
            height: "100%",
            transform: `rotate(${ray.rotate})`,
            transformOrigin: "top center",
            background:
              "linear-gradient(to bottom, oklch(0.72 0.09 75 / 0.4) 0%, oklch(0.72 0.09 75 / 0.08) 50%, transparent 100%)",
            filter: "blur(3px)",
          }}
        />
      ))}

      {/* Wider soft rays */}
      {rays.slice(0, 3).map((ray) => (
        <motion.div
          key={`wide-${ray.id}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, delay: ray.delay + 0.5 }}
          className="absolute top-0 pointer-events-none"
          style={{
            left: ray.left,
            width: "80px",
            height: "70%",
            transform: `rotate(${ray.rotate}) translateX(-50%)`,
            transformOrigin: "top center",
            background:
              "linear-gradient(to bottom, oklch(0.72 0.09 75 / 0.08) 0%, transparent 100%)",
            filter: "blur(15px)",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Rosette window SVG */}
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="mx-auto mb-10"
          style={{ width: 120, height: 120 }}
        >
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full"
            aria-hidden="true"
            role="presentation"
          >
            {rosetteAngles.map((angle, i) => (
              <ellipse
                key={angle}
                cx="60"
                cy="60"
                rx="25"
                ry="12"
                fill="none"
                stroke={`oklch(0.72 0.09 75 / ${0.3 + i * 0.1})`}
                strokeWidth="1"
                transform={`rotate(${angle} 60 60)`}
              />
            ))}
            <circle
              cx="60"
              cy="60"
              r="30"
              fill="none"
              stroke="oklch(0.72 0.07 75 / 0.4)"
              strokeWidth="1"
            />
            <circle cx="60" cy="60" r="8" fill="oklch(0.72 0.09 75 / 0.4)" />
            <circle cx="60" cy="60" r="4" fill="oklch(0.72 0.09 75 / 0.8)" />
          </svg>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p
            className="font-serif italic leading-relaxed"
            style={{
              fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
              color: "oklch(0.92 0.02 85)",
            }}
          >
            &ldquo;Love is patient, love is kind.
            <br />
            It does not envy, it does not boast.
            <br />
            It always protects, always trusts,
            <br />
            always hopes, always perseveres.&rdquo;
          </p>
          <footer className="mt-6">
            <cite
              className="font-sans text-sm tracking-widest not-italic"
              style={{ color: "oklch(0.65 0.07 75)" }}
            >
              — 1 Corinthians 13:4,7
            </cite>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
