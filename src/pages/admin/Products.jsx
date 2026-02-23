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
<div className="p-6 bg-gray-50 min-h-screen">

{/* HEADER */}

<div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

<h1 className="text-3xl font-bold">Products</h1>

<div className="flex gap-3">

<input
 placeholder="Search products..."
 className="border rounded px-3 py-2"
 value={search}
 onChange={e=>setSearch(e.target.value)}
/>

<select className="border rounded px-3 py-2" onChange={e=>setCategory(e.target.value)}>
<option value="">All Categories</option>
{categories.map(c=><option key={c}>{c}</option>)}
</select>

</div>

</div>

{/* BULK BAR */}

{selected.length>0 && (
<div className="bg-black text-white p-3 rounded mb-4 flex justify-between">
<span>{selected.length} selected</span>
<button onClick={bulkDelete}>Delete Selected</button>
</div>
)}

{/* GRID */}

<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

{paginated.map(p=>(

<div key={p._id}
 className="bg-white rounded-xl shadow hover:shadow-xl transition group relative overflow-hidden">

<input type="checkbox"
 checked={selected.includes(p._id)}
 onChange={()=>toggleSelect(p._id)}
 className="absolute top-3 left-3 z-10"/>

<div className="relative overflow-hidden">

<img
 src={p.images?.[0] || "https://via.placeholder.com/300"}
 className="h-48 w-full object-cover group-hover:scale-110 transition duration-300"
/>

<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition">

<button onClick={()=>{
 setView(p);
 setActiveImg(p.images?.[0]);
}}
 className="bg-white px-4 py-1 rounded text-sm">
View
</button>

<Link
 to={`/admin/products/${p._id}/edit`}
 className="bg-white px-4 py-1 rounded text-sm">
Edit
</Link>

</div>

</div>

<div className="p-4 space-y-2">

<h3 className="font-semibold truncate">{p.name}</h3>

<p className="text-sm text-gray-500">{p.category}</p>

<div className="flex justify-between items-center">

<span className="font-bold">₹{p.price}</span>

<button
 onClick={()=>toggleStatus(p)}
 className={`text-xs px-3 py-1 rounded-full ${
  p.isActive?"bg-green-100 text-green-700":"bg-red-100 text-red-700"
 }`}>
 {p.isActive?"Active":"Inactive"}
</button>

</div>

<div className="flex justify-between pt-2 text-xs">

<span>Stock: {p.stock}</span>

<button onClick={()=>deleteProduct(p._id)} className="text-red-500">
Delete
</button>

</div>

</div>

</div>

))}

</div>

{/* PAGINATION */}

<div className="flex justify-center gap-2 mt-8">

{Array.from({length:pages}).map((_,i)=>(
<button
 key={i}
 onClick={()=>setPage(i+1)}
 className={`px-3 py-1 rounded ${
  page===i+1?"bg-black text-white":"bg-white border"
 }`}>
{i+1}
</button>
))}

</div>

{/* VIEW MODAL */}

{view && (
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

<div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl relative">

<button
 onClick={()=>setView(null)}
 className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black"
>✕</button>

<div className="grid md:grid-cols-2">

{/* IMAGE SIDE */}

<div className="bg-gray-100 p-6">

<img
 src={activeImg}
 className="w-full h-72 object-cover rounded-xl shadow"
/>

<div className="flex gap-3 mt-4 justify-center">

{view.images?.map((img,i)=>(
<img
 key={i}
 src={img}
 onClick={()=>setActiveImg(img)}
 className={`w-16 h-16 object-cover rounded cursor-pointer border ${
  activeImg===img?"ring-2 ring-black":""
 }`}
/>
))}

</div>

</div>

{/* INFO */}

<div className="p-6 space-y-4">

<h2 className="text-2xl font-bold">{view.name}</h2>

<div className="flex gap-3">

<span className="text-xl font-semibold text-green-600">₹{view.price}</span>

<span className={`text-xs px-3 py-1 rounded-full ${
 view.stock>0?"bg-green-100 text-green-700":"bg-red-100 text-red-700"
}`}>
{view.stock>0?"In Stock":"Out of Stock"}
</span>

</div>

<p className="text-sm text-gray-500">
Category: {view.category}
</p>

<p className="text-gray-700 leading-relaxed">
{view.description}
</p>

<div className="border-t pt-4 text-sm space-y-1">

<p><b>Stock:</b> {view.stock}</p>
<p><b>Sub Category:</b> {view.subCategory}</p>

</div>

</div>

</div>

</div>

</div>
)}

</div>
 );
}