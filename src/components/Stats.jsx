import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "Cars in the fleet" },
  { value: "4", label: "Pickup cities" },
  { value: "76", label: "Trips completed" },
  { value: "4.9★", label: "Average rating" },
];

const Stats = () => (
  <section className="border-y border-base-300 bg-base-100">
    <div className="container-x grid grid-cols-2 gap-6 py-12 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="text-center"
        >
          <p className="font-display text-4xl font-extrabold text-primary sm:text-5xl">{s.value}</p>
          <p className="mt-1 text-sm text-base-content/60">{s.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Stats;
