import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../ContextApi/Context";
import { API_BASE } from "../api";
import {
  carClass,
  CLASS_META,
  featureList,
  offerLabel,
  offerText,
  seatGuess,
  toDateStr,
  rentalDays,
} from "../lib/cars";
import Loading from "../components/Loading";

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d;
};

const GUEST = { email: "guest@overdrive.demo", displayName: "Guest renter" };

const CarDetails = () => {
  const { currentUser, authAvailable, notifys, notifye } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pickup, setPickup] = useState(new Date());
  const [ret, setRet] = useState(tomorrow);

  useEffect(() => {
    axios.get(`${API_BASE}/cars/${id}`, { withCredentials: true }).then((res) => setCar(res.data));
  }, [id]);

  const days = useMemo(() => rentalDays(pickup, ret), [pickup, ret]);
  const total = days * (Number(car?.dailyPrice) || 0);

  if (!car) return <div className="pt-16"><Loading label="Loading car…" /></div>;

  const cls = carClass(car);
  const meta = CLASS_META[cls];
  const features = featureList(car.features);
  const offer = offerLabel(car.offer);

  // Real auth gates booking when configured; otherwise a guest can book (demo).
  const booker = currentUser || (!authAvailable ? GUEST : null);

  const handleBook = () => {
    if (!booker) {
      notifye("Please sign in to book this car");
      navigate("/login", { state: `/cars-details/${id}` });
      return;
    }
    if (car.bookedBy) {
      notifye("This car is already booked");
      return;
    }
    if (ret <= pickup) {
      notifye("Return date must be after pickup");
      return;
    }
    setShowModal(true);
  };

  const confirmBooking = () => {
    const payload = {
      ...car,
      availability: false,
      bookingCount: (car.bookingCount || 0) + 1,
      bookedBy: [
        {
          email: booker.email,
          booked: true,
          name: booker.displayName,
          bookingDate: [{ start: toDateStr(pickup), end: toDateStr(ret) }],
        },
      ],
    };
    axios
      .put(`${API_BASE}/carsupdate/${car._id}`, payload, { withCredentials: true })
      .then(() => {
        setCar(payload);
        setShowModal(false);
        notifys("Booking confirmed!");
      })
      .catch(() => notifye("Could not confirm the booking — please try again"));
  };

  return (
    <div className="bg-base-200 pt-16">
      <div className="container-x py-8">
        <nav className="mb-6 text-sm text-base-content/50" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-base-content">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/available-cars" className="hover:text-base-content">Browse</Link>
          <span className="mx-2">/</span>
          <span className="text-base-content">{car.model}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* left: gallery + info */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-base-300">
              <img src={car.imageUrl} alt={car.model} className="h-72 w-full object-cover sm:h-96" />
              <span className="absolute left-4 top-4 badge border-0 bg-base-100/95 font-semibold shadow">
                {meta.icon} {cls}
              </span>
              {offer && (
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-content shadow">
                  {offer}
                </span>
              )}
            </div>

            <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{car.model}</h1>
                  <p className="mt-1 text-base-content/60">📍 {car.location}</p>
                </div>
                {car.availability ? (
                  <span className="badge badge-success gap-1.5 text-success-content">● Available</span>
                ) : (
                  <span className="badge gap-1.5">● Booked</span>
                )}
              </div>

              {/* spec grid */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Spec label="Class" value={`${meta.icon} ${cls}`} />
                <Spec label="Seats" value={`${seatGuess(car)} people`} />
                <Spec label="Times booked" value={car.bookingCount ?? 0} />
                <Spec label="Reg. number" value={car.registrationNumber || "—"} />
              </div>

              <div className="mt-6">
                <h2 className="font-display font-bold">Features</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {features.map((f) => (
                    <span key={f} className="rounded-full border border-base-300 bg-base-200 px-3 py-1 text-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="font-display font-bold">About this car</h2>
                <p className="mt-2 leading-relaxed text-base-content/70">{car.description}</p>
                {offer && offerText(car.offer) && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <span className="text-lg">🏷️</span>
                    <div>
                      <p className="text-sm font-semibold text-primary">{offer}</p>
                      <p className="text-sm text-base-content/70">{offerText(car.offer)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* right: booking panel */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6 lg:sticky lg:top-24">
            <div className="flex items-baseline justify-between">
              <p>
                <span className="font-display text-3xl font-extrabold">${car.dailyPrice}</span>
                <span className="text-sm text-base-content/50">/day</span>
              </p>
              <span className="text-sm text-base-content/50">{cls}</span>
            </div>

            <div className="mt-5 space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-base-content/50">
                  Pickup date
                </label>
                <DatePicker
                  selected={pickup}
                  onChange={(d) => {
                    setPickup(d);
                    if (ret <= d) {
                      const n = new Date(d);
                      n.setDate(n.getDate() + 1);
                      setRet(n);
                    }
                  }}
                  minDate={new Date()}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-base-content/50">
                  Return date
                </label>
                <DatePicker
                  selected={ret}
                  onChange={(d) => setRet(d)}
                  minDate={(() => {
                    const d = new Date(pickup);
                    d.setDate(d.getDate() + 1);
                    return d;
                  })()}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="mt-5 space-y-2 rounded-xl bg-base-200 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-base-content/60">
                  ${car.dailyPrice} × {days} {days === 1 ? "day" : "days"}
                </span>
                <span className="font-medium">${total}</span>
              </div>
              <div className="flex justify-between border-t border-base-300 pt-2 text-base">
                <span className="font-semibold">Total</span>
                <span className="font-display font-extrabold text-primary">${total}</span>
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={!car.availability}
              className="btn btn-primary mt-4 w-full"
            >
              {car.availability ? "Book now" : "Currently unavailable"}
            </button>
            <p className="mt-3 text-center text-xs text-base-content/50">
              Free cancellation · pay at pickup · confirmed server-side
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-display text-lg font-bold">Confirm your booking</h3>
            <div className="mt-4 space-y-2 text-sm">
              <Row label="Car" value={car.model} />
              <Row label="Pickup" value={toDateStr(pickup)} />
              <Row label="Return" value={toDateStr(ret)} />
              <Row label={`$${car.dailyPrice} × ${days} ${days === 1 ? "day" : "days"}`} value={`$${total}`} strong />
            </div>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmBooking}>Confirm booking</button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={() => setShowModal(false)} />
        </div>
      )}
    </div>
  );
};

function Spec({ label, value }) {
  return (
    <div className="rounded-xl border border-base-300 bg-base-200 p-3">
      <p className="text-xs text-base-content/50">{label}</p>
      <p className="mt-0.5 font-semibold">{value}</p>
    </div>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex justify-between">
      <span className="text-base-content/60">{label}</span>
      <span className={strong ? "font-display font-extrabold text-primary" : "font-medium"}>{value}</span>
    </div>
  );
}

export default CarDetails;
