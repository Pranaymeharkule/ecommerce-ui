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
      className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-slate-900 text-2xl tracking-[0.3em] font-extrabold"
        >
          FASHION
        </Link>

        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-600">

          <NavItem to="/" label="Home" />

          <NavItem to="/my-orders" label="Orders" icon={<Package size={16} className="text-rose-400" />} />

          <NavItem to="/about" label="About" icon={<Info size={16} className="text-rose-400" />} />

          <NavItem to="/contact" label="Contact" icon={<Phone size={16} className="text-rose-400" />} />

        </div>

        {/* SEARCH */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-rose-50/50 border border-rose-200 hover:border-rose-300 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-100 rounded-full px-5 py-2 w-72 transition duration-300"
        >
          <Search size={16} className="text-rose-500" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search luxury products..."
            className="bg-transparent outline-none px-3 text-sm w-full text-slate-800 placeholder-slate-400 font-medium"
          />
        </form>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <IconLink to="/cart" icon={<ShoppingBag className="text-slate-700 hover:text-rose-600 transition" />} />

          {token ? (
            <button
              onClick={logout}
              className="border-2 border-rose-100 text-rose-600 px-6 py-2 rounded-full hover:bg-rose-50 hover:border-rose-200 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-rose-600 text-white px-6 py-2.5 rounded-full shadow-md shadow-rose-200 hover:bg-rose-700 hover:shadow-lg transition"
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
    className="flex items-center gap-2 hover:text-rose-600 transition group relative"
  >
    {icon}
    {label}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all group-hover:w-full rounded-full"></span>
  </Link>
);

const IconLink = ({ to, icon }) => (
  <Link to={to} className="hover:scale-110 transition flex items-center justify-center">
    {icon}
  </Link>
);