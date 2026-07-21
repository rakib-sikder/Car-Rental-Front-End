export function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="bg-ink pt-16 text-white">
      <div className="container-x py-12">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-white/60">{subtitle}</p>}
      </div>
    </div>
  );
}
