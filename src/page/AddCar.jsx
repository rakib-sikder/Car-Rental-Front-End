// pages/AddCar.jsx
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../ContextApi/Context";

const AddCar = () => {
  const {notifys,notifye,} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    model: "",
    dailyPrice: "",
    availability: true,
    registrationNumber: "",
    features: "",
    description: "",
    imageUrl: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Car Added:", formData);

    axios.post('http://localhost:5000/addcar', formData)
    .then((response) =>{
      response.data.acknowledged && notifys("Car Added Successfully");

    })
    .catch( (error) =>{
      notifye(error);
    });

  };

  return (
    <div className="p-8 bg-base-100">
      <h2 className="text-2xl font-bold mb-4">Add a New Car</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="model"
          placeholder="Car Model"
          className="input input-bordered"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="dailyPrice"
          placeholder="Daily Rental Price"
          className="input input-bordered"
          onChange={handleChange}
          required
        />
        <select
          name="availability"
          className="select select-bordered"
          onChange={handleChange}
        >
          <option value={true}>Available</option>
          <option value={false}>Unavailable</option>
        </select>
        <input
          type="text"
          name="registrationNumber"
          placeholder="Vehicle Registration Number"
          className="input input-bordered"
          onChange={handleChange}
        />
        <textarea
          name="features"
          placeholder="Features (e.g., GPS, AC)"
          className="textarea textarea-bordered"
          onChange={handleChange}
        ></textarea>
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered"
          onChange={handleChange}
        ></textarea>
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          className="input input-bordered"
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="input input-bordered"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
