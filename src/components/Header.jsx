import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../ContextApi/Context";
import { Logo } from "./Logo";

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/available-cars", label: "Browse cars" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { currentUser, SignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The homepage hero is dark, so the nav starts transparent-on-dark and turns
  // into a solid light bar once you scroll (or on any non-home route).
  const overHero = location.pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? "text-primary"
        : overHero
        ? "text-white/80 hover:text-white"
        : "text-base-content/70 hover:text-base-content"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overHero
          ? "bg-transparent"
          : "bg-base-100/90 backdrop-blur-md border-b border-base-300 shadow-sm"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        {overHero ? <Logo light /> : <Logo />}

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {currentUser ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-2 normal-case">
                <div className="avatar placeholder">
                  <div className="w-7 rounded-full bg-primary text-primary-content">
                    <span className="text-xs">
                      {(currentUser.displayName || currentUser.email || "U")[0].toUpperCase()}
                    </span>
                  </div>
                </div>
                <span className={`max-w-[8rem] truncate ${overHero ? "text-white" : ""}`}>
                  {currentUser.displayName || currentUser.email?.split("@")[0]}
                </span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu z-[60] mt-2 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl"
              >
                <li className="menu-title text-xs">Account</li>
                <li><Link to="/my-bookings">My bookings</Link></li>
                <li><Link to="/my-cars">My cars</Link></li>
                <li><Link to="/add-car">List a car</Link></li>
                <li><Link to="/admin">Admin panel</Link></li>
                <li className="mt-1 border-t border-base-200 pt-1">
                  <button onClick={() => SignOut(navigate)} className="text-error">Sign out</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/admin"
                className={`btn btn-ghost btn-sm ${overHero ? "text-white/90 hover:bg-white/10" : ""}`}
              >
                Admin
              </Link>
              <Link
                to="/login"
                className={`btn btn-sm ${overHero ? "btn-ghost text-white hover:bg-white/10" : "btn-ghost"}`}
              >
                Sign in
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get started
              </Link>
            </>
          )}
        </div>

        {/* mobile toggle */}
        <button
          className={`lg:hidden btn btn-ghost btn-sm btn-square ${overHero ? "text-white" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-base-300 bg-base-100 shadow-lg">
          <nav className="container-x flex flex-col py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? "bg-primary/10 text-primary" : "text-base-content/80"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="my-2 border-t border-base-200" />
            {currentUser ? (
              <>
                <Link to="/my-bookings" className="rounded-lg px-3 py-2.5 text-sm">My bookings</Link>
                <Link to="/my-cars" className="rounded-lg px-3 py-2.5 text-sm">My cars</Link>
                <Link to="/add-car" className="rounded-lg px-3 py-2.5 text-sm">List a car</Link>
                <Link to="/admin" className="rounded-lg px-3 py-2.5 text-sm">Admin panel</Link>
                <button
                  onClick={() => SignOut(navigate)}
                  className="mt-1 rounded-lg px-3 py-2.5 text-left text-sm text-error"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex gap-2 px-1 pt-1">
                <Link to="/login" className="btn btn-ghost btn-sm flex-1">Sign in</Link>
                <Link to="/register" className="btn btn-primary btn-sm flex-1">Get started</Link>
                <Link to="/admin" className="btn btn-outline btn-sm">Admin</Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
