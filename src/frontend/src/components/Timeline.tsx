import { motion } from "motion/react";

const events = [
  {
    id: "muhurtham",
    time: "10:00 AM",
    title: "Muhurtham",
    description:
      "The sacred moment of union — as the stars align and blessings are bestowed, two hearts become one.",
    icon: "🕯️",
  },
  {
    id: "breakfast",
    time: "12:30 PM",
    title: "Wedding Breakfast",
    description:
      "Join us at the feast table for a sumptuous celebration lunch, savoring the flavours of joy and togetherness.",
    icon: "🌸",
  },
  {
    id: "reception",
    time: "7:00 PM",
    title: "Grand Reception",
    description:
      "An enchanting evening of music, dance, and celebration as we welcome the newlyweds into their new chapter.",
    icon: "✨",
  },
];

export function Timeline() {
  return (
    <motion.section
      data-ocid="timeline.section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 px-4"
      style={{ background: "oklch(0.97 0.01 85)" }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="font-sans text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "oklch(0.55 0.07 70)" }}
          >
            The Day&apos;s Journey
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl"
            style={{ color: "oklch(0.25 0.08 15)" }}
          >
            Celebrations
          </h2>
          <div
            className="mt-3 mx-auto w-24 h-px"
            style={{ background: "oklch(0.72 0.08 75)" }}
          />
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, oklch(0.72 0.07 75), transparent)",
            }}
          />

          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className={`relative flex items-start gap-6 mb-12 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Icon node */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 relative"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.33 0.12 15) 0%, oklch(0.45 0.1 12) 100%)",
                  border: "2px solid oklch(0.72 0.07 75)",
                  boxShadow: "0 0 20px oklch(0.72 0.06 75 / 0.3)",
                }}
              >
                {event.icon}
              </div>

              {/* Content */}
              <div
                className={`flex-1 p-5 rounded-lg ${
                  idx % 2 === 0
                    ? "md:text-right md:mr-8"
                    : "md:text-left md:ml-8"
                }`}
                style={{
                  background: "oklch(0.99 0.005 85)",
                  border: "1px solid oklch(0.72 0.05 75 / 0.3)",
                  boxShadow: "0 4px 20px oklch(0.33 0.08 15 / 0.08)",
                }}
              >
                <p
                  className="font-sans text-xs tracking-widest uppercase mb-1"
                  style={{ color: "oklch(0.55 0.07 70)" }}
                >
                  {event.time}
                </p>
                <h3
                  className="font-serif text-2xl mb-2"
                  style={{ color: "oklch(0.25 0.08 15)" }}
                >
                  {event.title}
                </h3>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "oklch(0.4 0.03 50)" }}
                >
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
