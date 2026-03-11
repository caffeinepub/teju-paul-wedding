import { motion } from "motion/react";

const events = [
  {
    id: "sangeet",
    date: "Wednesday, 8 April 2026",
    time: "6:30 PM onwards",
    title: "Sangeet",
    description:
      "An evening of music, dance, and celebration as families come together to fill the night with joy and melody.",
    icon: "🎶",
    venue: "",
  },
  {
    id: "haldi",
    date: "Thursday, 9 April 2026",
    time: "6:00 PM onwards",
    title: "Haldi",
    description:
      "A vibrant, golden ceremony where loved ones anoint the couple with turmeric, blessing them with radiance and good fortune.",
    icon: "🌼",
    venue: "",
  },
  {
    id: "petal-shower",
    date: "Friday, 10 April 2026",
    time: "11:00 AM onwards",
    title: "Petal Shower",
    description:
      "A fragrant shower of blossoms raining down upon the couple, heralding the beauty of the days ahead.",
    icon: "🌸",
    venue: "",
  },
  {
    id: "mehendi",
    date: "Saturday, 11 April 2026",
    time: "11:00 AM onwards",
    title: "Mehendi",
    description:
      "Intricate henna patterns trace stories of love and tradition upon the bride's hands, each design a whispered blessing.",
    icon: "🪷",
    venue: "",
  },
  {
    id: "bale-shastra",
    date: "Saturday, 11 April 2026",
    time: "6:00 PM onwards",
    title: "Bale Shastra",
    description:
      "A cherished ritual adorning the couple with sacred bangles, binding them to the promises of a lifetime together.",
    icon: "✨",
    venue: "",
  },
  {
    id: "wedding-ceremony",
    date: "Monday, 13 April 2026",
    time: "9:15 AM",
    title: "Wedding Ceremony",
    description:
      "The sacred moment of union — as the stars align and blessings are bestowed, two hearts become one forever.",
    icon: "🕯️",
    venue: "Immaculate Conception Church",
  },
  {
    id: "dare-muhurtham",
    date: "Monday, 13 April 2026",
    time: "12:00 PM – 2:00 PM",
    title: "Dare Muhurtham",
    description:
      "An auspicious midday ceremony marking the formal solemnization of the blessed union under the watchful heavens.",
    icon: "🌞",
    venue: "",
  },
  {
    id: "reception",
    date: "Monday, 13 April 2026",
    time: "6:30 PM onwards",
    title: "Reception",
    description:
      "An enchanting evening of music, dance, and celebration as we welcome the newlyweds into their new chapter.",
    icon: "🥂",
    venue: "",
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
            The Celebrations
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
              transition={{ duration: 0.7, delay: idx * 0.1 }}
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
                  {event.date}
                </p>
                <p
                  className="font-sans text-xs tracking-widest uppercase mb-2"
                  style={{ color: "oklch(0.65 0.06 70)" }}
                >
                  {event.time}
                </p>
                <h3
                  className="font-serif text-2xl mb-2"
                  style={{ color: "oklch(0.25 0.08 15)" }}
                >
                  {event.title}
                </h3>
                {event.venue ? (
                  <p
                    className="font-sans text-xs tracking-widest uppercase mb-2 flex items-center gap-1"
                    style={{ color: "oklch(0.45 0.09 15)" }}
                  >
                    <span>⛪</span>
                    <span>{event.venue}</span>
                  </p>
                ) : null}
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
