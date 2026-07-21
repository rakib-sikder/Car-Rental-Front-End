import { Link } from "react-router-dom";

const classes = [
  { name: "Compact", icon: "🚗", desc: "Nimble & cheap to run", from: 25, tint: "from-sky-500/10" },
  { name: "Sedan", icon: "🚘", desc: "Comfort for the highway", from: 35, tint: "from-indigo-500/10" },
  { name: "SUV", icon: "🚙", desc: "Space for the whole crew", from: 55, tint: "from-amber-500/10" },
  { name: "Electric", icon: "⚡", desc: "Zero-emission, instant torque", from: 110, tint: "from-teal-500/10" },
  { name: "Truck", icon: "🛻", desc: "Haul, tow, go off-road", from: 70, tint: "from-orange-500/10" },
];

const VehicleClasses = () => (
  <section className="bg-base-200 py-20">
    <div className="container-x">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Browse by class</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            The right car for every trip
          </h2>
        </div>
        <Link to="/available-cars" className="btn btn-ghost btn-sm gap-1">
          View all cars
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {classes.map((c) => (
          <Link
            key={c.name}
            to={`/available-cars?class=${c.name}`}
            className={`group relative overflow-hidden rounded-2xl border border-base-300 bg-gradient-to-br ${c.tint} to-base-100 p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg`}
          >
            <div className="text-4xl">{c.icon}</div>
            <h3 className="mt-4 font-display text-lg font-bold">{c.name}</h3>
            <p className="mt-1 text-xs text-base-content/60">{c.desc}</p>
            <p className="mt-3 text-sm font-semibold text-primary">from ${c.from}/day</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default VehicleClasses;
