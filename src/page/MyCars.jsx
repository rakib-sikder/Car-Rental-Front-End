// pages/MyCars.jsx
import { useState } from "react";

const MyCars = () => {
  const [cars, setCars] = useState([
    // Example cars
    { id: 1, model: "Toyota Corolla", dailyPrice: 40, availability: true },
  ]);

  const handleDelete = (id) => {
    setCars(cars.filter((car) => car.id !== id));
    console.log("Car Deleted:", id);
  };

  return (
    <div className="p-8 bg-base-100">
      <h2 className="text-2xl font-bold mb-4">My Cars</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Model</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.model}</td>
              <td>${car.dailyPrice}/day</td>
              <td>{car.availability ? "Available" : "Unavailable"}</td>
              <td>
                <button onClick={() => handleDelete(car.id)} className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default MyCars;
