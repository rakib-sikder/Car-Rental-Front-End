// WhyChooseUs.jsx
const WhyChooseUs = () => (
    <section className="p-8 bg-base-100">
      <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: "🚗", title: "Wide Variety of Cars", desc: "From budget to luxury vehicles." },
          { icon: "💸", title: "Affordable Prices", desc: "Competitive daily rates." },
          { icon: "⚡", title: "Easy Booking Process", desc: "Seamlessly book your ride." },
          { icon: "📞", title: "24/7 Support", desc: "Always here to help." },
        ].map((item, idx) => (
          <div key={idx} className="card bg-base-200 shadow-md p-4 text-center">
            <div className="text-4xl">{item.icon}</div>
            <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
            <p className="text-sm mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
  export default WhyChooseUs;
                                                                                                                              