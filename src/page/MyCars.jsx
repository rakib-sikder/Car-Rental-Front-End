import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../ContextApi/Context";
import { API_BASE } from "../api";
import { PageHeader } from "../components/PageHeader";
import { carClass, CLASS_META, LOCATIONS } from "../lib/cars";

const MyCars = () => {
  const { currentUser, notifys, notifye } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("newest");
  const [editing, setEditing] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!currentUser?.email) return;
    axios
      .get(`${API_BASE}/userAddedCars/${currentUser.email}`, { withCredentials: true })
      .then((res) => setCars(res.data || []))
      .catch(() => notifye("Could not load your cars"))
      .finally(() => setLoading(false));
  }, [currentUser, refresh]);

  const sorted = [...cars].sort((a, b) => {
    if (sort === "price-high") return b.dailyPrice - a.dailyPrice;
    if (sort === "price-low") return a.dailyPrice - b.dailyPrice;
    if (sort === "oldest") return new Date(a.dateAdded) - new Date(b.dateAdded);
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this car?",
      text: "This removes it from the fleet permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF5A1F",
      cancelButtonColor: "#71717a",
      confirmButtonText: "Yes, delete",
    }).then((r) => {
      if (r.isConfirmed) {
        axios
          .delete(`${API_BASE}/cars/${id}`, { withCredentials: true })
          .then(() => {
            setCars((cs) => cs.filter((c) => c._id !== id));
            Swal.fire({ title: "Deleted", icon: "success", timer: 1200, showConfirmButton: false });
          })
          .catch(() => notifye("Delete failed"));
      }
    });
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_BASE}/carsupdate/${editing._id}`, editing, { withCredentials: true })
      .then(() => {
        notifys("Car updated");
        setEditing(null);
        setRefresh((n) => n + 1);
      })
      .catch(() => notifye("Update failed"));
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <PageHeader eyebrow="Your garage" title="My cars" subtitle="Manage the cars you've listed on Overdrive." />
      <div className="container-x py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-base-content/60">
            <span className="font-semibold text-base-content">{cars.length}</span> car{cars.length === 1 ? "" : "s"} listed
          </p>
          <div className="flex gap-2">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered select-sm">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-high">Price: high to low</option>
              <option value="price-low">Price: low to high</option>
            </select>
            <Link to="/add-car" className="btn btn-primary btn-sm">+ Add car</Link>
          </div>
        </div>

        {loading ? (
          <div className="grid place-items-center py-20"><span className="loading loading-spinner loading-lg text-primary" /></div>
        ) : cars.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 py-20 text-center">
            <p className="text-4xl">🚗</p>
            <p className="mt-3 font-display font-bold">No cars listed yet</p>
            <p className="mt-1 text-sm text-base-content/60">List your first car and start earning.</p>
            <Link to="/add-car" className="btn btn-primary btn-sm mt-5">Add a car</Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
            <table className="table">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-base-content/50">
                  <th>Car</th><th>Class</th><th>Price</th><th>Status</th><th>Bookings</th><th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((car) => {
                  const cls = carClass(car);
                  return (
                    <tr key={car._id} className="hover">
                      <td>
                        <div className="flex items-center gap-3">
                          <img src={car.imageUrl} alt="" className="h-10 w-16 rounded-lg object-cover" />
                          <div>
                            <p className="font-medium">{car.model}</p>
                            <p className="text-xs text-base-content/50">{car.location}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-sm border">{CLASS_META[cls].icon} {cls}</span></td>
                      <td className="font-medium">${car.dailyPrice}/day</td>
                      <td>
                        {car.availability
                          ? <span className="badge badge-success badge-sm text-success-content">Available</span>
                          : <span className="badge badge-sm">Booked</span>}
                      </td>
                      <td className="text-sm">{car.bookingCount ?? 0}</td>
                      <td>
                        <div className="flex justify-end gap-1">
                          <button onClick={() => setEditing(car)} className="btn btn-ghost btn-xs">Edit</button>
                          <button onClick={() => handleDelete(car._id)} className="btn btn-ghost btn-xs text-error">Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-display text-lg font-bold">Edit car</h3>
            <form onSubmit={saveEdit} className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input value={editing.model} onChange={(e) => setEditing({ ...editing, model: e.target.value })} placeholder="Model" className="input input-bordered sm:col-span-2" required />
              <input type="number" value={editing.dailyPrice} onChange={(e) => setEditing({ ...editing, dailyPrice: e.target.value })} placeholder="Daily price" className="input input-bordered" required />
              <select value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="select select-bordered">
                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
              </select>
              <input value={editing.registrationNumber} onChange={(e) => setEditing({ ...editing, registrationNumber: e.target.value })} placeholder="Registration" className="input input-bordered" required />
              <select value={String(editing.availability)} onChange={(e) => setEditing({ ...editing, availability: e.target.value === "true" })} className="select select-bordered">
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
              <input value={editing.imageUrl} onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })} placeholder="Image URL" className="input input-bordered sm:col-span-2" required />
              <input value={editing.features} onChange={(e) => setEditing({ ...editing, features: e.target.value })} placeholder="Features" className="input input-bordered sm:col-span-2" required />
              <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Description" rows={2} className="textarea textarea-bordered sm:col-span-2" required />
              <div className="modal-action sm:col-span-2">
                <button type="button" onClick={() => setEditing(null)} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={() => setEditing(null)} />
        </div>
      )}
    </div>
  );
};

export default MyCars;
