import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../ContextApi/Context";

// pages/MyBookings.jsx
const MyBookings = () => {
  const { currentUser } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [update, setUpdate] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/bookedcar/${currentUser?.email}`)
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {});
  }, [refresh]);


  const newupdate= (id) => {
    const Cancel = bookings?.find((booking) => booking._id === id);
    setUpdate({
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
      registrationNumber: Cancel.registrationNumber
    });
    setShowModal(true)
    axios.delete(`http://localhost:5000/cars/${id}`)
    .then((response) => {
      console.log(response.data)
    })
  }
const confirmBooking = (id) => {
  setShowModal(false);
  axios.post(`http://localhost:5000/addcar`, update)

  .then((res) => { console.log(res.data) 
   
    setRefresh(!refresh);
  })



}
 

  return (
    <div className="p-8 mx-auto bg-base-100">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Model</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => (
            <tr key={booking._id}>
              <td><img src={booking.imageUrl} alt="" className="w-[100px] h-[50px]" /></td>
              <td>{booking.model}</td>
              <td>{booking.dateAdded}</td>
              <td>${booking.dailyPrice}</td>
              {!booking.availability ? <td>Booked</td> : <td>Unavilable</td>}
              <td>
                <button
                  onClick={() => {
                    newupdate(booking._id);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Booking Confirmation Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg"> Your Booking canceld</h3>
            <p className="py-4">
              Your booking has been canceled successfully. Your amount will be
              refunded within 5-7 business days.
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={confirmBooking}>
                close
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
