import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function Sidebar(){

 const [open,setOpen] = useState(false);

 const navItem = (to,label,Icon)=>(
  <NavLink
   to={to}
   onClick={()=>setOpen(false)}
   className={({isActive})=>`
    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative
    ${isActive
     ? "bg-white text-black font-semibold shadow"
     : "text-gray-300 hover:bg-white/10"}
   `}
  >

   <span className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r opacity-0 group-[.active]:opacity-100"/>

   <Icon size={18}/>

   <span>{label}</span>

  </NavLink>
 );

 return(
 <>
 {/* MOBILE HEADER */}
 <div className="md:hidden flex items-center justify-between bg-black text-white px-5 py-4 shadow">
  <h1 className="font-bold text-lg">Admin Panel</h1>
  <button onClick={()=>setOpen(true)}>
   <Menu size={26}/>
  </button>
 </div>

 {/* OVERLAY */}
 {open && (
  <div
   onClick={()=>setOpen(false)}
   className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
  />
 )}

 {/* SIDEBAR */}
 <aside
  className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-black text-white flex flex-col
  transform transition-transform duration-300
  ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
 >

 {/* BRAND */}
 <div className="px-6 py-6 border-b border-white/10 flex justify-between items-center">

  <div>
   <h2 className="text-xl font-bold tracking-wide">SKAVO</h2>
   <p className="text-xs text-gray-400">Admin Dashboard</p>
  </div>

  <button onClick={()=>setOpen(false)} className="md:hidden">
   <X size={22}/>
  </button>

 </div>

 {/* NAV */}
 <nav className="flex-1 px-4 py-6 space-y-2">

  {navItem("/admin","Dashboard",LayoutDashboard)}
  {navItem("/admin/products","Products",ShoppingBag)}
  {navItem("/admin/orders","Orders",ClipboardList)}
  {navItem("/admin/users","Users",Users)}

 </nav>

 {/* FOOTER */}
 <div className="px-6 py-4 border-t border-white/10 text-xs text-gray-400">
  Logged in as Admin
 </div>

 </aside>
 </>
 );
}