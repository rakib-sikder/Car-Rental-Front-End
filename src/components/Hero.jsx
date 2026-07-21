import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LOCATIONS, toDateStr } from "../lib/cars";

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d;
};

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [from, setFrom] = useState(toDateStr(new Date()));
  const [to, setTo] = useState(toDateStr(tomorrow()));

  const search = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    navigate(`/available-cars?${params.toString()}`);
  };

  return (
    <section className="grain relative overflow-hidden bg-ink text-white">
      {/* ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #FF5A1F 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 -left-40 h-[480px] w-[480px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #0EA5A0 0%, transparent 70%)" }}
      />

      <div className="container-x relative grid gap-12 pb-16 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-36">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            10 cars live across 4 cities — book in minutes
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Rent the drive,
            <br />
            not the <span className="text-primary">dealership.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-lg text-white/70"
          >
            Economy runabouts, family SUVs, electric, and luxury — real-time availability, transparent
            daily pricing, and a checkout that actually confirms your slot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60"
          >
            {[
              ["4.9★", "avg. rating"],
              ["24/7", "roadside help"],
              ["Free", "cancellation"],
            ].map(([big, small]) => (
              <div key={small}>
                <span className="font-display text-lg font-bold text-white">{big}</span>{" "}
                {small}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Search widget */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={search}
          className="self-center rounded-2xl border border-white/10 bg-white/95 p-6 text-base-content shadow-2xl backdrop-blur lg:justify-self-end lg:p-7"
        >
          <h2 className="font-display text-lg font-bold">Find your car</h2>
          <p className="mb-5 text-sm text-base-content/60">Pick a city and your dates.</p>

          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-base-content/50">
            Pickup location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">All cities</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-base-content/50">
                Pickup
              </label>
              <input
                type="date"
                value={from}
                min={toDateStr(new Date())}
                onChange={(e) => {
                  setFrom(e.target.value);
                  if (e.target.value >= to) {
                    const n = new Date(e.target.value);
                    n.setDate(n.getDate() + 1);
                    setTo(toDateStr(n));
                  }
                }}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-base-content/50">
                Return
              </label>
              <input
                type="date"
                value={to}
                min={from}
                onChange={(e) => setTo(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-6 w-full">
            Search available cars
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <p className="mt-3 text-center text-xs text-base-content/50">
            No card required to browse — pay at pickup.
          </p>
        </motion.form>
      </div>

      {/* logo strip */}
      <div className="relative border-t border-white/10 py-5">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-medium text-white/40">
          <span className="text-white/30">Fleet partners:</span>
          {["Toyota", "Honda", "BMW", "Tesla", "Mercedes-Benz", "Hyundai", "Kia"].map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
