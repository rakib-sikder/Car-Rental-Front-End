import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../ContextApi/Context";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const MyCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const { currentUser, notifys, notifye } = useContext(AuthContext);
  const [dependensi, setdependensi] = useState(true);

  useEffect(() => {
    axios
      .get(`https://car-rental-system-zeta.vercel.app/userAddedCars/${currentUser?.email}`,{withCredentials:true})
      .then((response) => {
        setCars(response?.data);
      })
      .catch((error) => {
        notifye(error);
      });
  }, [currentUser, navigate, dependensi]);

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
          .delete(`https://car-rental-system-zeta.vercel.app/cars/${id}`,{withCredentials:true})
          .then((res) => {
            setCars(cars.filter((car) => car._id !== id));
          })
          .catch((error) => {
            notifye(error);
          });
      }
    });
  };

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

  const handleupdate = (e) => {
    e.preventDefault();
    document.getElementById("my_modal_5").close();
    axios
      .put(`https://car-rental-system-zeta.vercel.app/carsupdate/${formData._id}`, formData,{withCredentials:true})
      .then((response) => {
        setdependensi(response.data.acknowledged);
        response.data.acknowledged && notifys("Car Updated Successfully");
      })
      .catch((error) => {
        notifye(error);
      });
  };

  const getupadtedid = (id) => {
    axios
      .get(`https://car-rental-system-zeta.vercel.app/cars/${id}`,{withCredentials:true})
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        notifye(error);
      });
  };

  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("-");
    return new Date(`${year}-${month}-${day}`);
  }

  const sortbyoldest = () => {
    const oldest = [...cars].sort((a, b) => parseDate(a.dateAdded) - parseDate(b.dateAdded));
    setCars(oldest);
  };

  const sortbynewest = () => {
    const newest = [...cars].sort((a, b) => parseDate(b.dateAdded) - parseDate(a.dateAdded));
    setCars(newest);
  };

  const sortbyhighprice = () => {
    const price = [...cars].sort((a, b) => b.dailyPrice - a.dailyPrice);
    setCars(price);
  };

  const sortbylowprice = () => {
    const price = [...cars].sort((a, b) => a.dailyPrice - b.dailyPrice);
    setCars(price);
  };

  return (
    <div className="p-4 sm:p-8 bg-base-100">
      <div className="flex flex-wrap justify-between items-center pt-20 mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">My Cars</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-4">
            <button onClick={sortbynewest} className="btn btn-outline btn-primary btn-sm">
              Newest
            </button>
            <button onClick={sortbyoldest} className="btn btn-outline btn-primary btn-sm">
              Oldest
            </button>
          </div>
          <div className="flex gap-4">
            <button onClick={sortbyhighprice} className="btn btn-outline btn-primary btn-sm">
              Highest
            </button>
            <button onClick={sortbylowprice} className="btn btn-outline btn-primary btn-sm">
              Lowest
            </button>
          </div>
        </div>
      </div>
      {cars.length !== 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="text-center">
              <tr>
                <th>Image</th>
                <th>Model</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Booking count</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cars?.map((car) => (
                <tr key={car._id}>
                  <td><img src={car.imageUrl} alt="" className="w-[100px] h-[50px]" /></td>
                  <td>{car.model}</td>
                  <td>${car.dailyPrice}/day</td>
                  <td>{car.availability ? "Available" : "Unavailable"}</td>
                  <td>{car.bookingCount}</td>
                  <td>{car.dateAdded}</td>
                  <td className="flex flex-col sm:flex-row justify-center gap-2">
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        document.getElementById("my_modal_5").showModal();
                        getupadtedid(car._id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1>No Cars Added Yet</h1>
          <Link to="/add-car" className="btn btn-primary">
            Add Cars
          </Link>
        </div>
      )}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleupdate} className="grid grid-cols-1 gap-4">
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
              Update
            </button>
          </form>
          <button
            onClick={() => {
              document.getElementById("my_modal_5").close();
              setdependensi(false);
            }}
            className="btn btn-error btn-block mt-1"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default MyCars;