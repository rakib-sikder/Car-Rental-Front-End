import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { AuthContext } from "../ContextApi/Context";
import { API_BASE } from "../api";
import { LogoMark } from "../components/Logo";
import {
  carClass, CLASS_META, offerLabel, bookingRange, rentalDays, toDateStr, LOCATIONS,
} from "../lib/cars";

const EMPTY = {
  model: "", dailyPrice: "", availability: true, registrationNumber: "",
  features: "", description: "", imageUrl: "", location: "Dhaka",
};

const Admin = () => {
  const { currentUser, notifys, notifye } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");
  const [editing, setEditing] = useState(null); // car object or EMPTY (new) or null (closed)

  const load = () => {
    setLoading(true);
    axios.get(`${API_BASE}/cars`).then((r) => setCars(r.data || [])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const stats = useMemo(() => {
    const available = cars.filter((c) => c.availability).length;
    const booked = cars.filter((c) => c.bookedBy?.length || !c.availability).length;
    const totalBookings = cars.reduce((s, c) => s + (c.bookingCount || 0), 0);
    const fleetValue = cars.reduce((s, c) => s + Number(c.dailyPrice || 0), 0);
    const estRevenue = cars.reduce((s, c) => s + Number(c.dailyPrice || 0) * (c.bookingCount || 0), 0);
    return { total: cars.length, available, booked, totalBookings, fleetValue, estRevenue };
  }, [cars]);

  const chartData = useMemo(
    () =>
      [...cars]
        .map((c) => ({ name: c.model.replace(/-Benz|Series/g, "").trim().slice(0, 12), revenue: (c.bookingCount || 0) * Number(c.dailyPrice || 0) }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 8),
    [cars]
  );

  const bookings = useMemo(() => cars.filter((c) => c.bookedBy?.length), [cars]);

  const remove = (id) => {
    if (!window.confirm("Delete this car from the fleet?")) return;
    axios.delete(`${API_BASE}/cars/${id}`, { withCredentials: true })
      .then(() => { notifys("Car deleted"); setCars((cs) => cs.filter((c) => c._id !== id)); })
      .catch(() => notifye("Delete failed"));
  };

  const save = (form) => {
    if (form._id) {
      axios.put(`${API_BASE}/carsupdate/${form._id}`, form, { withCredentials: true })
        .then(() => { notifys("Car updated"); setEditing(null); load(); })
        .catch(() => notifye("Update failed"));
    } else {
      const payload = {
        ...form,
        offer: {},
        addedBy: currentUser?.email || "admin@overdrive.demo",
        dateAdded: toDateStr(new Date()),
        bookingCount: 0,
      };
      axios.post(`${API_BASE}/addcar`, payload, { withCredentials: true })
        .then(() => { notifys("Car added to fleet"); setEditing(null); load(); })
        .catch(() => notifye("Add failed"));
    }
  };

  return (
    <div className="min-h-screen bg-base-200 pt-16">
      {/* admin topbar */}
      <div className="bg-ink text-white">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <h1 className="font-display text-lg font-bold">Fleet admin</h1>
              <p className="text-xs text-white/50">Overdrive control panel · demo (no auth required)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setEditing({ ...EMPTY })} className="btn btn-primary btn-sm">
              + Add car
            </button>
            <Link to="/" className="btn btn-ghost btn-sm text-white/80 hover:bg-white/10">
              View site ↗
            </Link>
          </div>
        </div>
        {/* tabs */}
        <div className="container-x">
          <div className="flex gap-1">
            {["overview", "fleet", "bookings"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative px-4 py-3 text-sm font-medium capitalize transition-colors ${
                  tab === t ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {t}
                {t === "bookings" && bookings.length > 0 && (
                  <span className="ml-1.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-content">
                    {bookings.length}
                  </span>
                )}
                {tab === t && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x py-8">
        {loading ? (
          <div className="grid place-items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : tab === "overview" ? (
          <Overview stats={stats} chartData={chartData} bookings={bookings} />
        ) : tab === "fleet" ? (
          <Fleet cars={cars} onEdit={setEditing} onDelete={remove} onAdd={() => setEditing({ ...EMPTY })} />
        ) : (
          <Bookings bookings={bookings} />
        )}
      </div>

      {editing && <CarModal initial={editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
};

/* ---------- Overview ---------- */
function Overview({ stats, chartData, bookings }) {
  const cards = [
    { label: "Cars in fleet", value: stats.total, icon: "🚗", tint: "text-primary" },
    { label: "Available now", value: stats.available, icon: "✅", tint: "text-success" },
    { label: "Currently booked", value: stats.booked, icon: "🔑", tint: "text-warning" },
    { label: "Lifetime bookings", value: stats.totalBookings, icon: "📈", tint: "text-info" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-base-300 bg-base-100 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-base-content/60">{c.label}</span>
              <span className="text-xl">{c.icon}</span>
            </div>
            <p className={`mt-2 font-display text-3xl font-extrabold ${c.tint}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display font-bold">Estimated revenue by car</h2>
            <span className="text-xs text-base-content/50">bookings × daily rate</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE8E2" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#8a8578" }} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 11, fill: "#8a8578" }} />
                <Tooltip
                  cursor={{ fill: "rgba(255,90,31,0.06)" }}
                  contentStyle={{ borderRadius: 12, border: "1px solid #EAE8E2", fontSize: 13 }}
                  formatter={(v) => [`$${v}`, "Revenue"]}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={30}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "#FF5A1F" : "#FFB79A"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <p className="text-sm text-base-content/60">Estimated lifetime revenue</p>
            <p className="mt-1 font-display text-4xl font-extrabold text-primary">${stats.estRevenue.toLocaleString()}</p>
            <p className="mt-1 text-xs text-base-content/50">Fleet day-value ${stats.fleetValue}/day combined</p>
          </div>
          <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <h3 className="mb-3 font-display font-bold">Active bookings</h3>
            {bookings.length === 0 ? (
              <p className="text-sm text-base-content/50">No active bookings right now.</p>
            ) : (
              <ul className="space-y-3">
                {bookings.slice(0, 4).map((b) => {
                  const r = bookingRange(b);
                  return (
                    <li key={b._id} className="flex items-center gap-3">
                      <img src={b.imageUrl} alt="" className="h-10 w-14 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{b.model}</p>
                        <p className="truncate text-xs text-base-content/50">{b.bookedBy[0]?.email}</p>
                      </div>
                      <span className="text-xs text-base-content/50">{r?.start}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Fleet ---------- */
function Fleet({ cars, onEdit, onDelete, onAdd }) {
  const [q, setQ] = useState("");
  const filtered = cars.filter((c) => c.model.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 p-5">
        <h2 className="font-display font-bold">Fleet ({cars.length})</h2>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search model…"
            className="input input-bordered input-sm w-40 sm:w-56"
          />
          <button onClick={onAdd} className="btn btn-primary btn-sm">+ Add car</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-base-content/50">
              <th>Car</th><th>Class</th><th>Location</th><th>Price</th>
              <th>Status</th><th>Bookings</th><th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const cls = carClass(c);
              return (
                <tr key={c._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={c.imageUrl} alt="" className="h-10 w-16 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium">{c.model}</p>
                        {offerLabel(c.offer) && <span className="text-xs text-primary">🏷 {offerLabel(c.offer)}</span>}
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-sm border">{CLASS_META[cls].icon} {cls}</span></td>
                  <td className="text-sm">{c.location}</td>
                  <td className="font-medium">${c.dailyPrice}</td>
                  <td>
                    {c.availability
                      ? <span className="badge badge-success badge-sm text-success-content">Available</span>
                      : <span className="badge badge-sm">Booked</span>}
                  </td>
                  <td className="text-sm">{c.bookingCount ?? 0}</td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button onClick={() => onEdit(c)} className="btn btn-ghost btn-xs">Edit</button>
                      <button onClick={() => onDelete(c._id)} className="btn btn-ghost btn-xs text-error">Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-base-content/50">No cars match “{q}”.</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Bookings ---------- */
function Bookings({ bookings }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 py-20 text-center">
        <p className="text-4xl">🗓️</p>
        <p className="mt-3 font-display font-bold">No active bookings</p>
        <p className="mt-1 text-sm text-base-content/50">Bookings made from the site appear here.</p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
      <table className="table">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-base-content/50">
            <th>Car</th><th>Renter</th><th>Pickup</th><th>Return</th><th>Days</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => {
            const r = bookingRange(b);
            const days = r ? rentalDays(r.start, r.end) : 1;
            return (
              <tr key={b._id} className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <img src={b.imageUrl} alt="" className="h-10 w-16 rounded-lg object-cover" />
                    <span className="font-medium">{b.model}</span>
                  </div>
                </td>
                <td>
                  <p className="text-sm font-medium">{b.bookedBy[0]?.name || "Guest"}</p>
                  <p className="text-xs text-base-content/50">{b.bookedBy[0]?.email}</p>
                </td>
                <td className="text-sm">{r?.start || "—"}</td>
                <td className="text-sm">{r?.end || "—"}</td>
                <td className="text-sm">{days}</td>
                <td className="font-display font-bold text-primary">${b.dailyPrice * days}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Add / Edit modal ---------- */
function CarModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const isEdit = !!form._id;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h3 className="font-display text-lg font-bold">{isEdit ? "Edit car" : "Add a car"}</h3>
        <form
          onSubmit={(e) => { e.preventDefault(); onSave(form); }}
          className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <Field label="Model" className="sm:col-span-2">
            <input required value={form.model} onChange={set("model")} className="input input-bordered w-full" placeholder="Toyota Corolla" />
          </Field>
          <Field label="Daily price ($)">
            <input required type="number" min="1" value={form.dailyPrice} onChange={set("dailyPrice")} className="input input-bordered w-full" />
          </Field>
          <Field label="Location">
            <select value={form.location} onChange={set("location")} className="select select-bordered w-full">
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </Field>
          <Field label="Registration">
            <input required value={form.registrationNumber} onChange={set("registrationNumber")} className="input input-bordered w-full" placeholder="DHA-1234" />
          </Field>
          <Field label="Availability">
            <select value={String(form.availability)} onChange={(e) => setForm({ ...form, availability: e.target.value === "true" })} className="select select-bordered w-full">
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </Field>
          <Field label="Image URL" className="sm:col-span-2">
            <input required type="url" value={form.imageUrl} onChange={set("imageUrl")} className="input input-bordered w-full" placeholder="https://…" />
          </Field>
          <Field label="Features (comma-separated)" className="sm:col-span-2">
            <input required value={form.features} onChange={set("features")} className="input input-bordered w-full" placeholder="AC, Bluetooth, GPS" />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <textarea required value={form.description} onChange={set("description")} rows={2} className="textarea textarea-bordered w-full" />
          </Field>
          <div className="modal-action sm:col-span-2 mt-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
            <button type="submit" className="btn btn-primary">{isEdit ? "Save changes" : "Add car"}</button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/40" onClick={onClose} />
    </div>
  );
}

function Field({ label, className = "", children }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-base-content/50">{label}</span>
      {children}
    </label>
  );
}

export default Admin;
