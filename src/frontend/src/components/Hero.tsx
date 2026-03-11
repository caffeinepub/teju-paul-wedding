import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      decay: number;
    }

    const particles: Particle[] = [];

    function spawnParticle() {
      if (!canvas) return;
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.7 + Math.random() * canvas.height * 0.3,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        decay: Math.random() * 0.005 + 0.002,
      });
    }

    let animFrame: number;
    const spawnInterval = setInterval(spawnParticle, 200);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y -= p.speed;
        p.opacity -= p.decay;
        p.x += Math.sin(p.y * 0.02) * 0.5;

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(201, 168, 76, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      clearInterval(spawnInterval);
    };
  }, []);

  return (
    <section
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, oklch(0.22 0.06 15 / 0.6) 0%, transparent 60%),
          radial-gradient(ellipse at 20% 80%, oklch(0.72 0.05 75 / 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, oklch(0.72 0.05 75 / 0.1) 0%, transparent 50%),
          linear-gradient(180deg, oklch(0.12 0.01 50) 0%, oklch(0.16 0.015 45) 100%)
        `,
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('/assets/generated/wedding-hero-bg.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Cathedral arch frame */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
        <div
          className="w-full max-w-2xl mx-auto"
          style={{
            height: "100%",
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.72 0.06 75 / 0.08) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Arch border overlay */}
      <div className="absolute inset-x-4 md:inset-x-16 top-8 bottom-0 pointer-events-none">
        <svg
          viewBox="0 0 400 600"
          className="w-full h-full"
          preserveAspectRatio="none"
          aria-hidden="true"
          role="presentation"
        >
          <path
            d="M 20 600 L 20 180 Q 20 20 200 20 Q 380 20 380 180 L 380 600"
            fill="none"
            stroke="oklch(0.72 0.07 75 / 0.5)"
            strokeWidth="1"
          />
          <path
            d="M 35 600 L 35 185 Q 35 40 200 40 Q 365 40 365 185 L 365 600"
            fill="none"
            stroke="oklch(0.72 0.05 75 / 0.25)"
            strokeWidth="0.5"
          />
          <circle cx="20" cy="190" r="4" fill="oklch(0.72 0.09 75 / 0.6)" />
          <circle cx="380" cy="190" r="4" fill="oklch(0.72 0.09 75 / 0.6)" />
          <circle cx="20" cy="200" r="2" fill="oklch(0.72 0.09 75 / 0.4)" />
          <circle cx="380" cy="200" r="2" fill="oklch(0.72 0.09 75 / 0.4)" />
        </svg>
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center mx-auto">
            <div
              className="rounded-full overflow-hidden border-2"
              style={{
                borderColor: "oklch(0.72 0.09 75 / 0.6)",
                boxShadow: "0 0 24px oklch(0.72 0.09 75 / 0.3)",
              }}
            >
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-11-at-10.18.13-AM-1.jpeg"
                alt="T & P monogram logo"
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full"
                style={{
                  filter: "drop-shadow(0 0 16px oklch(0.72 0.09 75 / 0.4))",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif font-light tracking-widest"
          style={{
            color: "oklch(0.98 0.01 85)",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            lineHeight: 1.2,
          }}
        >
          J. Teju Catharine
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="my-4 flex items-center justify-center gap-4"
        >
          <div
            className="h-px w-16"
            style={{ background: "oklch(0.72 0.07 75 / 0.6)" }}
          />
          <span
            className="font-serif italic"
            style={{ color: "oklch(0.72 0.09 75)", fontSize: "1.5rem" }}
          >
            &amp;
          </span>
          <div
            className="h-px w-16"
            style={{ background: "oklch(0.72 0.07 75 / 0.6)" }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif font-light tracking-widest"
          style={{
            color: "oklch(0.98 0.01 85)",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            lineHeight: 1.2,
          }}
        >
          Paul Benjamin Francis
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 font-sans tracking-[0.4em] uppercase text-sm"
          style={{ color: "#ffffff" }}
        >
          13 · April · 2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.4 }}
          className="mt-4 font-serif italic text-lg md:text-xl"
          style={{ color: "oklch(0.85 0.02 80)" }}
        >
          Two souls, one eternal bond
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span
            className="font-sans text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.72 0.07 75 / 0.7)" }}
          >
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{ color: "oklch(0.72 0.09 75 / 0.7)" }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
