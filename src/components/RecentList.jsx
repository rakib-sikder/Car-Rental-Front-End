// RecentListings.jsx
const RecentListings = () => {
    const cars = [
        {
        model: "Toyota Corolla",
        image: "https://source.unsplash.com/500x400/?toyota-corolla",
        dailyPrice: 50,
        availability: true,
        },
        {
        model: "Honda Civic",
        image: "https://source.unsplash.com/500x400/?honda-civic",
        dailyPrice: 60,
        availability: false,
        },
        {
        model: "Nissan Altima",
        image: "https://source.unsplash.com/500x400/?nissan-altima",
        dailyPrice: 55,
        availability: true,
        },
        {
        model: "Ford Fusion",
        image: "https://source.unsplash.com/500x400/?ford-fusion",
        dailyPrice: 65,
        availability: true,
        },
        {
        model: "Chevrolet Malibu",
        image: "https://source.unsplash.com/500x400/?chevrolet-malibu",
        dailyPrice: 70,
        availability: false,
        },
        {
        model: "Hyundai Sonata",
        image: "https://source.unsplash.com/500x400/?hyundai-sonata",
        dailyPrice: 75,
        availability: true,
        },
    ];
    return (
        <section className="p-8 bg-base-100">
          <h2 className="text-2xl font-bold text-center mb-6">Recent Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, idx) => (
              <div key={idx} className="card bg-base-200 shadow-md hover:shadow-lg ">
                <figure>
                  <img src={car.image} alt={car.model} className="w-full h-48 object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{car.model}</h3>
                  <p className="text-sm">Price: ${car.dailyPrice}/day</p>
                  <p className="text-sm">Availability: {car.availability ? "Available" : "Not Available"}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
}
    
  
  export default RecentListings;
  