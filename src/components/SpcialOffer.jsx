import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/cars")
      .then((response) => {
        setOffers(response.data?.filter((car) => car.offer));
      });
  }, []);

  return (
    <section className="p-8 bg-base-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Special Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
            className="card shadow-md p-6 rounded-lg text-white"
            style={{ backgroundImage: `url(${offer.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold mb-4">{offer.offer.title}</h3>
            <p className="mb-6">{offer.offer.description}</p>
            <Link to={`/cars-details/${offer._id} `} className="btn btn-outline text-white border-white hover:bg-white hover:text-black">
              Book Now
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;