import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../api";
import { offerLabel, offerText } from "../lib/cars";

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/cars`).then((response) => {
      setOffers((response.data || []).filter((car) => offerLabel(car.offer)));
    });
  }, []);

  if (offers.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle,#FF5A1F,transparent 70%)" }}
      />
      <div className="container-x relative">
        <div className="max-w-2xl">
          <p className="eyebrow">Limited deals</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Special offers, running now
          </h2>
          <p className="mt-3 text-white/60">
            Seasonal discounts on select cars — grab them before they're booked out.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, index) => (
            <motion.div
              key={offer._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={`/cars-details/${offer._id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10"
              >
                <img
                  src={offer.imageUrl}
                  alt={offer.model}
                  className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/30" />
                <div className="relative flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-content">
                    {offerLabel(offer.offer)}
                  </span>
                  <h3 className="mt-auto pt-10 font-display text-lg font-bold">{offer.model}</h3>
                  <p className="mt-1 text-sm text-white/60">{offerText(offer.offer)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Book this deal
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
