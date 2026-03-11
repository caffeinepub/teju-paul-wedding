import { Check, Link2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";

export function ShareSection() {
  const [copied, setCopied] = useState(false);

  function shareWhatsApp() {
    const invitation =
      "You're invited! \uD83D\uDD4A\uFE0F J. Teju Catharine & Paul Benjamin Francis are getting married on 28 March 2026 at The Grand Cathedral, Chennai. Join the celebration! ";
    const msg = encodeURIComponent(`${invitation}${window.location.href}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  }

  return (
    <motion.section
      data-ocid="share.section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 px-4"
      style={{ background: "oklch(0.97 0.01 85)" }}
    >
      <div className="max-w-lg mx-auto text-center">
        <p
          className="font-sans text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "oklch(0.55 0.07 70)" }}
        >
          Spread the Joy
        </p>
        <h2
          className="font-serif text-4xl md:text-5xl mb-3"
          style={{ color: "oklch(0.25 0.08 15)" }}
        >
          Share the Love
        </h2>
        <p
          className="font-serif italic mb-10"
          style={{ color: "oklch(0.5 0.04 50)" }}
        >
          Invite your loved ones to witness this beautiful union
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={shareWhatsApp}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-sans text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color: "white",
              boxShadow: "0 8px 24px rgba(37, 211, 102, 0.3)",
            }}
          >
            <SiWhatsapp className="w-5 h-5" />
            Share on WhatsApp
          </button>

          <motion.button
            type="button"
            onClick={copyLink}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-sans text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "oklch(0.99 0.005 85)",
              color: "oklch(0.25 0.08 15)",
              border: "1px solid oklch(0.72 0.06 75 / 0.5)",
              boxShadow: "0 4px 20px oklch(0.33 0.08 15 / 0.1)",
            }}
            animate={copied ? { scale: [1, 1.05, 1] } : {}}
          >
            {copied ? (
              <>
                <Check
                  className="w-5 h-5"
                  style={{ color: "oklch(0.55 0.1 145)" }}
                />{" "}
                Link Copied!
              </>
            ) : (
              <>
                <Link2
                  className="w-5 h-5"
                  style={{ color: "oklch(0.55 0.07 70)" }}
                />{" "}
                Copy Invitation Link
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
