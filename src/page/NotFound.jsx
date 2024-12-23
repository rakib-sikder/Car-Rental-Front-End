import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="hero min-h-screen bg-base-200 text-center">
    <div className="hero-content">
      <div>
      <DotLottieReact
      src="https://lottie.host/97df0cc8-fa11-4ee4-b719-a8ee417919d1/5LeHckHOXM.lottie"
      loop
      style={{ width: "500px", height: "500px" }}
      autoplay
    />
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  </div>
);

export default NotFound;
