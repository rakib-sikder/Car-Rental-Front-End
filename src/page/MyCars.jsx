// pages/MyCars.jsx
import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../ContextApi/Context";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";


const MyCars = () => {
  const { navigate } = useNavigate();
  const [cars, setCars] = useState([]);
  const { currentUser, notifys,notifye } = useContext(AuthContext);
  const [ dependensi, setdependensi ] = useState(true);

  // get user added cars
  useEffect(() => {
    axios
      .get(`http://localhost:5000/userAddedCars/${currentUser?.email}`)
      .then((response) => {
        setCars(response?.data);
      })
      .catch((error) => {
        notifye(error);
      });
      // set some dependency for refresh
  }, [currentUser, navigate,dependensi]);


  // click on delete button to delete car
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this review?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        axios
          .delete(`http://localhost:5000/cars/${id}`)
          .then((res) => {
            setCars(cars.filter((car) => car._id !== id));
          })
          .catch((error) => {
            notifye(error);
          });
      }
    });
  };

  // update car details 
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
  // type to change the value of input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
  };
  
  // update car details on click of update button
  const handleupdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/carsupdate/${formData._id}`, formData)
      .then((response) => {
        setdependensi(response.data.acknowledged);
        response.data.acknowledged && notifys("Car Updated Successfully");
        
      })
      .catch((error) => {
        notifye(error)})

    
  };

  // get spacefic car details to update
  const getupadtedid = (id) => {
    axios
      .get(`http://localhost:5000/cars/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        notifye(error);
      });
  };
  return (
    <div className="p-8 bg-base-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Cars</h2>
        <button className="btn btn-outline btn-primary">View</button>
      </div>
      {cars.length !== 0 ? (
        <table className="table w-full">
          <thead className="text-center">
            <tr>
              <th>Image</th>
              <th>Model</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Date</th>
              <th>Actions Button</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {cars?.map((car) => (
              <tr key={car._id}>
                <td>{car.imageUrl}</td>
                <td>{car.model}</td>
                <td>${car.dailyPrice}/day</td>
                <td>{car.availability ? "Available" : "Unavailable"}</td>
                <td>{car.date}</td>
                <td className="flex justify-center">
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                  
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                    {
                      document.getElementById("my_modal_5").showModal();
                      getupadtedid(car._id);
                    }}
                  >
                    Updated
                  </button>
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <form
                        onSubmit={handleupdate}
                        className="grid grid-cols-1 gap-4"
                      >
                        <input
                          type="text"
                          name="model"
                          placeholder="Car Model"
                          className="input input-bordered"
                          onChange={handleChange}
                          value={formData.model}
                          required
                        />
                        <input
                          type="number"
                          name="dailyPrice"
                          placeholder="Daily Rental Price"
                          className="input input-bordered"
                          onChange={handleChange}
                          required
                          value={formData.dailyPrice}
                        />
                        <select
                          name="availability"
                          className="select select-bordered"
                          onChange={handleChange}
                          required
                          value={formData.availability}
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
                          required
                          value={formData.registrationNumber}
                        />
                        <textarea
                          name="features"
                          placeholder="Features (e.g., GPS, AC)"
                          className="textarea textarea-bordered"
                          onChange={handleChange}
                          required
                          value={formData.features}
                        ></textarea>
                        <textarea
                          name="description"
                          placeholder="Description"
                          className="textarea textarea-bordered"
                          onChange={handleChange}
                          required
                          value={formData.description}
                        ></textarea>
                        <input
                          type="url"
                          name="imageUrl"
                          placeholder="Image URL"
                          className="input input-bordered"
                          onChange={handleChange}
                          required
                          value={formData.imageUrl}
                        />
                        <input
                          type="text"
                          name="location"
                          placeholder="Location"
                          className="input input-bordered"
                          onChange={handleChange}
                          required
                          value={formData.location}
                        />
                        <button type="submit" className="btn btn-primary">
                          update
                        </button>
                      </form>
                      <button
                        onClick={() =>
                        {
                          document.getElementById("my_modal_5").close(),
                         setdependensi(false);}
                        }
                        className="btn btn-error btn-block"
                      >
                        {" "}
                        cancle
                      </button>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <div className="flex flex-col gap-4 justify-center items-center">
            <h1>No Cars Added Yet</h1>
            <Link to="/add-car" className="btn btn-primary ">
              Add Cars
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MyCars;
