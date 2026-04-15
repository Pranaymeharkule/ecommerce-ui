import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){

 const nav = useNavigate();

 const [stats,setStats]=useState({
  products:0,
  orders:0,
  revenue:0,
  todayOrders:0,
  todayRevenue:0,
  pending:0,
  lowStock:0
 });

 const [recent,setRecent]=useState([]);

 useEffect(()=>{ load(); },[]);

 const load = async()=>{

  const productsRes = await api.get("/products");
  const ordersRes = await api.get("/orders");

  const products = productsRes.data.data || [];
  const orders = ordersRes.data.orders || [];

  const revenue = orders.reduce((s,o)=>s+o.totalPrice,0);

  const today = new Date().toDateString();

  const todayOrders = orders.filter(o =>
   new Date(o.createdAt).toDateString() === today
  );

  const todayRevenue = todayOrders.reduce((s,o)=>s+o.totalPrice,0);

  const pending = orders.filter(o=>o.status==="Processing").length;

  const lowStock = products.filter(p=>p.stock<5).length;

  setStats({
   products:products.length,
   orders:orders.length,
   revenue,
   todayOrders:todayOrders.length,
   todayRevenue,
   pending,
   lowStock
  });

  setRecent(orders.slice(0,6));
 };

 return(
<div className="p-6 md:p-10 bg-gradient-to-br from-rose-50 via-white to-pink-50 min-h-screen">

{/* HEADER */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
  <span className="bg-white border border-rose-100 text-rose-600 px-5 py-2.5 rounded-xl font-semibold shadow-sm">
    {new Date().toDateString()}
  </span>
</div>

{/* KPI GRID */}
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
  <KPI title="Total Products" value={stats.products}/>
  <KPI title="Total Orders" value={stats.orders}/>
  <KPI title="Total Revenue" value={`₹${stats.revenue}`}/>
  <KPI title="Today's Revenue" value={`₹${stats.todayRevenue}`}/>
</div>

{/* MINI STATS */}
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  <Mini title="Today's Orders" value={stats.todayOrders}/>
  <Mini title="Pending Orders" value={stats.pending}/>
  <Mini title="Low Stock Items" value={stats.lowStock}/>
  <Mini title="Active Customers" value={stats.orders}/>
</div>

<div className="grid lg:grid-cols-3 gap-10">

{/* RECENT ORDERS */}
<div className="lg:col-span-2 bg-white/90 backdrop-blur rounded-3xl shadow-[0_20px_40px_rgba(225,29,72,0.04)] border border-rose-100 p-8">

  <h2 className="text-xl font-bold mb-6 text-slate-900">Recent Orders</h2>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="border-b border-rose-100 text-slate-500">
        <tr>
          <th className="py-4 text-left font-medium">Order ID</th>
          <th className="py-4 text-left font-medium">Date</th>
          <th className="py-4 text-left font-medium">Total</th>
          <th className="py-4 text-left font-medium">Status</th>
        </tr>
      </thead>
      <tbody>
        {recent.map(o=>(
          <tr key={o._id} className="border-b border-rose-50 last:border-0 hover:bg-rose-50/50 transition">
            <td className="py-4 font-semibold text-slate-800">#{o._id.slice(-6)}</td>
            <td className="py-4 text-slate-600">{new Date(o.createdAt).toLocaleDateString()}</td>
            <td className="py-4 font-bold text-rose-600">₹{o.totalPrice}</td>
            <td className="py-4">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase ${badge(o.status)}`}>
                {o.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

</div>

{/* RIGHT PANEL */}
<div className="space-y-6">

{/* ADMIN SHORTCUTS */}
<div className="bg-white/90 backdrop-blur rounded-3xl shadow-[0_20px_40px_rgba(225,29,72,0.04)] border border-rose-100 p-8">
  <h3 className="font-bold mb-6 text-slate-900 text-lg">Quick Actions</h3>
  <div className="grid grid-cols-2 gap-4">
    <Action label="➕ Add Product" onClick={()=>nav("/admin/create-product")}/>
    <Action label="📦 Orders" onClick={()=>nav("/admin/orders")}/>
    <Action label="🛒 Products" onClick={()=>nav("/admin/products")}/>
    <Action label="📊 Dashboard" onClick={()=>nav("/admin")}/>
  </div>
</div>

{/* SYSTEM */}
<div className="bg-slate-900 rounded-3xl shadow-xl p-8 text-white">
  <h3 className="font-bold mb-6 text-lg tracking-wide text-rose-50">System Health</h3>
  <ul className="space-y-4 text-sm text-slate-300 font-medium">
    <li className="flex items-center gap-3"><span className="text-emerald-400 text-lg">●</span> API Connected</li>
    <li className="flex items-center gap-3"><span className="text-emerald-400 text-lg">●</span> Orders Active</li>
    <li className="flex items-center gap-3"><span className="text-emerald-400 text-lg">●</span> WhatsApp Enabled</li>
    <li className="flex items-center gap-3"><span className="text-emerald-400 text-lg">●</span> Payments Live</li>
  </ul>
</div>

</div>

</div>

</div>
 );
}

/* COMPONENTS */

const KPI = ({title,value})=>(
  <div className="bg-white/90 backdrop-blur p-8 rounded-3xl border border-rose-100 shadow-[0_20px_40px_rgba(225,29,72,0.04)] hover:shadow-rose-100 transition duration-300">
    <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">{title}</p>
    <p className="text-4xl font-extrabold mt-3 text-slate-900">{value}</p>
  </div>
);

const Mini = ({title,value})=>(
  <div className="bg-rose-50/80 border border-rose-100 p-5 rounded-2xl">
    <p className="text-xs font-semibold text-rose-600 tracking-wide uppercase">{title}</p>
    <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const Action = ({label,onClick})=>(
  <div
   onClick={onClick}
   className="bg-slate-50 border border-slate-200 text-slate-700 rounded-2xl p-4 text-center text-sm font-semibold cursor-pointer hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:shadow-lg hover:shadow-rose-200 transition duration-300">
   {label}
  </div>
);

const badge = s =>{
 if(s==="Delivered") return "bg-emerald-50 text-emerald-700 border border-emerald-200";
 if(s==="Cancelled") return "bg-rose-50 text-rose-700 border border-rose-200";
 if(s==="Shipped") return "bg-indigo-50 text-indigo-700 border border-indigo-200";
 return "bg-amber-50 text-amber-700 border border-amber-200";
};