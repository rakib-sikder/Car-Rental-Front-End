import { Link } from "react-router-dom";
import { LogoMark } from "./Logo";

const columns = [
  {
    title: "Rent",
    links: [
      { label: "Browse cars", to: "/available-cars" },
      { label: "Economy & compact", to: "/available-cars?class=Compact" },
      { label: "SUVs", to: "/available-cars?class=SUV" },
      { label: "Electric", to: "/available-cars?class=Electric" },
      { label: "Luxury", to: "/available-cars?class=Sedan" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "How it works", to: "/how-it-works" },
      { label: "List your car", to: "/add-car" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", to: "/contact" },
      { label: "Booking help", to: "/my-bookings" },
      { label: "Admin panel", to: "/admin" },
      { label: "Terms & privacy", to: "/about" },
    ],
  },
];

const cities = ["Dhaka", "Chittagong", "Sylhet", "Cox's Bazar"];

const Footer = () => (
  <footer className="bg-ink text-neutral-content">
    <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div className="max-w-xs">
        <Link to="/" className="inline-flex items-center gap-2.5" aria-label="Overdrive home">
          <LogoMark />
          <span className="font-display text-xl font-extrabold tracking-tight text-white">
            Over<span className="text-primary">drive</span>
          </span>
        </Link>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Rent the drive, not the dealership. An on-demand fleet across Bangladesh — book in
          minutes, drive in hours.
        </p>
        <div className="mt-5 flex gap-3">
          {["twitter", "instagram", "facebook"].map((s) => (
            <a
              key={s}
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-label={s}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:text-primary"
            >
              <SocialIcon name={s} />
            </a>
          ))}
        </div>
      </div>

      {columns.map((col) => (
        <div key={col.title}>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
            {col.title}
          </h3>
          <ul className="space-y-2.5">
            {col.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="border-t border-white/10">
      <div className="container-x flex flex-col gap-3 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Overdrive. A portfolio demo — not a real rental service.</p>
        <p className="flex flex-wrap gap-x-2 gap-y-1">
          <span className="text-white/35">Pickup cities:</span>
          {cities.map((c, i) => (
            <span key={c}>
              {c}
              {i < cities.length - 1 && <span className="text-white/25"> ·</span>}
            </span>
          ))}
        </p>
      </div>
    </div>
  </footer>
);

function SocialIcon({ name }) {
  const paths = {
    twitter:
      "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z",
    instagram:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-2.209 0-4 1.79-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.21-1.791-4-4-4zm6.406-1.038c-.516 0-.934.418-.934.934s.418.934.934.934.934-.418.934-.934-.418-.934-.934-.934z",
    facebook:
      "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
  };
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="fill-current">
      <path d={paths[name]} />
    </svg>
  );
}

export default Footer;
