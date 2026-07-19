import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../ContextApi/Context";
import { API_BASE } from "../api";

const CarDetails = () => {
  const { currentUser, notifys, notifye } = useContext(AuthContext);
  const { id } = useParams();
  const [car, setResponse] = useState({});
  const [response, setCar] = useState({});
  console.log(car);
  const [showModal, setShowModal] = useState(false);

  const now = new Date();
  const day = String(now.getDate());
  const month = String(now.getMonth() + 1);
  const year = String(now.getFullYear());
  const date = `${year}-${month}-${day}`;

  useEffect(() => {
    axios
      .get(`${API_BASE}/cars/${id}`,{withCredentials:true})
      .then((res) => {
        setResponse(res.data);
      });
  }, [showModal]);

  const handleBookNow = () => {
    if (!car.bookedBy) {
      setCar({
        ...car,
        availability: false,
        bookingCount: car.bookingCount + 1,
        bookedBy: [
          {
            email: currentUser.email,
            booked: true,
            name: currentUser.displayName,
            bookingDate: [{ start: date, end: date }],
          },
        ],
      });

      setShowModal(true);
    } else {
      notifye("You have already booked this car");
    }
  };

  const confirmBooking = () => {
    setShowModal(false);
    notifys("Booking Confirmed");
    axios
      .put(
        `${API_BASE}/carsupdate/${car._id}`,
        response,{withCredentials:true}
      )
      .then((res) => {
        setResponse(response);
      });
  };

  const feature = car?.features?.split(",");

  return (
    <div className="p-4 sm:p-8 pt-20 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-white border border-neutral-100 shadow-md rounded-2xl overflow-hidden">
          <figure>
            <img
              src={car.imageUrl}
              alt={car.model}
              className="w-full h-72 object-cover"
            />
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
            <p className="text-2xl font-semibold text-blue-600">
              ${car.dailyPrice}<span className="text-sm font-normal text-neutral-400">/day</span>
            </p>
            <p className="text-neutral-500">
              📍 {car.location}
            </p>
            <div className="mt-2">
              <p className="font-medium mb-2">Features</p>
              <div className="flex flex-wrap gap-2">
                {feature?.map((feature, idx) => (
                  <span key={idx} className="text-xs rounded-full bg-blue-50 text-blue-700 px-3 py-1">{feature}</span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-neutral-600">
              {car.description}
            </p>
            <button
              className="btn btn-primary rounded-full mt-6 w-fit px-8"
              onClick={handleBookNow}
              disabled={!car.availability}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Your Booking</h3>
            <p className="py-4">
              You are about to book <strong>{car.model}</strong> for $
              {car.dailyPrice}/day.
            </p>
            <div className="modal-action">
              <button className="btn btn-success" onClick={confirmBooking}>
                Confirm
              </button>
              <button
                className="btn btn-error"
                onClick={() => setShowModal(false)}
              >
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
