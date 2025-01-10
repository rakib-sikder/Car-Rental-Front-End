import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// RecentListings.jsx
const RecentListings = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("https://car-rental-system-zeta.vercel.app/recentAddedCars")
      .then((response) => {
        setCars(response.data);
      })
  }, []);
    
    return (
        <section className="p-8 bg-base-100">
          <h2 className="text-2xl font-bold text-center mb-6">Recent Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars?.map((car, idx) => (
              <div key={idx} onClick={()=>{navigate(`/cars-details/${car._id}`)}} className="card bg-base-100 shadow-md hover:shadow-lg ">
                <figure>
                  <img src={car.imageUrl} alt={car.model} className="w-full h-48 object-cover" />
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title">{car.model}</h3>
                  <p className="text-sm">Price: ${car.dailyPrice}/day</p>
                  <p className="text-sm">Availability: {car.availability ? "Available" : "Not Available"}</p>
                  <p className="text-sm">Booking: {car.bookingCount}</p>
                  <p className="text-sm">Posted: {car.dateAdded}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
}
    
  
  export default RecentListings;
  