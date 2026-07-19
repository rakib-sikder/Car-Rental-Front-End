// WhyChooseUs.jsx
const WhyChooseUs = () => (
    <section className="p-8 bg-base-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: "🚗", title: "Wide Variety of Cars", desc: "From budget to luxury vehicles." },
          { icon: "💸", title: "Affordable Prices", desc: "Competitive daily rates." },
          { icon: "⚡", title: "Easy Booking Process", desc: "Seamlessly book your ride." },
          { icon: "📞", title: "24/7 Support", desc: "Always here to help." },
        ].map((item, idx) => (
          <div key={idx} className="rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow p-6 text-center">
            <div className="text-4xl">{item.icon}</div>
            <h3 className="text-lg font-semibold mt-3">{item.title}</h3>
            <p className="text-sm text-neutral-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
  export default WhyChooseUs;
                                                                                                                              