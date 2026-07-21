import { useContext, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { AuthContext } from "../ContextApi/Context";

const channels = [
  { icon: "📞", title: "Call us", detail: "+880 1700-000000", note: "24/7 roadside & booking help" },
  { icon: "✉️", title: "Email", detail: "hello@overdrive.demo", note: "Replies within a few hours" },
  { icon: "📍", title: "Head office", detail: "Gulshan, Dhaka 1212", note: "Bangladesh" },
];

const faqs = [
  { q: "Do I need a card to book?", a: "No — you can browse and reserve without a card and pay at pickup. A confirmed booking holds your slot." },
  { q: "Can I cancel or change dates?", a: "Yes. Manage everything from “My bookings” — modify dates or cancel any time, no penalty." },
  { q: "How is the total calculated?", a: "Daily rate × number of rental days, shown before you confirm. No hidden counter fees." },
  { q: "Can I list my own car?", a: "Absolutely. Create an account and use “List a car” to add your vehicle to the fleet." },
];

const Contact = () => {
  const { notifys } = useContext(AuthContext);
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    notifys?.("Message sent — we'll be in touch!");
  };

  return (
    <div className="bg-base-100">
      <PageHeader
        eyebrow="Get in touch"
        title="We're here to help"
        subtitle="Questions about a booking, a car, or listing your own? Reach us any way you like."
      />

      <section className="py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* channels */}
          <div className="space-y-4">
            {channels.map((c) => (
              <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-2xl">{c.icon}</span>
                <div>
                  <h3 className="font-display font-bold">{c.title}</h3>
                  <p className="text-base-content/80">{c.detail}</p>
                  <p className="text-sm text-base-content/50">{c.note}</p>
                </div>
              </div>
            ))}
            <div className="overflow-hidden rounded-2xl border border-base-300">
              <iframe
                title="Overdrive office location"
                className="h-56 w-full grayscale"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=90.40%2C23.78%2C90.43%2C23.80&layer=mapnik"
              />
            </div>
          </div>

          {/* form */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-7">
            <h2 className="font-display text-xl font-bold">Send us a message</h2>
            <p className="mt-1 text-sm text-base-content/60">We usually reply within a few hours.</p>
            {sent ? (
              <div className="mt-6 rounded-xl border border-success/30 bg-success/5 p-6 text-center">
                <p className="text-3xl">✅</p>
                <p className="mt-2 font-display font-bold">Message sent!</p>
                <p className="mt-1 text-sm text-base-content/60">Thanks for reaching out. (Demo — nothing is actually sent.)</p>
                <button onClick={() => setSent(false)} className="btn btn-ghost btn-sm mt-4">Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required placeholder="Your name" className="input input-bordered w-full" />
                  <input required type="email" placeholder="Email" className="input input-bordered w-full" />
                </div>
                <input placeholder="Subject" className="input input-bordered w-full" />
                <textarea required rows={5} placeholder="How can we help?" className="textarea textarea-bordered w-full" />
                <button className="btn btn-primary w-full">Send message</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-base-200 py-16">
        <div className="container-x mx-auto max-w-3xl">
          <div className="text-center">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight">Common questions</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="collapse collapse-plus rounded-2xl border border-base-300 bg-base-100">
                <input type="checkbox" defaultChecked={i === 0} />
                <div className="collapse-title font-display font-semibold">{f.q}</div>
                <div className="collapse-content text-sm text-base-content/70">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
