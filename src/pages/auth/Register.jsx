import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register(){

 const navigate = useNavigate();

 const [form,setForm] = useState({
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
  role:"customer"
 });

 const submitHandler = async(e)=>{
  e.preventDefault();

  if(form.password !== form.confirmPassword){
    alert("Passwords do not match");
    return;
  }

  try{

   await api.post("/auth/register",{
    name:form.name,
    email:form.email,
    password:form.password,
    role:form.role
   });

   alert("Account created successfully");
   navigate("/login");

  }catch(err){
   alert(err.response?.data?.message || "Registration failed");
  }
 };

 return(
<div className="min-h-screen grid lg:grid-cols-2">

{/* LEFT HERO */}
<div className="hidden lg:flex items-center justify-center bg-black text-white p-10">
<div>
<h1 className="text-4xl font-bold mb-4">Create Account</h1>
<p className="text-gray-300 max-w-md">
Join our ecommerce platform to shop products or manage your store.
</p>
</div>
</div>

{/* RIGHT FORM */}
<div className="flex items-center justify-center bg-gray-50 px-4">

<div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">



<form onSubmit={submitHandler} className="space-y-4">

<div>
<label className="text-sm text-gray-500">Full Name</label>
<input
 className="border rounded-lg w-full p-2 mt-1 focus:ring"
 placeholder="Enter name"
 value={form.name}
 onChange={e=>setForm({...form,name:e.target.value})}
/>
</div>

<div>
<label className="text-sm text-gray-500">Email</label>
<input
 className="border rounded-lg w-full p-2 mt-1 focus:ring"
 placeholder="Enter email"
 value={form.email}
 onChange={e=>setForm({...form,email:e.target.value})}
/>
</div>

<div>
<label className="text-sm text-gray-500">Password</label>
<input
 type="password"
 className="border rounded-lg w-full p-2 mt-1 focus:ring"
 placeholder="Enter password"
 value={form.password}
 onChange={e=>setForm({...form,password:e.target.value})}
/>
</div>

<div>
<label className="text-sm text-gray-500">Confirm Password</label>
<input
 type="password"
 className="border rounded-lg w-full p-2 mt-1 focus:ring"
 placeholder="Confirm password"
 value={form.confirmPassword}
 onChange={e=>setForm({...form,confirmPassword:e.target.value})}
/>
</div>

{/* ROLE */}



<button
 type="submit"
 className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition">
Create Account
</button>

</form>

<div className="text-center mt-4 text-sm text-gray-500">
Already have an account?
</div>

<button
 onClick={()=>navigate("/login")}
 className="border w-full py-2 rounded-lg hover:bg-gray-100 transition mt-2">
Login
</button>

</div>

</div>

</div>
 );
}