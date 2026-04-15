import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function Products(){

 const [products,setProducts]=useState([]);
 const [search,setSearch]=useState("");
 const [category,setCategory]=useState("");
 const [selected,setSelected]=useState([]);
 const [view,setView]=useState(null);
 const [activeImg,setActiveImg]=useState("");

 const [page,setPage]=useState(1);
 const perPage = 8;

 useEffect(()=>{ load(); },[]);

 const load = async()=>{
  const {data}=await api.get("/products");
  setProducts(data.data || []);
 };

 /* FILTER */
 const filtered = products.filter(p=>
  p.name.toLowerCase().includes(search.toLowerCase()) &&
  (!category || p.category===category)
 );

 const pages = Math.ceil(filtered.length/perPage);
 const paginated = filtered.slice((page-1)*perPage,page*perPage);

 const toggleSelect = id =>{
  setSelected(s=>s.includes(id)?s.filter(i=>i!==id):[...s,id]);
 };

 const deleteProduct = async(id)=>{
  if(!window.confirm("Delete product?")) return;
  await api.delete(`/products/${id}`);
  load();
 };

 const bulkDelete = async()=>{
  if(!window.confirm("Delete selected products?")) return;
  await Promise.all(selected.map(id=>api.delete(`/products/${id}`)));
  setSelected([]);
  load();
 };

 const toggleStatus = async(p)=>{
  await api.put(`/products/${p._id}`,{isActive:!p.isActive});
  load();
 };

 const categories=[...new Set(products.map(p=>p.category))];

 return(
<div className="p-6 md:p-10 bg-gradient-to-br from-rose-50 via-white to-pink-50 min-h-screen">

{/* HEADER */}

<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">

<h1 className="text-3xl font-bold text-slate-900 tracking-tight">Products Inventory</h1>

<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

<input
 placeholder="Search products..."
 className="border border-rose-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500 w-full md:w-64 transition"
 value={search}
 onChange={e=>setSearch(e.target.value)}
/>

<select className="border border-rose-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-500 text-slate-700 w-full md:w-auto transition cursor-pointer" onChange={e=>setCategory(e.target.value)}>
<option value="">All Categories</option>
{categories.map(c=><option key={c}>{c}</option>)}
</select>

</div>

</div>

{/* BULK BAR */}

{selected.length>0 && (
<div className="bg-rose-600 text-white px-6 py-4 rounded-2xl mb-8 flex justify-between items-center shadow-lg shadow-rose-200 font-medium">
<span>{selected.length} items selected</span>
<button onClick={bulkDelete} className="bg-white text-rose-600 px-4 py-2 rounded-xl hover:bg-rose-50 transition">Delete Selected</button>
</div>
)}

{/* GRID */}

<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

{paginated.map(p=>(

<div key={p._id}
 className="bg-white/90 backdrop-blur rounded-3xl shadow-[0_10px_30px_rgba(225,29,72,0.03)] hover:shadow-[0_20px_40px_rgba(225,29,72,0.08)] transition duration-300 group relative overflow-hidden border border-rose-100">

<input type="checkbox"
 checked={selected.includes(p._id)}
 onChange={()=>toggleSelect(p._id)}
 className="absolute top-4 left-4 z-10 w-5 h-5 accent-rose-600 cursor-pointer"/>

<div className="relative overflow-hidden">

<img
 src={p.images?.[0] || "https://via.placeholder.com/300"}
 className="h-56 w-full object-cover group-hover:scale-110 transition duration-500"
/>

<div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition duration-300 backdrop-blur-sm">

<button onClick={()=>{
 setView(p);
 setActiveImg(p.images?.[0]);
}}
 className="bg-white text-slate-900 font-bold px-5 py-2 rounded-xl hover:scale-105 transition">
View
</button>

<Link
 to={`/admin/products/${p._id}/edit`}
 className="bg-rose-600 text-white font-bold px-5 py-2 rounded-xl hover:scale-105 transition">
Edit
</Link>

</div>

</div>

<div className="p-6 space-y-3">

<h3 className="font-bold text-slate-900 text-lg truncate">{p.name}</h3>

<p className="text-xs font-semibold uppercase tracking-wider text-rose-500">{p.category}</p>

<div className="flex justify-between items-center border-t border-rose-50 pt-3">

<span className="font-extrabold text-slate-900 text-xl">₹{p.price}</span>

<button
 onClick={()=>toggleStatus(p)}
 className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border ${
  p.isActive?"bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100":"bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
 } transition`}>
 {p.isActive?"Active":"Inactive"}
</button>

</div>

<div className="flex justify-between items-center pt-2 text-sm font-medium">

<span className={p.stock > 0 ? "text-slate-500" : "text-rose-500"}>Stock: {p.stock}</span>

<button onClick={()=>deleteProduct(p._id)} className="text-slate-400 hover:text-rose-600 transition">
Delete
</button>

</div>

</div>

</div>

))}

</div>

{/* PAGINATION */}

{pages > 1 && (
<div className="flex justify-center gap-3 mt-12">

{Array.from({length:pages}).map((_,i)=>(
<button
 key={i}
 onClick={()=>setPage(i+1)}
 className={`w-11 h-11 rounded-xl font-bold transition duration-300 ${
  page===i+1?"bg-rose-600 text-white shadow-md shadow-rose-200 border-rose-600":"bg-white text-slate-600 border border-rose-200 hover:bg-rose-50 hover:text-rose-600"
 }`}>
{i+1}
</button>
))}

</div>
)}

{/* VIEW MODAL */}

{view && (
<div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

<div className="bg-white max-w-4xl w-full rounded-[2rem] shadow-2xl relative border border-rose-100 overflow-hidden">

<button
 onClick={()=>setView(null)}
 className="absolute top-4 right-4 text-xl text-slate-400 hover:text-rose-600 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center z-10 transition"
>✕</button>

<div className="grid md:grid-cols-2">

{/* IMAGE SIDE */}

<div className="bg-rose-50/30 p-8 flex flex-col items-center border-r border-rose-50">

<img
 src={activeImg}
 className="w-full aspect-[4/5] object-cover rounded-2xl shadow-md border border-rose-100"
/>

<div className="flex gap-3 mt-6 justify-center">

{view.images?.map((img,i)=>(
<img
 key={i}
 src={img}
 onClick={()=>setActiveImg(img)}
 className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition duration-200 ${
  activeImg===img?"border-rose-500 shadow-md":"border-transparent hover:border-rose-300"
 }`}
/>
))}

</div>

</div>

{/* INFO */}

<div className="p-8 space-y-6 flex flex-col justify-center">

<h2 className="text-3xl font-extrabold text-slate-900">{view.name}</h2>

<div className="flex gap-4 items-center">

<span className="text-3xl font-extrabold text-rose-600">₹{view.price}</span>

<span className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border ${
 view.stock>0?"bg-emerald-50 text-emerald-700 border-emerald-200":"bg-rose-50 text-rose-700 border-rose-200"
}`}>
{view.stock>0?"In Stock":"Out of Stock"}
</span>

</div>

<p className="text-sm font-semibold text-rose-400 uppercase tracking-widest">
Category: {view.category}
</p>

<p className="text-slate-600 leading-relaxed text-lg">
{view.description}
</p>

<div className="border-t border-rose-100 pt-6 mt-auto">

<div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl">
<p><b className="text-slate-900 block mb-1">Available Stock</b> {view.stock} Units</p>
<p><b className="text-slate-900 block mb-1">Sub Collection</b> {view.subCategory}</p>
</div>

</div>

</div>

</div>

</div>

</div>
)}

</div>
 );
}