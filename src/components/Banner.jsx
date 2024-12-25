// Banner.jsx
import { Link } from 'react-router-dom';
import bgvideo from '../assets/Untitledvideo.mp4';

const Banner = () => (


<div className="relative h-auto w-full overflow-hidden">
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
      <div className=" bg-opacity-60 hero-overlay relative z-1 flex flex-col items-center justify-center h-full text-white px-8 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Drive Your Dreams Today!
        </h1>
        <p className="text-lg md:text-xl text-center max-w-lg mb-5">
        Rent a car from our extensive fleet of luxury cars. Drive your dreams today!
        </p>
        <Link to="/available-cars" className="btn btn-primary">View Available Cars</Link>
        
      </div>
    </div>

);

export default Banner;