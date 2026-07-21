import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../ContextApi/Context";
import { API_BASE } from "../api";
import { PageHeader } from "../components/PageHeader";
import { bookingRange, rentalDays, toDateStr } from "../lib/cars";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const MyBookings = () => {
  const { currentUser, notifys, notifye } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [modify, setModify] = useState(null); // booking being modified
  const [dates, setDates] = useState({ start: new Date(), end: new Date() });

  useEffect(() => {
    if (!currentUser?.email) return;
    axios
      .get(`${API_BASE}/bookedcar/${currentUser.email}`, { withCredentials: true })
      .then((res) => setBookings(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [currentUser, refresh]);

  const openModify = (b) => {
    const r = bookingRange(b);
    setDates({ start: new Date(r?.start || Date.now()), end: new Date(r?.end || Date.now()) });
    setModify(b);
  };

  const confirmModify = () => {
    if (dates.end <= dates.start) {
      notifye("Return must be after pickup");
      return;
    }
    const saved = { start: toDateStr(dates.start), end: toDateStr(dates.end) };
    axios
      .put(`${API_BASE}/carsupdate/${modify._id}`, {
        bookedBy: [{ ...modify.bookedBy[0], bookingDate: [saved] }],
      }, { withCredentials: true })
      .then(() => {
        notifys("Booking dates updated");
        setModify(null);
        setRefresh((n) => n + 1);
      })
      .catch(() => notifye("Update failed"));
  };

  const cancel = (b) => {
    if (!window.confirm("Cancel this booking?")) return;
    // Free the car back up: clear the renter and mark available again.
    axios
      .put(`${API_BASE}/carsupdate/${b._id}`, {
        availability: true,
        bookedBy: [],
        bookingCount: Math.max(0, (b.bookingCount || 1) - 1),
      }, { withCredentials: true })
      .then(() => {
        notifys("Booking cancelled");
        setBookings((bs) => bs.filter((x) => x._id !== b._id));
      })
      .catch(() => notifye("Cancel failed"));
  };

  const status = (b) => {
    const r = bookingRange(b);
    if (!r) return { label: "Confirmed", cls: "text-success" };
    const now = new Date();
    if (now < new Date(r.start)) return { label: "Upcoming", cls: "text-warning" };
    if (now <= new Date(r.end)) return { label: "Active", cls: "text-success" };
    return { label: "Completed", cls: "text-base-content/40" };
  };

  const grandTotal = bookings.reduce((s, b) => {
    const r = bookingRange(b);
    return s + b.dailyPrice * (r ? rentalDays(r.start, r.end) : 1);
  }, 0);

  return (
    <div className="bg-base-200 min-h-screen">
      <PageHeader eyebrow="Your trips" title="My bookings" subtitle="View, modify, or cancel the cars you've booked." />
      <div className="container-x py-10">
        {loading ? (
          <div className="grid place-items-center py-20"><span className="loading loading-spinner loading-lg text-primary" /></div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 py-20 text-center">
            <p className="text-4xl">🗓️</p>
            <p className="mt-3 font-display font-bold">No bookings yet</p>
            <p className="mt-1 text-sm text-base-content/60">Find a car and book your first trip.</p>
            <Link to="/available-cars" className="btn btn-primary btn-sm mt-5">Browse cars</Link>
          </div>
        ) : (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <SummaryCard label="Active bookings" value={bookings.length} />
              <SummaryCard label="Total spend" value={`$${grandTotal}`} accent />
              <SummaryCard label="Cities visited" value={new Set(bookings.map((b) => b.location)).size} />
            </div>

            <div className="grid gap-4">
              {bookings.map((b) => {
                const r = bookingRange(b);
                const days = r ? rentalDays(r.start, r.end) : 1;
                const st = status(b);
                return (
                  <div key={b._id} className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
                    <img src={b.imageUrl} alt={b.model} className="h-28 w-full rounded-xl object-cover sm:h-20 sm:w-32" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold">{b.model}</h3>
                        <span className={`text-xs font-semibold ${st.cls}`}>● {st.label}</span>
                      </div>
                      <p className="text-sm text-base-content/60">📍 {b.location}</p>
                      <p className="mt-1 text-sm text-base-content/60">
                        {r ? `${r.start} → ${r.end}` : "—"} · {days} {days === 1 ? "day" : "days"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl font-extrabold text-primary">${b.dailyPrice * days}</p>
                      <p className="text-xs text-base-content/50">${b.dailyPrice}/day</p>
                    </div>
                    <div className="flex gap-2 sm:flex-col">
                      <button onClick={() => openModify(b)} className="btn btn-outline btn-sm">Modify</button>
                      <button onClick={() => cancel(b)} className="btn btn-ghost btn-sm text-error">Cancel</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {modify && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-display text-lg font-bold">Modify booking dates</h3>
            <p className="mt-1 text-sm text-base-content/60">{modify.model}</p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-base-content/50">Pickup</label>
                <DatePicker
                  selected={dates.start}
                  onChange={(d) => {
                    const next = { ...dates, start: d };
                    if (next.end <= d) { const e = new Date(d); e.setDate(e.getDate() + 1); next.end = e; }
                    setDates(next);
                  }}
                  minDate={new Date()}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-base-content/50">Return</label>
                <DatePicker
                  selected={dates.end}
                  onChange={(d) => setDates({ ...dates, end: d })}
                  minDate={(() => { const d = new Date(dates.start); d.setDate(d.getDate() + 1); return d; })()}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="rounded-xl bg-base-200 p-3 text-sm">
                New total:{" "}
                <span className="font-display font-extrabold text-primary">
                  ${modify.dailyPrice * Math.max(1, Math.round((dates.end - dates.start) / MS_PER_DAY))}
                </span>
              </div>
            </div>
            <div className="modal-action">
              <button onClick={() => setModify(null)} className="btn btn-ghost">Cancel</button>
              <button onClick={confirmModify} className="btn btn-primary">Save dates</button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={() => setModify(null)} />
        </div>
      )}
    </div>
  );
};

function SummaryCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
      <p className="text-sm text-base-content/60">{label}</p>
      <p className={`mt-1 font-display text-3xl font-extrabold ${accent ? "text-primary" : ""}`}>{value}</p>
    </div>
  );
}

export default MyBookings;
