// Shared helpers for the car domain, so cards/details/admin all agree on
// how a car is classified, labelled and formatted.

export const LOCATIONS = ["Dhaka", "Chittagong", "Sylhet", "Cox's Bazar"];

// `offer` is an object ({title, discription}) in the seeded data but may be a
// plain string for user-added cars — normalise to a title string or null.
export function offerLabel(offer) {
  if (!offer) return null;
  if (typeof offer === "string") return offer.trim() || null;
  return offer.title || null;
}

export function offerText(offer) {
  if (!offer || typeof offer === "string") return null;
  return offer.discription || offer.description || null;
}

// Infer a vehicle class from the model + features (the demo data has no explicit type).
export function carClass(car) {
  const hay = `${car?.model || ""} ${car?.features || ""}`.toLowerCase();
  if (/electric|autopilot|tesla|charging|ev\b/.test(hay)) return "Electric";
  if (/ranger|truck|pickup|towing/.test(hay)) return "Truck";
  if (/cr-v|x-trail|sportage|4wd|suv|rav4|highlander/.test(hay)) return "SUV";
  if (/swift|compact|hatch|mini|city/.test(hay)) return "Compact";
  return "Sedan";
}

export const CLASS_META = {
  Electric: { icon: "⚡", tint: "bg-teal-50 text-teal-700 border-teal-200" },
  SUV: { icon: "🚙", tint: "bg-amber-50 text-amber-700 border-amber-200" },
  Truck: { icon: "🛻", tint: "bg-orange-50 text-orange-700 border-orange-200" },
  Compact: { icon: "🚗", tint: "bg-sky-50 text-sky-700 border-sky-200" },
  Sedan: { icon: "🚘", tint: "bg-indigo-50 text-indigo-700 border-indigo-200" },
};

export function featureList(features) {
  if (!features) return [];
  return String(features)
    .split(/[,;]/)
    .map((f) => f.trim())
    .filter(Boolean);
}

// Rough seat guess so cards can show a spec row (data has no seat count).
export function seatGuess(car) {
  const cls = carClass(car);
  if (cls === "SUV" || cls === "Truck") return 5;
  if (/x-trail|third row|7/.test(`${car?.model} ${car?.features}`.toLowerCase())) return 7;
  if (cls === "Compact") return 4;
  return 5;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function toDateStr(d) {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(
    dt.getDate()
  ).padStart(2, "0")}`;
}

export function rentalDays(start, end) {
  const days = Math.round((new Date(end) - new Date(start)) / MS_PER_DAY);
  return Math.max(1, days || 1);
}

export function bookingRange(car) {
  return car?.bookedBy?.[0]?.bookingDate?.[0] || null;
}
