import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_BASE } from "../api";
import { CarCard } from "../components/CarCard";
import { carClass, LOCATIONS } from "../lib/cars";
import Loading from "../components/Loading";

const CLASSES = ["Compact", "Sedan", "SUV", "Electric", "Truck"];

const AvailableCars = () => {
  const [params, setParams] = useSearchParams();
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");

  const [search, setSearch] = useState(params.get("q") || "");
  const [location, setLocation] = useState(params.get("location") || "all");
  const [klass, setKlass] = useState(params.get("class") || "all");
  const [maxPrice, setMaxPrice] = useState(params.get("max") || "");
  const [onlyAvailable, setOnlyAvailable] = useState(params.get("avail") === "1");
  const [sortBy, setSortBy] = useState(params.get("sort") || "newest");

  const from = params.get("from");
  const to = params.get("to");

  useEffect(() => {
    axios
      .get(`${API_BASE}/cars`)
      .then((r) => setAllCars(r.data || []))
      .finally(() => setLoading(false));
  }, []);

  // Keep the URL in sync so filtered views are shareable/bookmarkable.
  useEffect(() => {
    const next = {};
    if (search) next.q = search;
    if (location !== "all") next.location = location;
    if (klass !== "all") next.class = klass;
    if (maxPrice) next.max = maxPrice;
    if (onlyAvailable) next.avail = "1";
    if (sortBy !== "newest") next.sort = sortBy;
    if (from) next.from = from;
    if (to) next.to = to;
    setParams(next, { replace: true });
  }, [search, location, klass, maxPrice, onlyAvailable, sortBy]); // eslint-disable-line

  const cars = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = allCars.filter((car) => {
      if (onlyAvailable && !car.availability) return false;
      if (location !== "all" && car.location !== location) return false;
      if (klass !== "all" && carClass(car) !== klass) return false;
      if (maxPrice && Number(car.dailyPrice) > Number(maxPrice)) return false;
      if (!term) return true;
      return (
        car.model?.toLowerCase().includes(term) ||
        car.location?.toLowerCase().includes(term) ||
        car.description?.toLowerCase().includes(term) ||
        car.features?.toLowerCase().includes(term)
      );
    });
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.dailyPrice - b.dailyPrice;
      if (sortBy === "price-desc") return b.dailyPrice - a.dailyPrice;
      if (sortBy === "popular") return (b.bookingCount || 0) - (a.bookingCount || 0);
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });
  }, [allCars, search, location, klass, maxPrice, onlyAvailable, sortBy]);

  const hasFilters =
    search || location !== "all" || klass !== "all" || maxPrice || onlyAvailable;

  const clearFilters = () => {
    setSearch("");
    setLocation("all");
    setKlass("all");
    setMaxPrice("");
    setOnlyAvailable(false);
  };

  if (loading) return <div className="pt-16"><Loading label="Loading the fleet…" /></div>;

  return (
    <div className="bg-base-200 pt-16">
      {/* page header */}
      <div className="bg-ink text-white">
        <div className="container-x py-10">
          <p className="eyebrow">Browse the fleet</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Available cars
          </h1>
          <p className="mt-2 text-white/60">
            {from && to ? (
              <>Showing availability for {from} → {to}. </>
            ) : null}
            {allCars.length} cars across {LOCATIONS.length} cities.
          </p>
        </div>
      </div>

      <div className="container-x grid gap-8 py-10 lg:grid-cols-[260px_1fr]">
        {/* filter sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold">Filters</h2>
              {hasFilters && (
                <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                  Clear all
                </button>
              )}
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-base-content/50">
              Search
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Model, feature…"
              className="input input-bordered input-sm mt-1.5 w-full"
            />

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-base-content/50">
              Vehicle class
            </label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <FilterChip active={klass === "all"} onClick={() => setKlass("all")}>All</FilterChip>
              {CLASSES.map((c) => (
                <FilterChip key={c} active={klass === c} onClick={() => setKlass(c)}>{c}</FilterChip>
              ))}
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-base-content/50">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="select select-bordered select-sm mt-1.5 w-full"
            >
              <option value="all">All cities</option>
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-base-content/50">
              Max price / day: {maxPrice ? `$${maxPrice}` : "Any"}
            </label>
            <input
              type="range"
              min="20"
              max="120"
              step="5"
              value={maxPrice || 120}
              onChange={(e) => setMaxPrice(e.target.value === "120" ? "" : e.target.value)}
              className="range range-primary range-sm mt-2"
            />

            <label className="mt-4 flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                checked={onlyAvailable}
                onChange={(e) => setOnlyAvailable(e.target.checked)}
              />
              <span className="text-sm">Available only</span>
            </label>
          </div>
        </aside>

        {/* results */}
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-base-content/60">
              <span className="font-semibold text-base-content">{cars.length}</span> car
              {cars.length === 1 ? "" : "s"} found
            </p>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="newest">Newest first</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="popular">Most popular</option>
              </select>
              <div className="join">
                <button
                  onClick={() => setView("grid")}
                  className={`btn btn-sm join-item ${view === "grid" ? "btn-primary" : "btn-ghost"}`}
                  aria-label="Grid view"
                >
                  <GridIcon />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`btn btn-sm join-item ${view === "list" ? "btn-primary" : "btn-ghost"}`}
                  aria-label="List view"
                >
                  <ListIcon />
                </button>
              </div>
            </div>
          </div>

          {cars.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 py-20 text-center">
              <p className="text-4xl">🚗</p>
              <p className="mt-3 font-display font-bold">No cars match those filters</p>
              <p className="mt-1 text-sm text-base-content/60">Try widening the price range or clearing filters.</p>
              {hasFilters && (
                <button onClick={clearFilters} className="btn btn-outline btn-primary btn-sm mt-5">
                  Clear filters
                </button>
              )}
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} view="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-primary bg-primary text-primary-content"
          : "border-base-300 bg-base-100 text-base-content/70 hover:border-primary/50"
      }`}
    >
      {children}
    </button>
  );
}

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

export default AvailableCars;
