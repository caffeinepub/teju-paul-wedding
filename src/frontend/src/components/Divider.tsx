export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.72 0.07 75))",
        }}
      />
      <span
        className="font-serif text-2xl"
        style={{ color: "oklch(0.72 0.09 75)" }}
      >
        ❧
      </span>
      <span
        className="font-serif text-lg"
        style={{ color: "oklch(0.72 0.09 75)" }}
      >
        ✦
      </span>
      <span
        className="font-serif text-2xl"
        style={{ color: "oklch(0.72 0.09 75)" }}
      >
        ❧
      </span>
      <div
        className="h-px flex-1"
        style={{
          background:
            "linear-gradient(to left, transparent, oklch(0.72 0.07 75))",
        }}
      />
    </div>
  );
}

export function FleuronDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <div
        className="h-px flex-1"
        style={{ background: "oklch(0.72 0.06 75 / 0.4)" }}
      />
      <span
        className="font-serif"
        style={{ color: "oklch(0.72 0.09 75)", fontSize: "1.5rem" }}
      >
        ⁂
      </span>
      <div
        className="h-px flex-1"
        style={{ background: "oklch(0.72 0.06 75 / 0.4)" }}
      />
    </div>
  );
}
