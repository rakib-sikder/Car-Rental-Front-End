import { motion } from "framer-motion";

const OurCommitment = () => {
  const commitments = [
    {
      title: "Safety First",
      description: "All our vehicles are inspected regularly to ensure your safety and comfort.",
      icon: "🛡️",
    },
    {
      title: "Eco-Friendly Options",
      description: "Drive greener with our range of hybrid and electric vehicles.",
      icon: "🌱",
    },
    {
      title: "Transparent Policies",
      description: "No hidden fees or surprises. What you see is what you pay.",
      icon: "📜",
    },
    {
      title: "Seamless Experience",
      description: "Enjoy a hassle-free booking and pickup process every time.",
      icon: "✨",
    },
  ];

  return (
    <section className="p-8 bg-gradient-to-r from-blue-50 to-blue-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Our Commitment to You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {commitments.map((commitment, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: "spring", stiffness: 150, duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-5xl mb-4">{commitment.icon}</div>
            <h3 className="text-xl font-bold mb-2">{commitment.title}</h3>
            <p className="text-gray-600">{commitment.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurCommitment;
