import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/Context";
import { API_BASE } from "../api";
import { PageHeader } from "../components/PageHeader";
import { LOCATIONS, toDateStr } from "../lib/cars";

const AddCar = () => {
  const { notifys, notifye, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    model: "", dailyPrice: "", availability: true, registrationNumber: "",
    features: "", description: "", imageUrl: "", location: "Dhaka",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...form,
      availability: form.availability === "false" ? false : true,
      offer: {},
      addedBy: currentUser?.email,
      dateAdded: toDateStr(new Date()),
      bookingCount: 0,
    };
    axios
      .post(`${API_BASE}/addcar`, payload, { withCredentials: true })
      .then(() => {
        notifys("Car added to the fleet!");
        navigate("/my-cars");
      })
      .catch(() => notifye("Could not add the car"))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <PageHeader eyebrow="List a car" title="Add a car to the fleet" subtitle="Fill in the details below — your car goes live immediately." />
      <div className="container-x py-10">
        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1fr_320px]">
          <form onSubmit={submit} className="rounded-2xl border border-base-300 bg-base-100 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Car model" full>
                <input required value={form.model} onChange={set("model")} placeholder="Toyota Corolla" className="input input-bordered w-full" />
              </Field>
              <Field label="Daily price ($)">
                <input required type="number" min="1" value={form.dailyPrice} onChange={set("dailyPrice")} placeholder="45" className="input input-bordered w-full" />
              </Field>
              <Field label="Location">
                <select value={form.location} onChange={set("location")} className="select select-bordered w-full">
                  {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Registration number">
                <input required value={form.registrationNumber} onChange={set("registrationNumber")} placeholder="DHA-1234" className="input input-bordered w-full" />
              </Field>
              <Field label="Availability">
                <select value={String(form.availability)} onChange={set("availability")} className="select select-bordered w-full">
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
              </Field>
              <Field label="Image URL" full>
                <input required type="url" value={form.imageUrl} onChange={set("imageUrl")} placeholder="https://…" className="input input-bordered w-full" />
              </Field>
              <Field label="Features (comma-separated)" full>
                <input required value={form.features} onChange={set("features")} placeholder="AC, Bluetooth, GPS, Sunroof" className="input input-bordered w-full" />
              </Field>
              <Field label="Description" full>
                <textarea required rows={3} value={form.description} onChange={set("description")} placeholder="Tell renters what makes this car great…" className="textarea textarea-bordered w-full" />
              </Field>
            </div>
            <button disabled={submitting} className="btn btn-primary mt-6 w-full sm:w-auto">
              {submitting ? "Adding…" : "Add car to fleet"}
            </button>
          </form>

          <aside className="rounded-2xl border border-base-300 bg-base-100 p-6 lg:sticky lg:top-24 lg:self-start">
            <h3 className="font-display font-bold">Tips for a great listing</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-base-content/70">
              <li className="flex gap-2"><span className="text-primary">✓</span> Use a clear, well-lit photo of the actual car.</li>
              <li className="flex gap-2"><span className="text-primary">✓</span> List real features — renters filter by them.</li>
              <li className="flex gap-2"><span className="text-primary">✓</span> Price competitively for your car's class.</li>
              <li className="flex gap-2"><span className="text-primary">✓</span> Keep availability accurate to avoid clashes.</li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

function Field({ label, full, children }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-base-content/50">{label}</span>
      {children}
    </label>
  );
}

export default AddCar;
