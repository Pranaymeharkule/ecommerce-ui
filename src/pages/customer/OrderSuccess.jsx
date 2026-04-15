import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderSuccess() {

 const { orderId } = useParams();
 const navigate = useNavigate();

 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   className="max-w-xl mx-auto mt-24 bg-white shadow-2xl shadow-emerald-100 border border-emerald-50 rounded-3xl p-12 text-center"
  >

   <h1 className="text-4xl font-extrabold text-emerald-600 mb-4">
    🎉 Order Placed!
   </h1>

   <p className="text-slate-600 mb-8 text-lg font-medium">
    Thank you for shopping with us.
   </p>

   <div className="bg-emerald-50 text-emerald-800 rounded-xl p-6 mb-8 border border-emerald-100">
    <p className="font-semibold text-sm uppercase tracking-wider mb-1">Order ID</p>
    <p className="font-mono text-lg font-bold">{orderId}</p>
   </div>

   <button
    onClick={() => navigate("/my-orders")}
    className="bg-emerald-600 text-white font-medium py-4 rounded-xl w-full hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition duration-300"
   >
    View My Orders
   </button>

  </motion.div>
 );
}