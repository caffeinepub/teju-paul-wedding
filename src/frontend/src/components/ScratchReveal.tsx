import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const [revealPercent, setRevealPercent] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.fillStyle = "#8a7a6a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 80; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(${Math.random() > 0.5 ? "120,105,85" : "160,140,110"}, 0.4)`;
      ctx.lineWidth = Math.random() * 2 + 0.5;
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(50,40,30,0.5)";
    ctx.font = "bold 14px 'Lato', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "✦  Scratch to reveal  ✦",
      canvas.width / 2,
      canvas.height / 2,
    );
  }, []);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function scratch(x: number, y: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] < 128) cleared++;
    }
    const total = canvas.width * canvas.height;
    const pct = Math.round((cleared / total) * 100);
    setRevealPercent(pct);
    if (pct > 60) setIsFullyRevealed(true);
  }

  function onMouseDown(e: React.MouseEvent) {
    isDrawingRef.current = true;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDrawingRef.current) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }

  function onTouchStart(e: React.TouchEvent) {
    e.preventDefault();
    isDrawingRef.current = true;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }

  function onTouchMove(e: React.TouchEvent) {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    const pos = getPos(e);
    scratch(pos.x, pos.y);
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 px-4"
      style={{ background: "oklch(0.14 0.015 45)" }}
    >
      <div className="max-w-lg mx-auto text-center">
        <p
          className="font-sans text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "oklch(0.72 0.07 75)" }}
        >
          A Special Reveal
        </p>
        <h2
          className="font-serif text-3xl md:text-4xl mb-8"
          style={{ color: "oklch(0.95 0.01 85)" }}
        >
          Discover Our Day
        </h2>

        <div
          className="relative mx-auto rounded-lg overflow-hidden ornate-border"
          style={{ width: "100%", maxWidth: 400, aspectRatio: "2/1" }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.18 0.03 40) 0%, oklch(0.22 0.04 35) 100%)",
            }}
          >
            <p
              className="font-sans text-xs tracking-[0.3em] uppercase mb-2"
              style={{ color: "oklch(0.65 0.07 75)" }}
            >
              Our Wedding Day
            </p>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(2rem, 6vw, 3.5rem)",
                letterSpacing: "0.08em",
                color: "#ffffff",
              }}
            >
              13 · 04 · 2026
            </p>
            <p
              className="font-serif italic mt-2 text-sm"
              style={{ color: "oklch(0.85 0.02 80)" }}
            >
              9:15 AM · Wedding Ceremony
            </p>
          </div>

          {!isFullyRevealed && (
            <canvas
              ref={canvasRef}
              data-ocid="scratch.canvas_target"
              className="absolute inset-0 w-full h-full scratch-canvas touch-none"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={() => {
                isDrawingRef.current = false;
              }}
              onMouseLeave={() => {
                isDrawingRef.current = false;
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={() => {
                isDrawingRef.current = false;
              }}
            />
          )}
        </div>

        {!isFullyRevealed && revealPercent < 60 && (
          <p
            className="mt-4 font-sans text-sm"
            style={{ color: "oklch(0.65 0.05 70)" }}
          >
            {revealPercent}% revealed — keep scratching!
          </p>
        )}
        {isFullyRevealed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 font-serif italic text-lg"
            style={{ color: "oklch(0.72 0.09 75)" }}
          >
            ✦ The day is set! We await your presence. ✦
          </motion.p>
        )}
      </div>
    </motion.section>
  );
}
