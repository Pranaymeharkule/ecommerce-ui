import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, CreditCard } from "lucide-react";

export default function Checkout() {

 const navigate = useNavigate();

 const [form,setForm]=useState({
  fullName:"",
  phone:"",
  address:"",
  city:"",
  postalCode:"",
  country:"India",
  paymentMethod:"COD"
 });

 const [loading,setLoading]=useState(false);

 const handleChange=(e)=>{
  setForm({...form,[e.target.name]:e.target.value});
 };
const placeOrder = async () => {

 const { fullName, phone, address } = form;

 if (!fullName || !phone || !address)
  return alert("Fill all required details");

 try {

  setLoading(true);

  const res = await api.post("/orders", {
   shippingAddress: {
    fullName,
    phone,
    address,
    city: form.city,
    postalCode: form.postalCode,
    country: form.country
   },
   paymentMethod: "ONLINE"
  });

  const order = res.data.order;

  if (!order?._id) return alert("Order not created");

  const message = `
New Order Received

Order ID: ${order._id}
Name: ${fullName}
Phone: ${phone}
Address: ${address}
Total: ₹${order.totalPrice}
`;

  const whatsappUrl =
   `https://wa.me/917083998215?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");

  navigate(`/order-success/${order._id}`);

 } catch (err) {
  alert(err.response?.data?.message || "Order failed");
 } finally {
  setLoading(false);
 }
};

 return(
<motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 className="max-w-xl mx-auto mt-16 bg-white shadow-xl border rounded-2xl p-8"
>

<h2 className="text-3xl font-bold mb-8">Checkout</h2>

{/* Full Name */}
<label className="flex items-center gap-2 font-medium mb-2">
<MapPin size={18}/> Full Name
</label>

<input
 name="fullName"
 value={form.fullName}
 onChange={handleChange}
 className="border rounded-lg w-full p-3 mb-6"
/>

{/* Phone */}
<label className="flex items-center gap-2 font-medium mb-2">
<MapPin size={18}/> Mobile Number
</label>

<input
 name="phone"
 value={form.phone}
 onChange={handleChange}
 className="border rounded-lg w-full p-3 mb-6"
/>

{/* Address */}
<label className="flex items-center gap-2 font-medium mb-2">
<MapPin size={18}/> Delivery Address
</label>

<textarea
 name="address"
 rows="4"
 value={form.address}
 onChange={handleChange}
 className="border rounded-lg w-full p-3 mb-6"
/>

{/* City */}
<label className="flex items-center gap-2 font-medium mb-2">
<MapPin size={18}/> City
</label>

<input
 name="city"
 value={form.city}
 onChange={handleChange}
 className="border rounded-lg w-full p-3 mb-6"
/>

{/* Postal */}
<label className="flex items-center gap-2 font-medium mb-2">
<MapPin size={18}/> Postal Code
</label>

<input
 name="postalCode"
 value={form.postalCode}
 onChange={handleChange}
 className="border rounded-lg w-full p-3 mb-6"
/>

{/* Country */}
<label className="flex items-center gap-2 font-medium mb-2">
<MapPin size={18}/> Country
</label>

<input
 name="country"
 value={form.country}
 onChange={handleChange}
 className="border rounded-lg w-full p-3 mb-8"
/>

{/* Payment */}
<label className="flex items-center gap-2 font-medium mb-2">
<CreditCard size={18}/> Payment Method
</label>

<select
 name="paymentMethod"
 value={form.paymentMethod}
 onChange={handleChange}
 className="border rounded-lg w-full p-3 mb-8"
>
<option value="COD">Cash On Delivery</option>
</select>

<button
 disabled={loading}
 onClick={placeOrder}
 className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 transition"
>
{loading ? "Placing Order..." : "Place Order"}
</button>

</motion.div>
 );
}