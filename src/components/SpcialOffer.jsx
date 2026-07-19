import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../api";

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE}/cars`)
      .then((response) => {
        setOffers(response.data?.filter((car) => car.offer?.title ));
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
            className="relative card shadow-md p-6 rounded-2xl text-white overflow-hidden"
            style={{ backgroundImage: `url(${offer.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="absolute inset-0 bg-black/40 rounded-2xl" />
            <div className="relative">
              <h3 className="text-xl font-bold mb-4">{offer.offer.title}</h3>
              <p className="mb-6 text-neutral-100">{offer.offer.discription}</p>
              <Link to={`/cars-details/${offer._id}`} className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-black rounded-full">
                Book Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;