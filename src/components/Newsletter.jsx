import { useState } from "react";
import { Link } from "react-router-dom";

// Final CTA band + newsletter capture.
const Newsletter = () => {
  const [sent, setSent] = useState(false);

  return (
    <section className="bg-base-200 py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-white sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle,#FF5A1F,transparent 70%)" }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to hit the road?
            </h2>
            <p className="mt-3 text-white/70">
              Browse the fleet now, or get seasonal deals and new-car drops in your inbox.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/available-cars" className="btn btn-primary w-full sm:w-auto">
                Browse cars
              </Link>
              <Link to="/register" className="btn btn-outline w-full border-white/30 text-white hover:bg-white hover:text-ink sm:w-auto">
                Create free account
              </Link>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="input flex-1 rounded-full bg-white/10 text-white placeholder:text-white/40 focus:bg-white/15"
              />
              <button className="btn rounded-full bg-white text-ink hover:bg-white/90" type="submit">
                {sent ? "Subscribed ✓" : "Notify me"}
              </button>
            </form>
            {sent && (
              <p className="mt-2 text-xs text-white/60">Thanks — you're on the list. (Demo, no email is actually sent.)</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
