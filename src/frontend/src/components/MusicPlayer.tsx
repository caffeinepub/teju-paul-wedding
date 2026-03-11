import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const MUSIC_SRC =
  "/assets/Christina_Perri_-_A_Thousand_years_instrumental_version_(mp3.pm).mp3";

const BAR_HEIGHTS: [string, number][] = [
  ["bar-a", 0.6],
  ["bar-b", 1],
  ["bar-c", 0.75],
  ["bar-d", 0.9],
  ["bar-e", 0.5],
];

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showHint, setShowHint] = useState(true);

  // Autoplay when component mounts
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        setShowHint(false);
      })
      .catch(() => {
        // Browser blocked autoplay — user must interact first
        setPlaying(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
      setShowHint(false);
    }
  }

  return (
    <>
      {/* biome-ignore lint/a11y/useMediaCaption: background instrumental music, no dialogue to caption */}
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      {/* Hint tooltip */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="fixed bottom-[88px] right-5 z-50 px-3 py-2 rounded-lg text-xs font-sans whitespace-nowrap"
            style={{
              background: "oklch(0.22 0.04 35)",
              color: "oklch(0.88 0.02 80)",
              border: "1px solid oklch(0.72 0.07 75 / 0.3)",
              boxShadow: "0 4px 16px oklch(0.1 0.01 30 / 0.4)",
            }}
          >
            ♦ Play wedding music
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        data-ocid="music.toggle"
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.08 }}
        className="fixed bottom-6 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.33 0.12 15) 0%, oklch(0.28 0.1 20) 100%)",
          border: "1px solid oklch(0.72 0.07 75 / 0.5)",
          boxShadow: playing
            ? "0 0 0 3px oklch(0.72 0.09 75 / 0.3), 0 8px 24px oklch(0.1 0.01 30 / 0.5)"
            : "0 4px 20px oklch(0.1 0.01 30 / 0.4)",
        }}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <div className="flex items-end gap-[3px] h-5">
            {BAR_HEIGHTS.map(([id, h], idx) => (
              <motion.div
                key={id}
                className="w-[3px] rounded-full"
                style={{
                  background: "oklch(0.72 0.09 75)",
                  originY: 1,
                  height: 20,
                }}
                animate={{ scaleY: [h, 1, h * 0.7, 1, h] }}
                transition={{
                  duration: 0.9,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: idx * 0.12,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            role="img"
            aria-label="Music note"
          >
            <title>Music note</title>
            <path
              d="M9 18V5l12-2v13"
              stroke="oklch(0.72 0.09 75)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="6"
              cy="18"
              r="3"
              stroke="oklch(0.72 0.09 75)"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="16"
              r="3"
              stroke="oklch(0.72 0.09 75)"
              strokeWidth="2"
            />
          </svg>
        )}
      </motion.button>
    </>
  );
}
