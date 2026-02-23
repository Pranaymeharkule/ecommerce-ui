import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Search,
  Package,
  Info,
  Phone
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?search=${search}`);
    setSearch("");
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 w-full z-50 bg-gradient-to-r from-black via-neutral-900 to-black border-b border-[#2a2a2a]"
    >
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-white text-2xl tracking-[0.3em] font-semibold"
        >
          FASHION
        </Link>

        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center gap-10 text-sm text-neutral-300">

          <NavItem to="/" label="Home" />

          <NavItem to="/my-orders" label="Orders" icon={<Package size={14} />} />

          <NavItem to="/about" label="About" icon={<Info size={14} />} />

          <NavItem to="/contact" label="Contact" icon={<Phone size={14} />} />

        </div>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-neutral-900/80 border border-neutral-700 rounded-full px-5 py-2 w-72 backdrop-blur"
        >
          <Search size={16} className="text-neutral-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search luxury products..."
            className="bg-transparent outline-none px-3 text-sm w-full text-white placeholder-neutral-400"
          />
        </form>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm text-white">

          <IconLink to="/cart" icon={<ShoppingBag />} />

          {token ? (
            <button
              onClick={logout}
              className="border border-neutral-400 px-5 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="border border-neutral-400 px-5 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
          )}

        </div>

      </div>
    </motion.nav>
  );
}

/* ================= COMPONENTS ================= */

const NavItem = ({ to, label, icon }) => (
  <Link
    to={to}
    className="flex items-center gap-2 hover:text-white relative after:absolute after:w-0 after:h-[1px] after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
  >
    {icon}
    {label}
  </Link>
);

const IconLink = ({ to, icon }) => (
  <Link to={to} className="hover:scale-110 transition">
    {icon}
  </Link>
);