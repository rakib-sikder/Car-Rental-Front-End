import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AuthContext } from "../ContextApi/Context";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  console.log(showMenu);

  const { currentUser, SignOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const navitems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `btn btn-ghost ${isActive ? `text-primary ${setShowMenu(true)}` : `text-base-content ${setShowMenu(false)}`} `
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/available-cars"
        className={({ isActive }) =>
          `btn btn-ghost ${isActive ? "text-primary" : `${showMenu? "text-white" : "text-base-content"}`}`
        }
      >
        Available Cars
      </NavLink>
      {currentUser ? (
        <>
          <NavLink
            to="/add-car"
            className={({ isActive }) =>
              `btn btn-ghost ${isActive ? "text-primary" : `${showMenu? "text-white" : "text-base-content"}`}`
            }
          >
            Add Car
          </NavLink>
          <NavLink
            to="/my-cars"
            className={({ isActive }) =>
              `btn btn-ghost ${isActive ? "text-primary" : `${showMenu? "text-white" : "text-base-content"}`}`
            }
          >
            My Cars
          </NavLink>
          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              `btn btn-ghost ${isActive ? "text-primary" : `${showMenu? "text-white" : "text-base-content"}`}`
            }
          >
            My Bookings
          </NavLink>
        </>
      ) : (
        <></>
      )}
    </>
  );
  return (

    <div className={`navbar fixed z-10 ${showMenu ? "bg-transparent  backdrop-blur-lg" : "bg-white"}`}>
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
          <NavLink
            onClick={() => {
              SignOut(navigate);
              
            }}
            className={({ isActive }) =>
              `btn btn-primary btn-sm ${isActive ? "text-white" : "text-base-content"}`
            }
          >
            Logout
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `btn btn-ghost ${isActive ? "text-primary" : "text-base-content"}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `btn btn-ghost ${isActive ? "text-primary" : "text-base-content"}`
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
