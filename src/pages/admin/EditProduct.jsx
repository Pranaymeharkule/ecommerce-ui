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
  });
 },[id]);

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
<div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-6 pb-24">

<h1 className="text-2xl md:text-3xl font-bold mb-6">Edit Product</h1>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

{/* LEFT FORM */}

<div className="lg:col-span-2 space-y-6">

<Card title="Basic Info">

<Input label="Product Name" value={form.name}
 onChange={v=>setForm({...form,name:v})}/>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

<Input label="Price" value={form.price}
 onChange={v=>setForm({...form,price:v})}/>

<Input label="Stock" value={form.stock}
 onChange={v=>setForm({...form,stock:v})}/>

</div>

<Textarea label="Description" value={form.description}
 onChange={v=>setForm({...form,description:v})}/>

</Card>

<Card title="Category">

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

<Select label="Category" value={form.category}
 options={categories}
 onChange={v=>setForm({...form,category:v})}/>

<Select label="Sub Category" value={form.subCategory}
 options={sub}
 onChange={v=>setForm({...form,subCategory:v})}/>

</div>

</Card>

</div>

{/* IMAGE PANEL */}

<div className="bg-white rounded-2xl shadow p-4 sm:p-6">

<h3 className="font-semibold mb-3">Product Image</h3>

<label className="block border-2 border-dashed rounded-xl p-4 sm:p-6 text-center cursor-pointer hover:border-black transition">

<input type="file" className="hidden" onChange={uploadImage}/>

<p className="text-sm text-gray-500">
Tap or click to upload
</p>

{form.images[0] && (
<img
 src={form.images[0]}
 className="mx-auto mt-4 w-40 sm:w-48 aspect-square object-cover rounded-xl shadow hover:scale-105 transition"
/>
)}

</label>

</div>

</div>

{/* MOBILE SAVE BAR */}

<div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 flex gap-3 justify-end">

<button
 onClick={()=>nav("/admin/products")}
 className="border rounded px-4 sm:px-6 py-2">
Cancel
</button>

<button
 onClick={submit}
 className="bg-black text-white rounded px-6 sm:px-8 py-2 hover:bg-gray-800">
Save
</button>

</div>

</div>
 );
}

/* COMPONENTS */

const Card = ({title,children})=>(
<div className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-4">
<h3 className="font-semibold text-sm sm:text-base">{title}</h3>
{children}
</div>
);

const Input = ({label,value,onChange})=>(
<div>
<label className="text-xs sm:text-sm text-gray-500">{label}</label>
<input
 value={value||""}
 onChange={e=>onChange(e.target.value)}
 className="border rounded w-full p-2 mt-1 focus:ring"
/>
</div>
);

const Textarea = ({label,value,onChange})=>(
<div>
<label className="text-xs sm:text-sm text-gray-500">{label}</label>
<textarea
 rows="4"
 value={value||""}
 onChange={e=>onChange(e.target.value)}
 className="border rounded w-full p-2 mt-1 focus:ring"
/>
</div>
);

const Select = ({label,value,onChange,options})=>(
<div>
<label className="text-xs sm:text-sm text-gray-500">{label}</label>
<select
 value={value||""}
 onChange={e=>onChange(e.target.value)}
 className="border rounded w-full p-2 mt-1">

<option value="">Select</option>
{options.map(o=><option key={o}>{o}</option>)}

</select>
</div>
);