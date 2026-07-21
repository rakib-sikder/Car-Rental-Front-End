import Hero from "../components/Hero";
import Stats from "../components/Stats";
import HowItWorks from "../components/HowItWorks";
import VehicleClasses from "../components/VehicleClasses";
import RecentListings from "../components/RecentList";
import WhyChooseUs from "../components/WhyChooseUs";
import SpecialOffers from "../components/SpcialOffer";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

const Home = () => (
  <div>
    <Hero />
    <Stats />
    <VehicleClasses />
    <RecentListings />
    <HowItWorks />
    <SpecialOffers />
    <WhyChooseUs />
    <Testimonials />
    <Newsletter />
  </div>
);

export default Home;
