import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const { data } = await api.get("/cart");
      setCart(data.cart || []);
    } catch {
      navigate("/login");
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + tax;

  const updateQty = async (productId, quantity) => {
    if (quantity < 1) return;
    await api.put("/cart", { productId, quantity });
    loadCart();
  };

  const removeItem = async (productId) => {
    await api.delete("/cart", { data: { productId } });
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  return (
    <div className="bg-gradient-to-b from-[#faf7f4] via-white to-[#f4efe9] min-h-screen py-16">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10"
      >

        {/* ITEMS */}
        <div className="md:col-span-2 space-y-6">

          <h2 className="text-4xl font-semibold text-neutral-900 mb-6">
            Shopping Cart
          </h2>

          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/90 backdrop-blur border border-[#e0d8cf] rounded-2xl p-6 flex gap-6 hover:shadow-xl transition"
              >
                <img
                  src={item.image}
                  className="w-32 h-32 rounded-xl object-cover border"
                />

                <div className="flex-1">

                  <h3 className="font-medium text-lg text-neutral-900">
                    {item.name}
                  </h3>

                  <p className="text-neutral-500 mt-1">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-5">

                    <QtyBtn onClick={() => updateQty(item.productId, item.quantity - 1)}>
                      −
                    </QtyBtn>

                    <span className="font-semibold">{item.quantity}</span>

                    <QtyBtn onClick={() => updateQty(item.productId, item.quantity + 1)}>
                      +
                    </QtyBtn>

                  </div>

                  <p className="text-sm text-neutral-500 mt-2">
                    Subtotal: ₹{item.price * item.quantity}
                  </p>

                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-neutral-400 hover:text-red-500 transition"
                >
                  <FiTrash2 size={18} />
                </button>

              </motion.div>
            ))}
          </AnimatePresence>

          {cart.length === 0 && (
            <p className="text-neutral-500">Your cart is empty.</p>
          )}

        </div>

        {/* SUMMARY */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur border border-[#e0d8cf] rounded-2xl p-8 h-fit sticky top-28 shadow-xl"
          >

            <h3 className="text-2xl font-semibold mb-6 text-neutral-900">
              Order Summary
            </h3>

            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="Tax (5%)" value={`₹${tax}`} />

            <div className="border-t border-[#e0d8cf] pt-4 mt-4">
              <Row label="Total" value={`₹${grandTotal}`} bold />
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-8 bg-neutral-900 text-white w-full py-3 rounded-xl hover:bg-black hover:shadow-xl transition"
            >
              Checkout Securely
            </button>

          </motion.div>
        )}

      </motion.div>
    </div>
  );
}

/* UI helpers */

const QtyBtn = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="w-9 h-9 border border-[#d9d1c8] rounded-full hover:bg-neutral-100 transition"
  >
    {children}
  </button>
);

const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between mb-3 ${bold && "font-semibold text-lg"}`}>
    <span className="text-neutral-600">{label}</span>
    <span className="text-neutral-900">{value}</span>
  </div>
);