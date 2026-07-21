import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import HowItWorks from "../components/HowItWorks";

const values = [
  { icon: "🎯", title: "Honest pricing", body: "The price you see is the price you pay. Totals are computed up front, server-side." },
  { icon: "🤝", title: "Renter first", body: "Free cancellation, flexible dates, and real humans on support around the clock." },
  { icon: "🌍", title: "Local fleet", body: "Cars in Dhaka, Chittagong, Sylhet and Cox's Bazar — with more cities on the way." },
];

const About = () => (
  <div className="bg-base-100">
    <PageHeader
      eyebrow="About Overdrive"
      title="We took the dealership out of car rental"
      subtitle="Overdrive is a modern rental marketplace: browse a real fleet, see live availability, and confirm a car in minutes — no counters, no clipboards, no surprises."
    />

    <section className="py-16">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
            Built by people tired of the rental counter
          </h2>
          <p className="mt-4 leading-relaxed text-base-content/70">
            Renting a car used to mean queueing at a desk, decoding fine print, and hoping the car you
            reserved was actually there. Overdrive replaces all of that with a simple idea: a transparent
            fleet you can browse, filter, and book like anything else you buy online.
          </p>
          <p className="mt-4 leading-relaxed text-base-content/70">
            Every listing shows the real daily rate, the car's class and features, and whether it's free
            for your dates — validated on the server so two people can't grab the same slot.
          </p>
          <Link to="/available-cars" className="btn btn-primary mt-6">Browse the fleet</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            ["10+", "cars in the fleet"],
            ["4", "pickup cities"],
            ["76", "trips completed"],
            ["4.9★", "average rating"],
          ].map(([big, small]) => (
            <div key={small} className="rounded-2xl border border-base-300 bg-base-200 p-6 text-center">
              <p className="font-display text-4xl font-extrabold text-primary">{big}</p>
              <p className="mt-1 text-sm text-base-content/60">{small}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-base-200 py-16">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">What we stand for</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">Our values</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-base-300 bg-base-100 p-7">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-2xl">{v.icon}</div>
              <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/60">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <HowItWorks />
  </div>
);

export default About;
