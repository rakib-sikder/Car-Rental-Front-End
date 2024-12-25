import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker"; // Ensure you install react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { LiaTrashAlt } from "react-icons/lia";
import { AuthContext } from "../ContextApi/Context";

const MyBooking = () => {
  const { currentUser,notifye } = useContext(AuthContext);
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
      .get(`http://localhost:5000/bookedcar/${currentUser?.email}`)
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
      registrationNumber: Cancel.registrationNumber,
    });
    setShowModalC(true);
    setCancelid(id);
  };
  const confirmCancelBooking = () => {
    setShowModalC(false);
    axios.delete(`http://localhost:5000/cars/${cancelid}`).then((response) => {
      console.log(response.data);
    });

    axios
      .post(`http://localhost:5000/addcar`, data)

      .then((res) => {
        console.log(res.data);

        setRefresh(!refresh);
      });
  };

  return (
    <div className="p-8 bg-base-100">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-200 w-full">
            <th>Car Image</th>
            <th>Car Model</th>
            <th>Booking Start</th>
            <th>Booking End</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => (
            <tr key={booking._id}>
              <td>
                <img
                  src={booking.imageUrl}
                  alt=""
                  className="w-[100px] h-[50px]"
                />
              </td>
              <td>{booking.model}</td>
              <td>
                {new Date(
                  booking.bookedBy[0].bookingDate[0].start
                ).toLocaleDateString()}
              </td>
              <td>
                {new Date(
                  booking.bookedBy[0].bookingDate[0].end
                ).toLocaleDateString()}
              </td>

              <td>${booking.dailyPrice}</td>
              {new Date(booking.bookedBy[0].bookingDate[0].start) >= new Date() ? (
                new Date()== new Date(booking.bookedBy[0].bookingDate[0].start)? <td className="text-green-500">confirmed</td>: <td className="text-yellow-500">pending</td>
              ):(
                <td className="text-red-500">canceled</td>
                )}

              <td className="flex flex-col gap-2">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleModifyDate(booking)}
                >
                  <i className="mr-2">📅</i> Modify Date
                </button>
                <button
                  onClick={() => {
                    cancelBookingBtn(booking._id);
                  }}
                  className="btn btn-error text-white btn-sm"
                >
                  <LiaTrashAlt />
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for date  */}
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

      {/* Booking cancel Modal */}
      {showModalC && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg"> Confirm Your Cancel</h3>
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
    </div>
  );
};

export default MyBooking;
