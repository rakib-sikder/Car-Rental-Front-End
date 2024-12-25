import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // Ensure you install react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { LiaTrashAlt } from "react-icons/lia";
import { AuthContext } from "../ContextApi/Context";
import BookingChart from "../components/BookingChart";

const MyBooking = () => {
  const { currentUser,notifye,notifys } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [cancelid, setCancelid] = useState(false);
  const [data, setNewData] = useState([]);
  const [showModalC, setShowModalC] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // For the booking being modified
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [newDates, setNewDates] = useState({
    start: new Date(),
    end: new Date(),
  }); // For date selection
  // data loading from the server
  useEffect(() => {
    axios
      .get(`https://car-rental-system-zeta.vercel.app/bookedcar/${currentUser?.email}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {});
  }, [refresh]);
  // Open modal and set initial dates
  const handleModifyDate = (booking) => {
    setSelectedBooking(booking);
    setNewDates({
      start: booking.bookedBy[0].bookingDate[0].start,
      end: booking.bookedBy[0].bookingDate[0].start,
    });
    setShowModal(true);
    console.log(newDates);
  };

  // Confirm and save the new dates
  const handleConfirm = () => {
    if (newDates.start >= newDates.end) {
      notifye("Start date must be before the end date.");
      return;
    }

    const updatedBookings = bookings.map((booking) =>
      booking._id === selectedBooking._id
        ? {
            ...booking,
            bookedBy: [{ ...booking.bookedBy[0], bookingDate: [newDates] }],
          }
        : booking
    );
    setBookings(updatedBookings);

    axios.put( `https://car-rental-system-zeta.vercel.app/carsupdate/${selectedBooking._id}`, {
      bookedBy: [
        {
          ...selectedBooking.bookedBy[0],
          bookingDate: [newDates],
        },
      ],
    }).then((response) => {
      notifys("Booking date modified successfully.");
    });


    setShowModal(false);
  };
  // Cancel booking and update the car availability

  const cancelBookingBtn = (id) => {
    const Cancel = bookings?.find((booking) => booking._id === id);
    setNewData({
      addedBy: Cancel.addedBy,
      availability: true,
      bookingCount: Cancel.bookingCount - 1,
      dailyPrice: Cancel.dailyPrice,
      dateAdded: Cancel.dateAdded,
      description: Cancel.description,
      features: Cancel.features,
      imageUrl: Cancel.imageUrl,
      location: Cancel.location,
      model: Cancel.model,
      offer: Cancel.offer,
      registrationNumber: Cancel.registrationNumber,
    });
    setShowModalC(true); 
    setCancelid(id);
  };
  const confirmCancelBooking = () => {
    setShowModalC(false);
    axios.delete(`https://car-rental-system-zeta.vercel.app/cars/${cancelid}`).then((response) => {
      console.log(response.data);
    });

    axios
      .post(`https://car-rental-system-zeta.vercel.app/addcar`, data)

      .then((res) => {
        console.log(res.data);

        setRefresh(!refresh);
      });
  };

  return (
    <div className="p-4 sm:p-8 bg-base-100">
  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">My Bookings</h2>

  {/* Responsive Table Container */}
  <div className="overflow-x-auto">
    <table className="table table-auto w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-2 py-2">Car Image</th>
          <th className="px-2 py-2">Car Model</th>
          <th className="px-2 py-2">Booking Start</th>
          <th className="px-2 py-2">Booking End</th>
          <th className="px-2 py-2">Total Price</th>
          <th className="px-2 py-2">Status</th>
          <th className="px-2 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings?.map((booking) => (
          <tr key={booking._id} className="text-sm sm:text-base">
            <td className="px-2 py-2">
              <img
                src={booking.imageUrl}
                alt="Car"
                className="w-16 h-16 sm:w-[100px] sm:h-[50px] object-cover"
              />
            </td>
            <td className="px-2 py-2">{booking.model}</td>
            <td className="px-2 py-2">
              {new Date(booking.bookedBy[0].bookingDate[0].start).toLocaleDateString()}
            </td>
            <td className="px-2 py-2">
              {new Date(booking.bookedBy[0].bookingDate[0].end).toLocaleDateString()}
            </td>
            <td className="px-2 py-2">${booking.dailyPrice}</td>
            <td className="px-2 py-2">
              {new Date(booking.bookedBy[0].bookingDate[0].start) >= new Date() ? (
                new Date() === new Date(booking.bookedBy[0].bookingDate[0].start) ? (
                  <span className="text-green-500">Confirmed</span>
                ) : (
                  <span className="text-yellow-500">Pending</span>
                )
              ) : (
                <span className="text-red-500">Canceled</span>
              )}
            </td>
            <td className="px-2 py-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  className="btn btn-sm btn-primary text-nowrap flex items-center justify-center"
                  onClick={() => handleModifyDate(booking)}
                >
                  📅 Modify Date
                </button>
                <button
                  onClick={() => cancelBookingBtn(booking._id)}
                  className="btn btn-sm btn-error flex items-center justify-center text-white"
                >
                  <LiaTrashAlt className="mr-1" />
                  Cancel
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Modal for Modify Date */}
  {showModal && (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Modify Booking Dates</h3>
        <div className="py-4">
          <label className="block mb-2 font-semibold">Start Date</label>
          <DatePicker
            selected={newDates.start}
            onChange={(date) => setNewDates({ ...newDates, start: date })}
            className="input input-bordered w-full"
          />
          <label className="block mt-4 mb-2 font-semibold">End Date</label>
          <DatePicker
            selected={newDates.end}
            onChange={(date) => setNewDates({ ...newDates, end: date })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="modal-action">
          <button className="btn btn-success" onClick={handleConfirm}>
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

  {/* Modal for Cancel Booking */}
  {showModalC && (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Your Cancel</h3>
        <p className="py-4">
          Are you sure you want to cancel this booking?
        </p>
        <div className="modal-action">
          <button
            className="btn btn-error text-white"
            onClick={confirmCancelBooking}
          >
            Yes
          </button>
          <button
            className="btn btn-success text-white"
            onClick={() => setShowModalC(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )}

  <BookingChart bookings={bookings} > </BookingChart>
</div>

  );
};

export default MyBooking;
