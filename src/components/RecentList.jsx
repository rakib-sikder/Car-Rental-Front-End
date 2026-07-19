import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../api";

// RecentListings.jsx
const RecentListings = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/recentAddedCars`)
      .then((response) => {
        setCars(response.data);
      })
  }, []);
    
    return (
        <section className="p-8 bg-base-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Recent Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cars?.map((car, idx) => (
              <div key={idx} onClick={()=>{navigate(`/cars-details/${car._id}`)}} className="card bg-white shadow-md hover:shadow-xl transition-shadow cursor-pointer rounded-2xl overflow-hidden border border-neutral-100">
                <figure>
                  <img src={car.imageUrl} alt={car.model} className="w-full h-48 object-cover" />
                </figure>
                <div className="card-body p-5">
                  <h3 className="card-title text-base">{car.model}</h3>
                  <p className="text-sm font-medium text-blue-600">${car.dailyPrice}/day</p>
                  <p className="text-xs text-neutral-500">
                    {car.availability ? <span className="text-green-600">● Available</span> : <span className="text-red-500">● Not Available</span>}
                    {" · "}{car.bookingCount} bookings
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
}
    
  
  export default RecentListings;
  