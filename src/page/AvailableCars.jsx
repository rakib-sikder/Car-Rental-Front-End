
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


const AvailableCars = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [priceSort, setPriceSort] = useState(true);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  console.log(filteredCars);

  
  useEffect(() => {

    axios.get('http://localhost:5000/cars')
    .then((response) =>{
      setCars(response.data);
    })
  },[]);

  const handleSearchChange = (e) => {
    e.preventDefault();
     const value = e.target.search.value;
    setFilteredCars(cars?.filter(
    (car) =>  car?.description?.toLowerCase()?.includes(value.toLowerCase())||
    car?.model?.toLowerCase()?.includes(value.toLowerCase())||
    car?.location?.toLowerCase()?.includes(value.toLowerCase())||
    car?.dailyPrice?.toString()?.toLowerCase()?.includes(value.toLowerCase())||
    car?.features?.toLowerCase()?.includes(value.toLowerCase())
    ))
    if (value.length>0) {
      setCars(filteredCars);}
    else{
      axios.get('http://localhost:5000/cars')
        .then((response) =>{
          setCars(response.data);
        })
    }
  }





  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Available Cars</h2>
        <div>
          {/* sort by price  */}
          <button
          onClick={() => {setPriceSort(!priceSort), setCars(cars.sort((a, b) => (priceSort ? a.dailyPrice - b.dailyPrice : b.dailyPrice - a.dailyPrice)))}}
          className="btn btn-outline btn-primary mr-2">
            {priceSort ? "Lowest price" : "Highest Price"}
          </button>
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="btn btn-outline btn-primary"
        >
           {viewMode === "grid" ? "List" : "Grid"} View
        </button>
        </div>
      </div>
      <div className="mb-6">
      <form onSubmit={handleSearchChange} className="flex justify-end items-end">
        
        <div className="form-control ">
          <input type="text" name="search" placeholder="search" className="input input-bordered rounded-r-none" />
        </div>
        <div className="form-control  mt-6">
          <button className="btn rounded-l-none btn-primary">Search</button>
        </div>
      </form>
      </div>
      <div className={`grid ${viewMode === "grid" ? "grid-cols-3 gap-6" : "grid-cols-1 gap-4"}`}>
        {cars.map((car, idx) => (
          <div key={idx} className="card bg-base-200 shadow-md">
            <figure>
              <img src={car.imageUrl} alt={car.model} className="w-full h-56 object-cover items-center" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{car.model}</h3>
              <p className="text-sm">Price: ${car.dailyPrice}/day</p>
              <Link to={`/cars-details/${car._id}`} className="btn btn-primary mt-4">Book Now</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
