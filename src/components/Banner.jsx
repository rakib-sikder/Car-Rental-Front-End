import { Link } from "react-router-dom";

// Banner.jsx
const Banner = () => (
    <div className="hero bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Drive Your Dreams Today!</h1>
          <p className="mb-5">
            Rent a car from our extensive fleet of luxury cars. Drive your dreams today!</p>
            <Link to="/available-cars"className="btn btn-primary">View Available Cars</Link>
        </div>
      </div>
    </div>
  );
  
  export default Banner;
  