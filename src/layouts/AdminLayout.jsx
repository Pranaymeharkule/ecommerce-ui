import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, ClipboardList, PlusCircle,
  LogOut, Menu, X, ChevronRight, User
} from "lucide-react";
import { useAuth } from "../context/AuthContext"; 

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
        // Notice we apply an 'active' class here so children can target it
        `group flex items-center justify-between px-5 py-3.5 rounded-2xl transition-all duration-300 ${
          isActive
            ? "active bg-rose-50 text-rose-600 font-bold shadow-sm border border-rose-100"
            : "text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 font-medium"
        }`
      }
    >
      <div className="flex items-center gap-3">
        {/* FIX: Removed the function from className, using group modifiers instead */}
        <Icon size={18} className="text-slate-400 group-[.active]:text-rose-600 group-hover:text-rose-500 transition-colors" />
        <span className="tracking-wide">{label}</span>
      </div>
      <ChevronRight size={14} className="opacity-0 group-[.active]:opacity-100 group-hover:opacity-100 transition-opacity" />
    </NavLink>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      
      {/* MOBILE BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-rose-100 text-slate-900 flex items-center justify-between px-6 py-4 shadow-sm">
        <h1 className="text-xl font-extrabold tracking-tight">SKAVO</h1>
        <button onClick={() => setOpen(true)} className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition">
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
        className={`fixed md:sticky top-0 z-50 h-screen w-72 bg-white/95 backdrop-blur-md border-r border-rose-100 shadow-[10px_0_40px_rgba(225,29,72,0.03)] flex flex-col transition-transform duration-500 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-8 border-b border-rose-50 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-widest text-slate-900">SKAVO</h2>
            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-[0.3em] mt-1">Luxury Kurti Atelier</p>
          </div>
          <button onClick={() => setOpen(false)} className="md:hidden text-slate-400 hover:text-rose-600 transition bg-slate-50 rounded-full p-2">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-5 py-6 space-y-2">
          {navItem("/admin", "Insight Desk", LayoutDashboard)}
          {navItem("/admin/products", "Collection", ShoppingBag)}
          {navItem("/admin/orders", "Boutique Orders", ClipboardList)}
          {navItem("/admin/create-product", "New Design", PlusCircle)}
        </nav>

        <div className="p-6 border-t border-rose-50 bg-slate-50/50">
          <div className="bg-white border border-rose-100 shadow-sm rounded-2xl p-4 mb-4 flex items-center gap-4">
             <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold">
                <User size={20} />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-900">Main Admin</p>
               <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Store Manager</p>
             </div>
          </div>
          <button
            onClick={logoutHandler}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:shadow-lg hover:shadow-rose-200 transition-all duration-300 font-bold text-sm"
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