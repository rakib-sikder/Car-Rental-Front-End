import { Link } from "react-router-dom";

// Brand mark: a tangerine rounded square with three tapering "speed streaks".
export function LogoMark({ size = 30, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Overdrive"
    >
      <rect width="32" height="32" rx="9" fill="#FF5A1F" />
      <g fill="#fff">
        <rect x="7" y="10" width="15" height="2.6" rx="1.3" />
        <rect x="6" y="15" width="18" height="2.6" rx="1.3" />
        <rect x="9" y="20" width="12" height="2.6" rx="1.3" />
      </g>
    </svg>
  );
}

export function Logo({ to = "/", light = false, className = "" }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Overdrive home">
      <LogoMark />
      <span
        className={`font-display text-xl font-extrabold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        Over<span className="text-primary">drive</span>
      </span>
    </Link>
  );
}
