export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`;

  return (
    <footer
      className="py-14 px-4 text-center"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.12 0.015 45) 0%, oklch(0.1 0.01 40) 100%)",
        borderTop: "1px solid oklch(0.72 0.06 75 / 0.2)",
      }}
    >
      {/* Monogram */}
      <div className="mb-6">
        <span
          className="font-serif text-3xl gold-text"
          style={{ letterSpacing: "0.2em" }}
        >
          T &amp; P
        </span>
      </div>

      {/* Main footer line */}
      <p
        className="font-serif italic text-lg mb-2"
        style={{ color: "oklch(0.75 0.03 70)" }}
      >
        With love, Teju &amp; Paul · 28.03.2026
      </p>

      <p className="font-sans text-xs" style={{ color: "oklch(0.5 0.03 50)" }}>
        © {year}.{" "}
        <a
          href={caffeineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition-all"
          style={{ color: "oklch(0.65 0.06 70)" }}
        >
          Built with ♥ using caffeine.ai
        </a>
      </p>
    </footer>
  );
}
