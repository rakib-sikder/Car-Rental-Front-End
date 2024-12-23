// Banner.jsx
const Banner = () => (
    <div className="hero bg-cover bg-center" style={{ backgroundImage: "url('/banner.jpg')" }}>
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Drive Your Dreams Today!</h1>
          <button  className="btn btn-primary">View Available Cars</button>
        </div>
      </div>
    </div>
  );
  
  export default Banner;
  