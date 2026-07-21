import { motion } from "framer-motion";

const perks = [
  { icon: "💸", title: "Transparent pricing", desc: "Daily rate × days, totalled before you book. No counter surprises, no junk fees." },
  { icon: "⚡", title: "Instant confirmation", desc: "Availability is checked server-side, so the slot you book is really yours." },
  { icon: "🛡️", title: "Inspected & insured", desc: "Every car is safety-checked between rentals and covered while you drive." },
  { icon: "🔁", title: "Free cancellation", desc: "Plans change. Modify dates or cancel from your dashboard, no penalty." },
  { icon: "🌱", title: "Greener options", desc: "A growing line-up of hybrids and EVs for low-emission trips." },
  { icon: "📞", title: "24/7 roadside help", desc: "Flat tyre at midnight? Real humans are one call away, any hour." },
];

const WhyChooseUs = () => (
  <section className="bg-base-200 py-20">
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Why Overdrive</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Built to make renting effortless
        </h2>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {perks.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="rounded-2xl border border-base-300 bg-base-100 p-6"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-2xl">
              {p.icon}
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-base-content/60">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
