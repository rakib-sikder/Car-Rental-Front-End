// Banner.jsx
import { Link } from 'react-router-dom';
import bgvideo from '../assets/Untitledvideo.mp4';

const Banner = () => (


<div className="relative  h-[400px] w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={bgvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-8 py-16 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-blue-300 mb-3">Premium Fleet, Fair Prices</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Drive Your Dreams Today!
        </h1>
        <p className="text-lg md:text-xl max-w-lg mb-6 text-neutral-200">
        Rent a car from our extensive fleet of luxury cars. Drive your dreams today!
        </p>
        <Link to="/available-cars" className="btn btn-primary rounded-full px-8">View Available Cars</Link>

      </div>
    </div>

);

export default Banner;