import { Link } from "react-router-dom";
import { carClass, CLASS_META, offerLabel, featureList, seatGuess } from "../lib/cars";

export function CarCard({ car, view = "grid" }) {
  const cls = carClass(car);
  const meta = CLASS_META[cls];
  const offer = offerLabel(car.offer);
  const features = featureList(car.features).slice(0, 3);

  if (view === "list") {
    return (
      <Link
        to={`/cars-details/${car._id}`}
        className="group flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition-all hover:border-primary/40 hover:shadow-lg sm:flex-row"
      >
        <div className="relative sm:w-72 shrink-0 overflow-hidden">
          <img
            src={car.imageUrl}
            alt={car.model}
            loading="lazy"
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-full"
          />
          {offer && <OfferBadge label={offer} />}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className={`badge badge-sm border ${meta.tint}`}>{meta.icon} {cls}</span>
                <AvailabilityDot available={car.availability} />
              </div>
              <h3 className="font-display text-lg font-bold">{car.model}</h3>
              <p className="text-sm text-base-content/60">{car.location}</p>
            </div>
            <Price value={car.dailyPrice} />
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-base-content/70">{car.description}</p>
          <div className="mt-auto flex items-center justify-between pt-4">
            <SpecRow car={car} features={features} />
            <span className="btn btn-primary btn-sm">Book now</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/cars-details/${car._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={car.imageUrl}
          alt={car.model}
          loading="lazy"
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 badge border-0 bg-base-100/95 font-semibold text-base-content shadow-sm">
          {meta.icon} {cls}
        </span>
        {offer && <OfferBadge label={offer} />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-bold leading-tight">{car.model}</h3>
            <p className="text-sm text-base-content/60">{car.location}</p>
          </div>
          <AvailabilityDot available={car.availability} />
        </div>

        <div className="mt-4">
          <SpecRow car={car} features={features} />
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <Price value={car.dailyPrice} />
          <span className="btn btn-primary btn-sm">Details</span>
        </div>
      </div>
    </Link>
  );
}

function Price({ value }) {
  return (
    <p className="text-right leading-none">
      <span className="font-display text-xl font-extrabold">${value}</span>
      <span className="text-xs font-medium text-base-content/50">/day</span>
    </p>
  );
}

function AvailabilityDot({ available }) {
  return available ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success">
      <span className="h-2 w-2 rounded-full bg-success" /> Available
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-base-content/40">
      <span className="h-2 w-2 rounded-full bg-base-content/30" /> Booked
    </span>
  );
}

function OfferBadge({ label }) {
  return (
    <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-content shadow-sm">
      {label}
    </span>
  );
}

function SpecRow({ car, features }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-base-content/60">
      <span className="inline-flex items-center gap-1">👤 {seatGuess(car)} seats</span>
      {features.slice(0, 2).map((f) => (
        <span key={f} className="inline-flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-base-content/30" /> {f}
        </span>
      ))}
    </div>
  );
}
