import { useParams } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../ContextApi/Context";
import { API_BASE } from "../api";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const toDateStr = (d) => {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(
    dt.getDate()
  ).padStart(2, "0")}`;
};

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d;
};

// `offer` is an object ({title, discription}) in the seeded data but may be a
// plain string for user-added cars — render whichever shape we get.
const offerLabel = (offer) => {
  if (!offer) return null;
  if (typeof offer === "string") return offer;
  return offer.title || null;
};

const CarDetails = () => {
  const { currentUser, notifys, notifye } = useContext(AuthContext);
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(tomorrow);

  useEffect(() => {
    axios.get(`${API_BASE}/cars/${id}`, { withCredentials: true }).then((res) => {
      setCar(res.data);
    });
  }, [id]);

  const rentalDays = useMemo(() => {
    const days = Math.round((returnDate - pickupDate) / MS_PER_DAY);
    return Math.max(1, days);
  }, [pickupDate, returnDate]);

  const totalPrice = rentalDays * (Number(car.dailyPrice) || 0);

  const handleBookNow = () => {
    if (car.bookedBy) {
      notifye("This car is already booked");
      return;
    }
    if (returnDate <= pickupDate) {
      notifye("Return date must be after the pickup date");
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
          email: currentUser.email,
          booked: true,
          name: currentUser.displayName,
          bookingDate: [{ start: toDateStr(pickupDate), end: toDateStr(returnDate) }],
        },
      ],
    };

    axios
      .put(`${API_BASE}/carsupdate/${car._id}`, payload, { withCredentials: true })
      .then(() => {
        setCar(payload);
        setShowModal(false);
        notifys("Booking confirmed");
      })
      .catch(() => {
        notifye("Could not confirm the booking — please try again");
      });
  };

  const features = car?.features?.split(",");

  return (
    <div className="p-4 sm:p-8 pt-20 bg-neutral-50 min-h-screen">
      <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-[1fr_360px] items-start">
        {/* Car info */}
        <div className="card bg-white border border-neutral-100 shadow-md rounded-2xl overflow-hidden">
          <figure className="relative">
            <img src={car.imageUrl} alt={car.model} className="w-full h-72 object-cover" />
            {offerLabel(car.offer) ? (
              <span className="absolute top-3 left-3 badge badge-warning font-medium shadow">
                {offerLabel(car.offer)}
              </span>
            ) : null}
          </figure>
          <div className="card-body">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <h2 className="card-title text-2xl sm:text-3xl font-bold">{car.model}</h2>
              {car.availability ? (
                <span className="badge badge-accent badge-outline">Available</span>
              ) : (
                <span className="badge badge-error badge-outline">Unavailable</span>
              )}
            </div>
            <p className="text-neutral-500">📍 {car.location}</p>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-3">
                <p className="text-neutral-400 text-xs">Daily rate</p>
                <p className="font-semibold text-blue-600">${car.dailyPrice}/day</p>
              </div>
              <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-3">
                <p className="text-neutral-400 text-xs">Times booked</p>
                <p className="font-semibold">{car.bookingCount ?? 0}</p>
              </div>
              <div className="rounded-xl bg-neutral-50 border border-neutral-100 p-3">
                <p className="text-neutral-400 text-xs">Registration</p>
                <p className="font-semibold">{car.registrationNumber || "—"}</p>
              </div>
            </div>

            <div className="mt-3">
              <p className="font-medium mb-2">Features</p>
              <div className="flex flex-wrap gap-2">
                {features?.map((feature, idx) => (
                  <span key={idx} className="text-xs rounded-full bg-blue-50 text-blue-700 px-3 py-1">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-neutral-600">{car.description}</p>
          </div>
        </div>

        {/* Booking panel */}
        <div className="card bg-white border border-neutral-100 shadow-md rounded-2xl lg:sticky lg:top-24">
          <div className="card-body">
            <h3 className="font-bold text-lg">Book this car</h3>

            <label className="block text-sm font-medium mt-2 mb-1">Pickup date</label>
            <DatePicker
              selected={pickupDate}
              onChange={(date) => {
                setPickupDate(date);
                if (returnDate <= date) {
                  const next = new Date(date);
                  next.setDate(next.getDate() + 1);
                  setReturnDate(next);
                }
              }}
              minDate={new Date()}
              className="input input-bordered w-full"
            />

            <label className="block text-sm font-medium mt-3 mb-1">Return date</label>
            <DatePicker
              selected={returnDate}
              onChange={(date) => setReturnDate(date)}
              minDate={(() => {
                const d = new Date(pickupDate);
                d.setDate(d.getDate() + 1);
                return d;
              })()}
              className="input input-bordered w-full"
            />

            <div className="mt-4 rounded-xl bg-neutral-50 border border-neutral-100 p-4 text-sm space-y-1.5">
              <div className="flex justify-between">
                <span className="text-neutral-500">
                  ${car.dailyPrice}/day × {rentalDays} {rentalDays === 1 ? "day" : "days"}
                </span>
                <span className="font-medium">${totalPrice}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-1.5 text-base">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-blue-600">${totalPrice}</span>
              </div>
            </div>

            <button
              className="btn btn-primary rounded-full mt-4"
              onClick={handleBookNow}
              disabled={!car.availability}
            >
              {car.availability ? "Book now" : "Currently unavailable"}
            </button>
            <p className="text-xs text-neutral-400 text-center">
              Free cancellation from “My bookings”
            </p>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm your booking</h3>
            <div className="py-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Car</span>
                <span className="font-medium">{car.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Pickup</span>
                <span className="font-medium">{toDateStr(pickupDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Return</span>
                <span className="font-medium">{toDateStr(returnDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">
                  ${car.dailyPrice}/day × {rentalDays} {rentalDays === 1 ? "day" : "days"}
                </span>
                <span className="font-bold text-blue-600">${totalPrice}</span>
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-success" onClick={confirmBooking}>
                Confirm
              </button>
              <button className="btn btn-error" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
