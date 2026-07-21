import { PageHeader } from "../components/PageHeader";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";

const HowItWorksPage = () => (
  <div>
    <PageHeader
      eyebrow="How it works"
      title="From search to steering wheel in minutes"
      subtitle="Overdrive strips out the paperwork so renting a car feels like anything else you book online."
    />
    <HowItWorks />
    <WhyChooseUs />
    <Newsletter />
  </div>
);

export default HowItWorksPage;
