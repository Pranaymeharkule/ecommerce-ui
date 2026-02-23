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
    return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-16">

      {/* IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
        className="relative bg-white rounded-3xl p-6 shadow-xl border perspective"
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
   className={`w-20 h-20 object-cover rounded cursor-pointer border
   ${mainImage===img?"border-black":"border-gray-300"}`}
  />
 ))}
</div>

        {/* Glow Border */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-black/10 pointer-events-none" />
      </motion.div>

      {/* DETAILS */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center space-y-6"
      >

        <h1 className="text-4xl font-bold leading-tight">
          {product.name}
        </h1>

        <p className="text-gray-600 leading-relaxed max-w-md">
          {product.description}
        </p>

        <motion.p
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-4xl font-extrabold"
        >
          ₹{product.price}
        </motion.p>

        {/* Quantity */}
        <div className="flex items-center gap-4">

          <span className="font-medium">Quantity</span>

          <div className="flex items-center border rounded-xl overflow-hidden">

            <button
              onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
            >
              -
            </button>

            <span className="px-6 font-semibold">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
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
            className="flex items-center justify-center gap-2 border w-full py-4 rounded-xl hover:bg-black hover:text-white transition"
          >
            <ShoppingCart size={18} />
            Add To Cart
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={buyNowHandler}
            className="flex items-center justify-center gap-2 bg-black text-white w-full py-4 rounded-xl hover:bg-gray-800 transition"
          >
            <CreditCard size={18} />
            Buy Now
          </motion.button>

        </div>

        {/* TRUST */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-6 text-sm text-gray-500 pt-4"
        >
          <span>🚚 Fast Delivery</span>
          <span>🔒 Secure Payment</span>
          <span>↩ Easy Returns</span>
        </motion.div>

      </motion.div>

    </div>
  );
}