// Centralized backend base URL. The original backend's source was never committed to
// any repo and its live deployment is dead — this points to a replacement backend
// (car-rental-backend) that implements the same API surface.
export const API_BASE = import.meta.env.VITE_API_BASE || "https://car-rental-backend-one-xi.vercel.app/api";
