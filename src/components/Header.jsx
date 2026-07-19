import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AuthContext } from "../ContextApi/Context";

const linkClass = ({ isActive }) =>
  `btn btn-ghost ${isActive ? "text-primary" : "text-base-content"}`;

const Header = () => {
  const { currentUser, SignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const navitems = (
    <>
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/available-cars" className={linkClass}>
        Available Cars
      </NavLink>
      {currentUser && (
        <>
          <NavLink to="/add-car" className={linkClass}>
            Add Car
          </NavLink>
          <NavLink to="/my-cars" className={linkClass}>
            My Cars
          </NavLink>
          <NavLink to="/my-bookings" className={linkClass}>
            My Bookings
          </NavLink>
        </>
      )}
    </>
  );
  return (

    <div className="navbar fixed z-10 bg-white/90 backdrop-blur shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navitems}
          </ul>
        </div>

        <Link
        to="/"
        className="flex items-center text-lg font-bold text-primary text-nowrap"
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
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navitems}
        </ul>
      </div>
      <div className="navbar-end">
        {currentUser ? (
          <button
            onClick={() => {
              SignOut(navigate);

            }}
            className="btn btn-primary btn-sm text-white"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={linkClass}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
