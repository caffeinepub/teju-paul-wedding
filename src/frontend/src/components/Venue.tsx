import { ExternalLink, MapPin } from "lucide-react";
import { motion } from "motion/react";

const VENUES = [
  {
    label: "Venue 1",
    name: "Chaitrashree Royal Banquet",
    subtitle: "Meridian By The Lawns – Luxury Weddings & Events Venue",
    dates: "8.04.26 – 11.04.26",
    address:
      "Kaggalipura Rd, near Big Barn Farm, Bannerughatta, Bilwaradahalli, Bengaluru, Karnataka 560083",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Chaitrashree+Royal+Banquet+Meridian+By+The+Lawns+Kaggalipura+Rd+Bannerughatta+Bengaluru+560083",
    pinLabel: "Chaitrashree Royal Banquet",
  },
  {
    label: "Venue 2",
    name: "Immaculate Conception Church",
    subtitle: "",
    dates: "13.04.26",
    address:
      "VHXX+XFW, Sando Nivas, Behind Apollo Hospital, Dorasany Palya, Behind Amalodbhava Nagar Road, Krishnaraju Layout, Amalodbhavi Nagar, Panduranga Nagar, Bengaluru, Karnataka 560076",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Immaculate+Conception+Church+Panduranga+Nagar+Bengaluru+560076",
    pinLabel: "Immaculate Conception Church",
  },
];

const gridXs = [50, 100, 150, 200, 250, 300, 350];
const gridYs = [40, 80, 120, 160, 200, 240];

function VenueCard({
  venue,
  index,
}: { venue: (typeof VENUES)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="rounded-2xl overflow-hidden"
      style={{
        border: "1px solid oklch(0.72 0.05 75 / 0.4)",
        boxShadow: "0 20px 60px oklch(0.33 0.08 15 / 0.1)",
      }}
    >
      {/* Illustrated map placeholder */}
      <div
        data-ocid={`venue.map_marker.${index + 1}`}
        className="relative h-48 md:h-60 flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.88 0.03 75 / 0.4) 0%, transparent 60%), linear-gradient(135deg, oklch(0.88 0.025 80) 0%, oklch(0.92 0.015 85) 100%)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 400 280"
          preserveAspectRatio="none"
          aria-hidden="true"
          role="presentation"
        >
          {gridXs.map((x) => (
            <line
              key={`v${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="280"
              stroke="oklch(0.55 0.06 70)"
              strokeWidth="0.5"
            />
          ))}
          {gridYs.map((y) => (
            <line
              key={`h${y}`}
              x1="0"
              y1={y}
              x2="400"
              y2={y}
              stroke="oklch(0.55 0.06 70)"
              strokeWidth="0.5"
            />
          ))}
          <line
            x1="0"
            y1="140"
            x2="400"
            y2="140"
            stroke="oklch(0.65 0.04 70)"
            strokeWidth="4"
          />
          <line
            x1="200"
            y1="0"
            x2="200"
            y2="280"
            stroke="oklch(0.65 0.04 70)"
            strokeWidth="3"
          />
          <line
            x1="0"
            y1="80"
            x2="400"
            y2="120"
            stroke="oklch(0.65 0.04 70)"
            strokeWidth="2"
          />
          <rect
            x="165"
            y="108"
            width="70"
            height="64"
            fill="oklch(0.72 0.08 75 / 0.5)"
            rx="4"
          />
          <rect
            x="173"
            y="116"
            width="54"
            height="48"
            fill="oklch(0.55 0.07 70 / 0.3)"
            rx="2"
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: "oklch(0.33 0.12 15)",
              boxShadow:
                "0 0 0 4px oklch(0.72 0.08 75 / 0.3), 0 8px 24px oklch(0.33 0.12 15 / 0.4)",
            }}
          >
            <MapPin
              className="w-5 h-5"
              style={{ color: "oklch(0.72 0.09 75)" }}
            />
          </div>
          <div
            className="mt-3 px-4 py-2 rounded-full text-sm font-sans font-medium text-center max-w-[200px]"
            style={{
              background: "oklch(0.33 0.12 15)",
              color: "oklch(0.92 0.01 85)",
              boxShadow: "0 4px 16px oklch(0.33 0.12 15 / 0.3)",
            }}
          >
            {venue.pinLabel}
          </div>
        </div>
      </div>

      {/* Venue details */}
      <div
        className="p-6 md:p-8"
        style={{ background: "oklch(0.99 0.005 85)" }}
      >
        <p
          className="font-sans text-xs tracking-[0.25em] uppercase mb-1"
          style={{ color: "oklch(0.55 0.07 70)" }}
        >
          {venue.label}
        </p>
        <h3
          className="font-serif text-xl md:text-2xl"
          style={{ color: "oklch(0.22 0.08 15)" }}
        >
          {venue.name}
        </h3>
        {venue.subtitle && (
          <p
            className="font-sans text-xs mt-0.5"
            style={{ color: "oklch(0.5 0.05 60)" }}
          >
            {venue.subtitle}
          </p>
        )}
        {/* Dates */}
        <div className="mt-3 flex items-center gap-2">
          <span
            className="font-sans text-sm font-semibold tracking-wide px-3 py-1 rounded-full"
            style={{
              background: "oklch(0.72 0.08 75 / 0.15)",
              color: "oklch(0.33 0.12 15)",
              border: "1px solid oklch(0.72 0.08 75 / 0.4)",
            }}
          >
            {venue.dates}
          </span>
        </div>
        <div className="mt-4">
          <div className="flex items-start gap-3">
            <MapPin
              className="w-4 h-4 mt-1 flex-shrink-0"
              style={{ color: "oklch(0.55 0.07 70)" }}
            />
            <p
              className="font-sans text-sm"
              style={{ color: "oklch(0.4 0.03 50)" }}
            >
              {venue.address}
            </p>
          </div>
        </div>

        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-ocid={`venue.link.${index + 1}`}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-sans text-sm tracking-wide transition-all duration-300 hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.33 0.12 15) 0%, oklch(0.4 0.1 12) 100%)",
            color: "oklch(0.92 0.01 85)",
            border: "1px solid oklch(0.72 0.07 75 / 0.4)",
            boxShadow: "0 4px 20px oklch(0.33 0.1 15 / 0.3)",
          }}
        >
          <ExternalLink className="w-4 h-4" />
          Get Directions
        </a>
      </div>
    </motion.div>
  );
}

export function Venue() {
  return (
    <motion.section
      data-ocid="venue.section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 px-4"
      style={{ background: "oklch(0.97 0.01 85)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "oklch(0.55 0.07 70)" }}
          >
            The Sacred Venues
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl"
            style={{ color: "oklch(0.25 0.08 15)" }}
          >
            Where We Gather
          </h2>
          <div
            className="mt-3 mx-auto w-24 h-px"
            style={{ background: "oklch(0.72 0.08 75)" }}
          />
        </div>

        <div className="space-y-8">
          {VENUES.map((venue, i) => (
            <VenueCard key={venue.name} venue={venue} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
