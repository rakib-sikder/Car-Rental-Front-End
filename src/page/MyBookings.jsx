// pages/MyBookings.jsx
const MyBookings = () => {
    const bookings = [
      { id: 1, model: "Toyota Corolla", date: "2024-12-01", total: 120, status: "Confirmed" },
    ];
  
    return (
      <div className="p-8 mx-auto bg-base-100">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Model</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.model}</td>
                <td>{booking.date}</td>
                <td>${booking.total}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default MyBookings;
  