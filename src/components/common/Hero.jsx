import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const nav = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf7f4] via-white to-[#f4efe9] py-28">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-black/5 rounded-full blur-[180px]" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-black/5 rounded-full blur-[200px]" />

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
            className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-neutral-900"
          >
            Elevate Your{" "}
            <span className="bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-transparent">
              Wardrobe
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-neutral-600 max-w-lg text-lg leading-relaxed"
          >
            Discover premium kurtis, statement party wear and curated fashion
            collections crafted for timeless elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex gap-6"
          >

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => nav("/")}
              className="bg-neutral-900 text-white px-10 py-4 rounded-full shadow-xl hover:bg-black transition"
            >
              Shop Collection
            </motion.button>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => nav("/about")}
              className="border border-neutral-900 px-10 py-4 rounded-full hover:bg-neutral-900 hover:text-white transition"
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

          <div className="relative rounded-[40px] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.15)] border border-[#e6ded6]">

            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src="/image.png"
              className="w-full h-[500px] object-cover"
              alt="fashion"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>

          {/* FLOATING BADGE */}
          <motion.div
          
          >
           
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}