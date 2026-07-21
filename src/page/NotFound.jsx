import { Link } from "react-router-dom";
import { LogoMark } from "../components/Logo";

const NotFound = () => (
  <div className="grain relative grid min-h-screen place-items-center overflow-hidden bg-ink px-6 text-center text-white">
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full opacity-25 blur-3xl"
      style={{ background: "radial-gradient(circle,#FF5A1F,transparent 70%)" }}
    />
    <div className="relative">
      <Link to="/" className="mb-8 inline-flex items-center gap-2.5">
        <LogoMark />
        <span className="font-display text-xl font-extrabold">Over<span className="text-primary">drive</span></span>
      </Link>
      <p className="font-display text-[7rem] font-extrabold leading-none text-primary sm:text-[10rem]">404</p>
      <h1 className="font-display text-2xl font-bold">This road doesn't exist</h1>
      <p className="mx-auto mt-3 max-w-md text-white/60">
        The page you're looking for took a wrong turn. Let's get you back on route.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary">Back to home</Link>
        <Link to="/available-cars" className="btn btn-outline border-white/30 text-white hover:bg-white hover:text-ink">
          Browse cars
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
