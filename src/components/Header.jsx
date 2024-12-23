import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AuthContext } from "../ContextApi/Context";

const Header = () => {
  const { currentUser ,SignOut } = useContext(AuthContext);
  const navigate=useNavigate()
  return (
    <header className="bg-base-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo and Site Name */}
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center text-lg font-bold text-primary"
          >
            <DotLottieReact
              src="https://lottie.host/6136aba0-30b3-4d88-b5ca-5fb6a5823760/ikwV6RkUa8.lottie"
              loop
              autoplay
              style={{ width: "100px", height: "50px" }}
            />
            Car Rentals
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `btn btn-ghost ${isActive ? "text-primary" : "text-base-content"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/available-cars"
            className={({ isActive }) =>
              `btn btn-ghost ${isActive ? "text-primary" : "text-base-content"}`
            }
          >
            Available Cars
          </NavLink>
          {currentUser ? (
            <>
              <NavLink
                to="/add-car"
                className={({ isActive }) =>
                  `btn btn-ghost ${
                    isActive ? "text-primary" : "text-base-content"
                  }`
                }
              >
                Add Car
              </NavLink>
              <NavLink
                to="/my-cars"
                className={({ isActive }) =>
                  `btn btn-ghost ${
                    isActive ? "text-primary" : "text-base-content"
                  }`
                }
              >
                My Cars
              </NavLink>
              <NavLink
                to="/my-bookings"
                className={({ isActive }) =>
                  `btn btn-ghost ${
                    isActive ? "text-primary" : "text-base-content"
                  }`
                }
              >
                My Bookings
              </NavLink>
              <button
                onClick={() =>{ SignOut(navigate)}}
                className="btn btn-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn btn-primary">
              Log in
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
