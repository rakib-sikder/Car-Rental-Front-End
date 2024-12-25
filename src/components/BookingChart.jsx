import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BookingChart = ({ bookings }) => {
  const chartData = bookings?.map((booking) => ({
    model: booking.model,
    dailyPrice: booking.dailyPrice,
  }));

  return (
    <div className="p-8 bg-base-100">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
        Daily Rental Prices of Cars
      </h2>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="model" />
            <YAxis  />
            <Tooltip />
            <Bar dataKey="dailyPrice" fill="#8884d8" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingChart;
