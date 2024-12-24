import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../ContextApi/Context";

// pages/MyBookings.jsx
const MyBookings = () => {
  const {currentUser} = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(()=>{
      axios.get(`http://localhost:5000/booked/${currentUser?.email}`)
      .then((response) =>{
        setBookings(response.data);
        console.log(response.data);
      })
      .catch( (error) =>{
        console.log(error);
      });
    },[])

    const cancelBooked = (id) =>{
      setBookings({ ...bookings, bookedBy });
      axios.put(`http://localhost:5000/carsupdate/${id}`,)
      
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
                <td>{booking.imageUrl}</td>
                <td>{booking.model}</td>
                <td>{booking.date}</td>
                <td>${booking.price}</td>
                {booking.availability? <td>Available</td>:<td>Unavilable</td>}
                <td>
                  <button onClick={()=>{cancelBooked(booking._id)}} className="btn btn-primary btn-sm">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default MyBookings;
  