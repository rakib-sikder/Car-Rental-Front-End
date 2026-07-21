import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Find your car",
    body: "Filter by city, price, and vehicle class. Every listing shows live availability so you never chase a car that's already out.",
    icon: "🔎",
  },
  {
    n: "02",
    title: "Pick your dates",
    body: "Choose pickup and return dates. We total the cost up front — daily rate × days, no hidden fees at the counter.",
    icon: "📅",
  },
  {
    n: "03",
    title: "Confirm & drive",
    body: "Lock the slot with a confirmed booking. Manage, modify, or cancel any time from your bookings dashboard.",
    icon: "🔑",
  },
];

const HowItWorks = ({ full = false }) => (
  <section id="how-it-works" className={`bg-base-100 ${full ? "pt-28 pb-16" : "py-20"}`}>
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Three steps from search to steering wheel
        </h2>
        <p className="mt-4 text-base-content/60">
          No paperwork queues, no dealership haggling. Overdrive is built to get you on the road fast.
        </p>
      </div>

      <div className="relative mt-14 grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative rounded-2xl border border-base-300 bg-base-100 p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-2xl">
                {s.icon}
              </span>
              <span className="font-display text-4xl font-extrabold text-base-200">{s.n}</span>
            </div>
            <h3 className="font-display text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-base-content/60">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
