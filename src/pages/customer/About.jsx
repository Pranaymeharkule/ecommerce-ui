import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-[#faf7f4] via-white to-[#f4efe9] overflow-hidden">

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-24 text-center border-b border-neutral-200"
      >
        <h1 className="text-5xl font-bold mb-4 tracking-tight text-neutral-900">
          About Fashion Store
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Premium kurtis, party wear & trending fashion — crafted for confidence,
          comfort and timeless elegance.
        </p>
      </motion.section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">

        <Feature title="Premium Quality">
          Carefully curated fabrics blended with modern silhouettes.
        </Feature>

        <Feature title="Latest Trends">
          Seasonal collections inspired by global fashion houses.
        </Feature>

        <Feature title="Customer First">
          Easy returns, express delivery & personal support.
        </Feature>

      </section>

      {/* STORY */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-24 border-y border-neutral-200"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-6 text-neutral-900">
            Our Story
          </h2>

          <p className="text-neutral-600 leading-relaxed">
            Fashion Store began with a simple vision — bringing premium Indian
            fashion to every wardrobe. From everyday cotton kurtis to elegant
            party wear, each piece is designed to blend tradition with
            contemporary style.
          </p>
        </div>
      </motion.section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-2 md:grid-cols-4 gap-8">

        <Stat value="5K+" label="Happy Customers" />
        <Stat value="500+" label="Products" />
        <Stat value="20+" label="Categories" />
        <Stat value="24/7" label="Support" />

      </section>

    </div>
  );
}

/* ===== COMPONENTS ===== */

const Feature = ({ title, children }) => (
  <motion.div
    whileHover={{ y: -10 }}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white/90 backdrop-blur border border-[#d6cfc7] shadow-[0_20px_40px_rgba(0,0,0,0.06)] rounded-3xl p-10 text-center hover:border-black transition"
  >
    <h3 className="font-semibold text-xl mb-4 text-neutral-900">{title}</h3>
    <p className="text-neutral-600 text-sm">{children}</p>
  </motion.div>
);

const Stat = ({ value, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="bg-white border border-[#e0d8cf] shadow-xl rounded-2xl p-8 text-center hover:shadow-2xl transition"
  >
    <p className="text-4xl font-bold text-neutral-900">{value}</p>
    <p className="text-neutral-500 text-sm mt-2">{label}</p>
  </motion.div>
);