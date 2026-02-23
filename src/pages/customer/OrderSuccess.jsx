import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderSuccess() {

 const { orderId } = useParams();
 const navigate = useNavigate();

 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   className="max-w-xl mx-auto mt-24 bg-white shadow-xl border rounded-2xl p-10 text-center"
  >

   <h1 className="text-3xl font-bold text-green-600 mb-4">
    🎉 Order Placed Successfully
   </h1>

   <p className="text-gray-600 mb-6">
    Thank you for shopping with us.
   </p>

   <div className="bg-gray-100 rounded-xl p-4 mb-6">
    <p className="font-semibold">Order ID</p>
    <p>{orderId}</p>
   </div>

   <button
    onClick={() => navigate("/my-orders")}
    className="border py-3 rounded-lg w-full hover:bg-gray-100 transition"
   >
    View My Orders
   </button>

  </motion.div>
 );
}