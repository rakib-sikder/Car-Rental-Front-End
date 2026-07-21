import { Link } from "react-router-dom";
import { LogoMark } from "./Logo";

// Split-panel shell for login/register: branded dark side + form side.
export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen pt-16 lg:grid-cols-2">
      {/* brand side */}
      <div className="grain relative hidden overflow-hidden bg-ink p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle,#FF5A1F,transparent 70%)" }}
        />
        <Link to="/" className="relative inline-flex items-center gap-2.5">
          <LogoMark />
          <span className="font-display text-xl font-extrabold">Over<span className="text-primary">drive</span></span>
        </Link>
        <div className="relative max-w-sm">
          <p className="font-display text-3xl font-extrabold leading-tight">
            Your next drive is <span className="text-primary">minutes away.</span>
          </p>
          <p className="mt-4 text-white/60">
            Sign in to book cars, manage your trips, and list your own vehicle on the Overdrive fleet.
          </p>
          <div className="mt-8 flex gap-6 text-sm text-white/50">
            <div><span className="block font-display text-2xl font-bold text-white">10+</span>cars</div>
            <div><span className="block font-display text-2xl font-bold text-white">4</span>cities</div>
            <div><span className="block font-display text-2xl font-bold text-white">4.9★</span>rating</div>
          </div>
        </div>
        <p className="relative text-xs text-white/40">Portfolio demo — not a real rental service.</p>
      </div>

      {/* form side */}
      <div className="flex items-center justify-center bg-base-100 p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <LogoMark />
              <span className="font-display text-xl font-extrabold">Over<span className="text-primary">drive</span></span>
            </Link>
          </div>
          <h1 className="font-display text-2xl font-extrabold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
