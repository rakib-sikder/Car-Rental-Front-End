import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../ContextApi/Context";

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
      .get(`https://car-rental-system-zeta.vercel.app/cars/${id}`,{withCredentials:true})
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
        `https://car-rental-system-zeta.vercel.app/carsupdate/${car._id}`,
        response,{withCredentials:true}
      )
      .then((res) => {
        setResponse(response);
      });
  };

  const feature = car?.features?.split(",");

  return (
    <div className="p-8 bg-base-100">
      <div className="max-w-4xl mx-auto">
        <div className="card card-bordered shadow-md">
          <figure>
            <img
              src={car.imageUrl}
              alt={car.model}
              className="w-full h-72 object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold">{car.model}</h2>
            <p className="text-lg">
              <strong>Price per day:</strong> ${car.dailyPrice}
            </p>
            <p className="text-lg">
              <strong>Availability:</strong>{" "}
              {car.availability ? (
                <span className="text-green-500">Available</span>
              ) : (
                <span className="text-red-500">Unavailable</span>
              )}
            </p>
            <p className="text-lg">
              <strong>Location:</strong> {car.location}
            </p>
            <div>
              <strong>Features:</strong>
              <ul className="list-disc ml-6 mt-2">
                {feature?.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <p className="mt-4">
              <strong>Description:</strong> {car.description}
            </p>
            <button
              className="btn btn-primary mt-6"
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
