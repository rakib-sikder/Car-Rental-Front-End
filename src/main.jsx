import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import AvailableCars from "./page/AvailableCars";
import CarDetails from "./page/CarDetails";
import AddCar from "./page/AddCar";
import MyCars from "./page/MyCars";
import MyBookings from "./page/MyBookings";
import Admin from "./page/Admin";
import About from "./page/About";
import Contact from "./page/Contact";
import HowItWorksPage from "./page/HowItWorksPage";
import NotFound from "./page/NotFound";
import PrivateRoute from "./page/PrivateRoute";
import { AuthProviderAndContext } from "./ContextApi/Context";
import { ErrorBoundary } from "./ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/available-cars", element: <AvailableCars /> },
      { path: "/cars-details/:id", element: <CarDetails /> },
      { path: "/how-it-works", element: <HowItWorksPage /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      // Public demo admin panel (auth is unavailable on this deployment).
      { path: "/admin", element: <Admin /> },
      { path: "/add-car", element: <PrivateRoute><AddCar /></PrivateRoute> },
      { path: "/my-cars", element: <PrivateRoute><MyCars /></PrivateRoute> },
      { path: "/my-bookings", element: <PrivateRoute><MyBookings /></PrivateRoute> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProviderAndContext>
        <RouterProvider router={router} />
      </AuthProviderAndContext>
    </ErrorBoundary>
  </React.StrictMode>
);
