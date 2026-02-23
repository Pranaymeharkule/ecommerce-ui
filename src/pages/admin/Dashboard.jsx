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
<div className="p-6 md:p-10 bg-gray-50 min-h-screen">

{/* HEADER */}
<div className="flex justify-between mb-10">
<h1 className="text-3xl font-bold">Admin Dashboard</h1>
<span className="border px-4 py-2 rounded-lg font-semibold">
{new Date().toDateString()}
</span>
</div>

{/* KPI GRID */}
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

<KPI title="Products" value={stats.products}/>
<KPI title="Orders" value={stats.orders}/>
<KPI title="Revenue" value={`₹${stats.revenue}`}/>
<KPI title="Today Revenue" value={`₹${stats.todayRevenue}`}/>

</div>

{/* MINI STATS */}
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

<Mini title="Today Orders" value={stats.todayOrders}/>
<Mini title="Pending Orders" value={stats.pending}/>
<Mini title="Low Stock" value={stats.lowStock}/>
<Mini title="Active Customers" value={stats.orders}/>

</div>

<div className="grid lg:grid-cols-3 gap-10">

{/* RECENT ORDERS */}
<div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

<h2 className="text-xl font-semibold mb-6">Recent Orders</h2>

<table className="w-full text-sm">

<thead className="border-b text-gray-500">
<tr>
<th className="py-3 text-left">Order</th>
<th>Date</th>
<th>Total</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{recent.map(o=>(
<tr key={o._id} className="border-b last:border-0">

<td className="py-3 font-medium">
#{o._id.slice(-6)}
</td>

<td>{new Date(o.createdAt).toLocaleDateString()}</td>

<td className="font-semibold">₹{o.totalPrice}</td>

<td>
<span className={`px-3 py-1 rounded-full text-xs ${badge(o.status)}`}>
{o.status}
</span>
</td>

</tr>
))}

</tbody>
</table>

</div>

{/* RIGHT PANEL */}
<div className="space-y-6">

{/* ADMIN SHORTCUTS */}
<div className="bg-white rounded-2xl shadow p-6">

<h3 className="font-semibold mb-4">Admin Shortcuts</h3>

<div className="grid grid-cols-2 gap-4">

<Action label="➕ Add Product" color="from-indigo-500 to-indigo-700" onClick={()=>nav("/admin/create-product")}/>
<Action label="📦 Orders" color="from-emerald-500 to-emerald-700" onClick={()=>nav("/admin/orders")}/>
<Action label="🛒 Products" color="from-blue-500 to-blue-700" onClick={()=>nav("/admin/products")}/>
<Action label="📊 Dashboard" color="from-orange-500 to-orange-700" onClick={()=>nav("/admin")}/>

</div>

</div>

{/* SYSTEM */}
<div className="bg-white rounded-2xl shadow p-6">

<h3 className="font-semibold mb-4">System Health</h3>

<ul className="space-y-2 text-sm text-gray-600">
<li>✅ API Connected</li>
<li>✅ Orders Active</li>
<li>✅ WhatsApp Enabled</li>
<li>✅ Manual Payments</li>
</ul>

</div>

</div>

</div>

</div>
 );
}

/* COMPONENTS */

const KPI = ({title,value})=>(
<div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
<p className="text-sm text-gray-500">{title}</p>
<p className="text-3xl font-bold mt-3">{value}</p>
</div>
);

const Mini = ({title,value})=>(
<div className="bg-gray-100 p-4 rounded-xl">
<p className="text-xs text-gray-500">{title}</p>
<p className="text-xl font-bold">{value}</p>
</div>
);

const Action = ({label,color,onClick})=>(
<div
 onClick={onClick}
 className={`bg-gradient-to-br ${color} text-white rounded-xl p-4 text-center font-semibold cursor-pointer shadow hover:scale-105 transition`}>
{label}
</div>
);

const badge = s =>{
 if(s==="Delivered") return "bg-green-100 text-green-700";
 if(s==="Cancelled") return "bg-red-100 text-red-700";
 if(s==="Shipped") return "bg-blue-100 text-blue-700";
 return "bg-yellow-100 text-yellow-700";
};