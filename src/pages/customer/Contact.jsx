export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-rose-50 via-white to-pink-50 py-24">

      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          Contact Us
        </h1>
        <p className="text-slate-500 mt-4 text-lg">
          We’re here to help you with anything you need
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

        {/* LEFT INFO */}
        <div className="space-y-10">

          <div>
            <h2 className="text-3xl font-semibold mb-4 text-slate-900">
              Let’s start a conversation
            </h2>

            <p className="text-slate-600 max-w-md text-lg leading-relaxed">
              Have questions about orders, products or returns?
              Our premium support team is always ready to assist.
            </p>
          </div>

          <div className="space-y-5 text-base text-slate-700">
            <p className="flex items-center gap-3"><span className="text-xl">📍</span> Nagpur, Maharashtra</p>
            <p className="flex items-center gap-3"><span className="text-xl">📞</span> +91 7083998215</p>
            <p className="flex items-center gap-3"><span className="text-xl">✉️</span> support@fashionstore.com</p>
          </div>

          {/* TRUST */}
          <div className="grid grid-cols-2 gap-6 pt-10">
            <Trust text="Secure Payments" />
            <Trust text="Fast Delivery" />
            <Trust text="Easy Returns" />
            <Trust text="24/7 Support" />
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/90 backdrop-blur border border-rose-100 rounded-3xl shadow-[0_25px_60px_rgba(225,29,72,0.08)] p-12">

          <h3 className="text-xl font-semibold mb-8 text-slate-900">
            Send us a message
          </h3>

          <FormInput label="Full Name" />
          <FormInput label="Email Address" />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full border border-rose-200 rounded-xl px-4 py-3 mt-4 focus:ring-2 focus:border-rose-500 focus:ring-rose-200 outline-none transition"
          />

          <button className="mt-10 bg-rose-600 font-medium text-white w-full py-3 rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition duration-300">
            Send Message
          </button>

        </div>

      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

const FormInput = ({ label }) => (
  <input
    placeholder={label}
    className="w-full border border-rose-200 rounded-xl px-4 py-3 mt-4 focus:ring-2 focus:border-rose-500 focus:ring-rose-200 outline-none transition"
  />
);

const Trust = ({ text }) => (
  <div className="bg-white border border-rose-100 shadow-lg shadow-rose-50 rounded-xl py-5 text-center text-sm font-medium text-slate-800 hover:shadow-xl hover:shadow-rose-100 transition duration-300">
    <span className="text-rose-500 mr-2">✔</span> {text}
  </div>
);