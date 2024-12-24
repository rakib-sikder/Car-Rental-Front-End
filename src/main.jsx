import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./page/Login";
import Register from "./page/Register";
import NotFound from "./page/NotFound";
import AvailableCars from "./page/AvailableCars";
import AddCar from "./page/AddCar";
import Home from "./page/Home";
import MyCars from "./page/MyCars";
import MyBookings from "./page/MyBookings";
import { AuthProviderAndContext } from "./ContextApi/Context";
import CarDetails from "./page/CarDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      
      {
        path: '/',
        element: <Home></Home>
        
      },
      {
        path: '/login',
        element: <Login></Login>
        
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: "/available-cars",
        element: <AvailableCars></AvailableCars>
      },
      {
        path: "/cars-details/:id",
        element: <CarDetails></CarDetails>
      },
      {
        path: "/add-car",
        element: <AddCar></AddCar>
      },
      {
        path: "/my-cars",
        element: <MyCars></MyCars>
      },
      {
        path: "/my-bookings",
        element: <MyBookings></MyBookings>
      },
    ]
  },
  {
    path: '*',
    element:<NotFound></NotFound>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviderAndContext>
    <RouterProvider router={router} />
    </AuthProviderAndContext>
  </React.StrictMode>
);
