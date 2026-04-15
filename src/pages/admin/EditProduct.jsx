import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const categories = ["Cotton","Party Wear","Special","Kurties","Bags"];
const sub = ["Readymade","Unstitched Fabric","Trending","Clutches"];

export default function EditProduct(){

 const { id } = useParams();
 const nav = useNavigate();

 const [form,setForm] = useState({
  name:"",
  price:"",
  stock:"",
  description:"",
  category:"",
  subCategory:"",
  images:[]
 });

 useEffect(()=>{
  api.get(`/products/${id}`).then(res=>{
   setForm(res.data.data);
  }); },[id]);

 const uploadImage = async(e)=>{
  const fd=new FormData();
  fd.append("image",e.target.files[0]);
  const {data}=await api.post("/upload",fd);
  setForm(prev=>({...prev,images:[data.url]}));
 };

 const submit = async()=>{
  if(!form.images.length) return alert("Upload image");
  await api.put(`/products/${id}`,form);
  nav("/admin/products");
 };

 return(
<div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 sm:px-6 md:px-10 py-10 pb-24">

<h1 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 tracking-tight">Edit Product</h1>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

{/* LEFT FORM */}

<div className="lg:col-span-2 space-y-8">

<Card title="Basic Information">

<Input label="Product Name" value={form.name}
 onChange={v=>setForm({...form,name:v})}/>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

<Input label="Retail Price (₹)" value={form.price}
 onChange={v=>setForm({...form,price:v})}/>

<Input label="Available Stock" value={form.stock}
 onChange={v=>setForm({...form,stock:v})}/>

</div>

<Textarea label="Product Description" value={form.description}
 onChange={v=>setForm({...form,description:v})}/>

</Card>

<Card title="Categorization">

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

<Select label="Main Category" value={form.category}
 options={categories}
 onChange={v=>setForm({...form,category:v})}/>

<Select label="Sub Category" value={form.subCategory}
 options={sub}
 onChange={v=>setForm({...form,subCategory:v})}/>

</div>

</Card>

</div>

{/* IMAGE PANEL */}

<div className="bg-white/90 backdrop-blur rounded-3xl shadow-[0_20px_40px_rgba(225,29,72,0.04)] border border-rose-100 p-6 sm:p-8 h-fit">

<h3 className="font-bold mb-4 text-slate-900">Product Image</h3>

<label className="block border-2 border-dashed border-rose-200 bg-rose-50/30 rounded-2xl p-6 sm:p-10 text-center cursor-pointer hover:border-rose-400 hover:bg-rose-50 transition duration-300">

<input type="file" className="hidden" onChange={uploadImage}/>

<p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
Tap or click to upload new image
</p>

{form.images[0] && (
<img
 src={form.images[0]}
 className="mx-auto mt-6 w-full max-w-[200px] aspect-square object-cover rounded-xl shadow-md hover:scale-105 transition duration-300 border border-rose-100"
/>
)}

</label>

</div>

</div>

{/* MOBILE SAVE BAR */}

<div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-rose-100 px-6 py-4 flex gap-4 justify-end shadow-[0_-10px_20px_rgba(0,0,0,0.02)] z-50">

<button
 onClick={()=>nav("/admin/products")}
 className="border-2 border-rose-100 text-slate-700 font-semibold rounded-xl px-6 sm:px-8 py-3 hover:bg-rose-50 transition">
Cancel
</button>

<button
 onClick={submit}
 className="bg-rose-600 text-white font-bold rounded-xl px-8 sm:px-10 py-3 hover:bg-rose-700 shadow-lg shadow-rose-200 transition">
Save Changes
</button>

</div>

</div>
 );
}

/* COMPONENTS */

const Card = ({title,children})=>(
<div className="bg-white/90 backdrop-blur rounded-3xl shadow-[0_20px_40px_rgba(225,29,72,0.04)] border border-rose-100 p-6 sm:p-8 space-y-6">
<h3 className="font-bold text-lg text-slate-900 border-b border-rose-50 pb-4">{title}</h3>
{children}
</div>
);

const Input = ({label,value,onChange})=>(
<div>
<label className="text-sm font-medium text-slate-700">{label}</label>
<input
 value={value||""}
 onChange={e=>onChange(e.target.value)}
 className="border border-rose-200 rounded-xl w-full p-3 mt-2 focus:ring-2 focus:ring-rose-200 focus:border-rose-500 outline-none transition text-slate-800 bg-slate-50/50"
/>
</div>
);

const Textarea = ({label,value,onChange})=>(
<div>
<label className="text-sm font-medium text-slate-700">{label}</label>
<textarea
 rows="4"
 value={value||""}
 onChange={e=>onChange(e.target.value)}
 className="border border-rose-200 rounded-xl w-full p-3 mt-2 focus:ring-2 focus:ring-rose-200 focus:border-rose-500 outline-none transition text-slate-800 bg-slate-50/50 resize-none"
/>
</div>
);

const Select = ({label,value,onChange,options})=>(
<div>
<label className="text-sm font-medium text-slate-700">{label}</label>
<select
 value={value||""}
 onChange={e=>onChange(e.target.value)}
 className="border border-rose-200 rounded-xl w-full p-3 mt-2 focus:ring-2 focus:ring-rose-200 focus:border-rose-500 outline-none transition text-slate-800 bg-slate-50/50 cursor-pointer">

<option value="">Select Category</option>
{options.map(o=><option key={o}>{o}</option>)}

</select>
</div>
);