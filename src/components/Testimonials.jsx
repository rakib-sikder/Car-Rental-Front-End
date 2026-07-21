import { motion } from "framer-motion";

const reviews = [
  {
    name: "Priya Nair",
    role: "Weekend traveller · Dhaka",
    quote:
      "Booked a CR-V for a family trip to Sylhet in about two minutes. The total was exactly what the app said at pickup — no surprise charges.",
    avatar: "P",
  },
  {
    name: "Marcus Webb",
    role: "Business rental · Chittagong",
    quote:
      "I rent a sedan most weeks. The confirmed-slot thing actually works — I've never turned up to find my car already gone.",
    avatar: "M",
  },
  {
    name: "Sadia Rahman",
    role: "First EV rental · Dhaka",
    quote:
      "Tried the Tesla on the Go Green deal. Clean handover, full charge, and cancelling my earlier booking took one tap.",
    avatar: "S",
  },
];

const Testimonials = () => (
  <section className="bg-base-100 py-20">
    <div className="container-x">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Renter stories</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Loved by people who hate paperwork
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.figure
            key={r.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="flex flex-col rounded-2xl border border-base-300 bg-base-100 p-7"
          >
            <div className="mb-4 flex gap-0.5 text-primary" aria-label="5 out of 5 stars">
              {"★★★★★".split("").map((s, idx) => (
                <span key={idx}>{s}</span>
              ))}
            </div>
            <blockquote className="flex-1 text-sm leading-relaxed text-base-content/80">
              “{r.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 font-display font-bold text-primary">
                {r.avatar}
              </span>
              <span>
                <span className="block text-sm font-semibold">{r.name}</span>
                <span className="block text-xs text-base-content/50">{r.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
