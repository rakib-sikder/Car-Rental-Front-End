import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../api";
import Loading from "../components/Loading";

// `offer` is an object ({title, discription}) in the seeded data but may be a
// plain string for user-added cars — render whichever shape we get.
const offerLabel = (offer) => {
  if (!offer) return null;
  if (typeof offer === "string") return offer;
  return offer.title || null;
};

const AvailableCars = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [locationFilter, setLocationFilter] = useState("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/cars`)
      .then((response) => setAllCars(response.data))
      .finally(() => setLoading(false));
  }, []);

  const locations = useMemo(
    () => [...new Set(allCars.map((c) => c.location).filter(Boolean))].sort(),
    [allCars]
  );

  const cars = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = allCars.filter((car) => {
      if (onlyAvailable && !car.availability) return false;
      if (locationFilter !== "all" && car.location !== locationFilter) return false;
      if (maxPrice !== "" && Number(car.dailyPrice) > Number(maxPrice)) return false;
      if (!term) return true;
      return (
        car?.model?.toLowerCase()?.includes(term) ||
        car?.location?.toLowerCase()?.includes(term) ||
        car?.description?.toLowerCase()?.includes(term) ||
        car?.features?.toLowerCase()?.includes(term)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.dailyPrice - b.dailyPrice;
      if (sortBy === "price-desc") return b.dailyPrice - a.dailyPrice;
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    });
  }, [allCars, searchTerm, sortBy, locationFilter, onlyAvailable, maxPrice]);

  const hasActiveFilters =
    searchTerm !== "" || locationFilter !== "all" || onlyAvailable || maxPrice !== "";

  const clearFilters = () => {
    setSearchTerm("");
    setLocationFilter("all");
    setOnlyAvailable(false);
    setMaxPrice("");
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-wrap justify-between pt-20 items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          Available Cars
          <span className="ml-2 align-middle badge badge-ghost">
            {cars.length} of {allCars.length}
          </span>
        </h2>
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="btn btn-outline btn-primary"
        >
          {viewMode === "grid" ? "List" : "Grid"} View
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="mb-6 rounded-2xl border border-neutral-100 bg-white shadow-sm p-4 flex flex-wrap items-end gap-3">
        <div className="form-control flex-1 min-w-[180px]">
          <label className="label pb-1 pt-0">
            <span className="label-text text-xs">Search</span>
          </label>
          <input
            type="text"
            placeholder="Model, location, feature…"
            className="input input-bordered input-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="form-control min-w-[140px]">
          <label className="label pb-1 pt-0">
            <span className="label-text text-xs">Location</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="all">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control min-w-[130px]">
          <label className="label pb-1 pt-0">
            <span className="label-text text-xs">Max price/day</span>
          </label>
          <input
            type="number"
            min="0"
            placeholder="Any"
            className="input input-bordered input-sm w-full"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="form-control min-w-[140px]">
          <label className="label pb-1 pt-0">
            <span className="label-text text-xs">Sort by</span>
          </label>
          <select
            className="select select-bordered select-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
        <label className="label cursor-pointer gap-2 pb-2">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
          <span className="label-text text-sm">Available only</span>
        </label>
        {hasActiveFilters && (
          <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
            ✕ Clear filters
          </button>
        )}
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <p className="text-4xl mb-3">🚗</p>
          <p className="font-medium text-neutral-600">No cars match those filters</p>
          <p className="text-sm mt-1">Try widening the price range or clearing filters.</p>
          {hasActiveFilters && (
            <button className="btn btn-outline btn-primary btn-sm mt-4" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div
          className={`grid ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              : "grid-cols-1 gap-4"
          }`}
        >
          {cars.map((car) => (
            <div
              key={car._id}
              className="card bg-white border border-neutral-100 shadow-sm hover:shadow-lg transition-shadow rounded-2xl overflow-hidden"
            >
              <figure className="relative">
                <img
                  src={car.imageUrl}
                  alt={car.model}
                  className={`w-full ${viewMode === "grid" ? "h-56" : "h-80"} object-cover`}
                />
                {offerLabel(car.offer) ? (
                  <span className="absolute top-3 left-3 badge badge-warning font-medium shadow">
                    {offerLabel(car.offer)}
                  </span>
                ) : null}
              </figure>
              <div className="card-body p-5">
                <div className="flex items-center justify-between">
                  <h3 className="card-title text-base">{car.model}</h3>
                  {car.availability ? (
                    <div className="badge badge-accent badge-outline">Available</div>
                  ) : (
                    <div className="badge badge-error badge-outline">Unavailable</div>
                  )}
                </div>
                <p className="text-sm text-neutral-500">
                  {car.location}
                  {car.bookingCount ? (
                    <span className="text-neutral-400"> · booked {car.bookingCount}×</span>
                  ) : null}
                </p>
                <p className="text-lg font-semibold text-blue-600">
                  ${car.dailyPrice}
                  <span className="text-sm font-normal text-neutral-400">/day</span>
                </p>
                <Link to={`/cars-details/${car._id}`} className="btn btn-primary rounded-full mt-2">
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
