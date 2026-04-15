import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const nav = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-rose-50 via-white to-pink-50 py-28 border-b border-rose-100">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-slate-900"
          >
            Elevate Your{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Wardrobe
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-slate-600 max-w-lg text-lg leading-relaxed font-medium"
          >
            Discover premium kurtis, statement party wear and curated fashion
            collections crafted for timeless elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-4"
          >

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => nav("/")}
              className="bg-rose-600 text-white font-medium px-10 py-4 rounded-full shadow-xl shadow-rose-200 hover:bg-rose-700 hover:shadow-2xl transition"
            >
              Shop Collection
            </motion.button>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => nav("/about")}
              className="bg-white border-2 border-rose-100 text-rose-600 font-medium px-10 py-4 rounded-full hover:border-rose-300 hover:bg-rose-50 transition"
            >
              Our Story
            </motion.button>

          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <div className="relative rounded-[40px] overflow-hidden shadow-[0_30px_70px_rgba(225,29,72,0.15)] border-4 border-white">

            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src="/image.png"
              className="w-full h-[500px] object-cover"
              alt="fashion"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent pointer-events-none" />
          </div>

        </motion.div>

      </div>
    </section>
  );
}