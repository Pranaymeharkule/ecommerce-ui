export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-[#faf7f4] via-white to-[#f4efe9] py-24">

      {/* HEADER */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900">
          Contact Us
        </h1>
        <p className="text-neutral-500 mt-4">
          We’re here to help you with anything you need
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

        {/* LEFT INFO */}
        <div className="space-y-10">

          <div>
            <h2 className="text-3xl font-semibold mb-4 text-neutral-900">
              Let’s start a conversation
            </h2>

            <p className="text-neutral-600 max-w-md">
              Have questions about orders, products or returns?
              Our premium support team is always ready to assist.
            </p>
          </div>

          <div className="space-y-4 text-sm text-neutral-700">
            <p className="flex items-center gap-3">📍 Nagpur, Maharashtra</p>
            <p className="flex items-center gap-3">📞 +91 7083998215</p>
            <p className="flex items-center gap-3">✉️ support@fashionstore.com</p>
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
        <div className="bg-white/90 backdrop-blur border border-[#e2d8ce] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-12">

          <h3 className="text-xl font-semibold mb-8 text-neutral-900">
            Send us a message
          </h3>

          <FormInput label="Full Name" />
          <FormInput label="Email Address" />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full border border-[#d9d1c8] rounded-xl px-4 py-3 mt-4 focus:ring-2 focus:ring-black outline-none transition"
          />

          <button className="mt-10 bg-neutral-900 text-white w-full py-3 rounded-xl hover:bg-black hover:shadow-xl transition">
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
    className="w-full border border-[#d9d1c8] rounded-xl px-4 py-3 mt-4 focus:ring-2 focus:ring-black outline-none transition"
  />
);

const Trust = ({ text }) => (
  <div className="bg-white border border-[#e0d8cf] shadow-lg rounded-xl py-5 text-center text-sm font-medium text-neutral-800 hover:shadow-xl transition">
    ✔ {text}
  </div>
);