import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { motion } from "framer-motion";
import { ShoppingCart, CreditCard } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const [mainImage,setMainImage]=useState("");

  const fetchProduct = async () => {
    const { data } = await api.get(`/products/${id}`);
setProduct(data.data);
setMainImage(data.data.images[0]); };

  const addToCartHandler = async () => {
    await api.post("/cart", {
      productId: product._id,
      quantity: qty,
    });

    alert("Added to cart!");
  };

  const buyNowHandler = async () => {
    await api.post("/cart", {
      productId: product._id,
      quantity: qty,
    });

    navigate("/checkout");
  };

  if (!product)
    return <p className="text-center mt-20 text-rose-500 font-medium animate-pulse">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-16">

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
        className="relative bg-white rounded-3xl p-6 shadow-2xl shadow-rose-100 border border-rose-50 perspective"
      >
     <img
 src={mainImage}
 className="w-full h-[460px] object-cover rounded-2xl"
/>

<div className="flex gap-3 mt-4">
 {product.images?.slice(0,4).map((img,i)=>(
  <img
   key={i}
   src={img}
   onClick={()=>setMainImage(img)}
   className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition duration-200
   ${mainImage===img?"border-rose-500 shadow-md":"border-transparent hover:border-rose-200"}`}
  />
 ))}
</div>

        {/* Glow Border */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-rose-200/50 pointer-events-none" />
      </motion.div>

      {/* DETAILS */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center space-y-6"
      >

        <h1 className="text-4xl font-extrabold leading-tight text-slate-900">
          {product.name}
        </h1>

        <p className="text-slate-600 text-lg leading-relaxed max-w-md">
          {product.description}
        </p>

        <motion.p
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-extrabold text-rose-600"
        >
          ₹{product.price}
        </motion.p>

        {/* Quantity */}
        <div className="flex items-center gap-4 py-4">

          <span className="font-semibold text-slate-700">Quantity</span>

          <div className="flex items-center border border-rose-200 rounded-xl overflow-hidden shadow-sm">

            <button
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              className="px-5 py-3 bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition"
            >
              -
            </button>

            <span className="px-6 font-bold text-slate-800">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-5 py-3 bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition"
            >
              +
            </button>

          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-4 pt-4">

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addToCartHandler}
            className="flex items-center justify-center gap-2 border-2 border-rose-600 text-rose-600 font-bold w-full py-4 rounded-xl hover:bg-rose-50 transition"
          >
            <ShoppingCart size={20} />
            Add To Cart
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={buyNowHandler}
            className="flex items-center justify-center gap-2 bg-rose-600 text-white font-bold w-full py-4 rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition"
          >
            <CreditCard size={20} />
            Buy Now
          </motion.button>

        </div>

        {/* TRUST */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-6 text-sm font-medium text-slate-500 pt-6 border-t border-rose-100"
        >
          <span className="flex items-center gap-1"><span className="text-rose-400">🚚</span> Fast Delivery</span>
          <span className="flex items-center gap-1"><span className="text-rose-400">🔒</span> Secure Payment</span>
          <span className="flex items-center gap-1"><span className="text-rose-400">↩</span> Easy Returns</span>
        </motion.div>

      </motion.div>

    </div>
  );
}