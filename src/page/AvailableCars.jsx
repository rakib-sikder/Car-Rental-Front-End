// AvailableCars 
import { useState } from "react";


const AvailableCars = ({ cars }) => {
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Cars</h2>
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="btn btn-outline btn-primary"
        >
          Toggle {viewMode === "grid" ? "List" : "Grid"} View
        </button>
      </div>
      <div className={`grid ${viewMode === "grid" ? "grid-cols-3 gap-6" : "grid-cols-1 gap-4"}`}>
        {/* {cars.map((car, idx) => (
          <div key={idx} className="card bg-base-200 shadow-md">
            <figure>
              <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{car.model}</h3>
              <p className="text-sm">Price: ${car.dailyPrice}/day</p>
              <button className="btn btn-primary">Book Now</button>
            </div>
          </div>
        ))} */}

        hello cars
      </div>
    </div>
  );
};

export default AvailableCars;
