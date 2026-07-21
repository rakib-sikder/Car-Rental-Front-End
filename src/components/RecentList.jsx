import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../api";
import { CarCard } from "./CarCard";

// Home "Featured fleet" section — shows the most recently added cars.
const RecentListings = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/recentAddedCars`)
      .then((response) => setCars(response.data?.slice(0, 8) || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-base-100 py-20">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured fleet</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Freshly added rides
            </h2>
          </div>
          <Link to="/available-cars" className="btn btn-outline btn-primary btn-sm">
            Browse all cars
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl bg-base-200" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentListings;
