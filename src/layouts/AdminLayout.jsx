import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, ClipboardList, PlusCircle,
  LogOut, Menu, X, ChevronRight, User
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; // ✅ ADD THIS

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

 const { logout } = useAuth();

const logoutHandler = () => {
  logout();
  navigate("/login");
};

  

  const navItem = (to, label, Icon) => (
    <NavLink
      to={to}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-gradient-to-r from-[#1e293b] to-[#334155] text-amber-400 shadow-lg"
            : "text-slate-400 hover:text-white hover:bg-white/5"
        }`
      }
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span className="font-medium tracking-wide">{label}</span>
      </div>
      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </NavLink>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* MOBILE BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0f172a] text-white flex items-center justify-between px-6 py-4 shadow-xl">
        <h1 className="text-xl font-serif italic font-bold tracking-tighter">SKAVO</h1>
        <button onClick={() => setOpen(true)} className="p-2 hover:bg-white/10 rounded-full">
          <Menu size={24} />
        </button>
      </div>

      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl transition-transform duration-500 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-8">
          <h2 className="text-3xl font-serif font-bold tracking-widest text-amber-400">SKAVO</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-1">Luxury Kurti Atelier</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItem("/admin", "Insight Desk", LayoutDashboard)}
          {navItem("/admin/products", "Collection", ShoppingBag)}
          {navItem("/admin/orders", "Boutique Orders", ClipboardList)}
          {navItem("/admin/create-product", "New Design", PlusCircle)}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="bg-white/5 rounded-2xl p-4 mb-4 flex items-center gap-3">
             <div className="h-10 w-10 rounded-full bg-amber-400 flex items-center justify-center text-[#0f172a]">
                <User size={20} />
             </div>
             <div>
               <p className="text-sm font-bold">Main Admin</p>
               <p className="text-[10px] text-slate-400">Store Manager</p>
             </div>
          </div>
          <button
            onClick={logoutHandler}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-sm"
          >
            <LogOut size={16} />
            Logout Session
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 w-full overflow-x-hidden pt-20 md:pt-0">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="p-4 md:p-10 max-w-[1600px] mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}