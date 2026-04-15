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
    <div className="bg-gradient-to-b from-rose-50 via-white to-pink-50 min-h-screen py-16">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10"
      >

        {/* ITEMS */}
        <div className="md:col-span-2 space-y-6">

          <h2 className="text-4xl font-semibold text-slate-900 mb-6">
            Shopping Cart
          </h2>

          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/90 backdrop-blur border border-rose-100 rounded-2xl p-6 flex gap-6 shadow-sm hover:shadow-xl hover:shadow-rose-50 transition duration-300"
              >
                <img
                  src={item.image}
                  className="w-32 h-32 rounded-xl object-cover border border-rose-50"
                />

                <div className="flex-1">

                  <h3 className="font-medium text-lg text-slate-900">
                    {item.name}
                  </h3>

                  <p className="text-rose-600 font-medium mt-1">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-5">

                    <QtyBtn onClick={() => updateQty(item.productId, item.quantity - 1)}>
                      −
                    </QtyBtn>

                    <span className="font-semibold text-slate-800">{item.quantity}</span>

                    <QtyBtn onClick={() => updateQty(item.productId, item.quantity + 1)}>
                      +
                    </QtyBtn>

                  </div>

                  <p className="text-sm text-slate-500 mt-2">
                    Subtotal: <span className="font-medium text-slate-700">₹{item.price * item.quantity}</span>
                  </p>

                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-slate-400 hover:text-rose-600 transition duration-200"
                >
                  <FiTrash2 size={18} />
                </button>

              </motion.div>
            ))}
          </AnimatePresence>

          {cart.length === 0 && (
            <p className="text-slate-500 font-medium text-lg">Your cart is empty.</p>
          )}

        </div>

        {/* SUMMARY */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur border border-rose-200 rounded-2xl p-8 h-fit sticky top-28 shadow-xl shadow-rose-50"
          >

            <h3 className="text-2xl font-semibold mb-6 text-slate-900">
              Order Summary
            </h3>

            <Row label="Subtotal" value={`₹${subtotal}`} />
            <Row label="Tax (5%)" value={`₹${tax}`} />

            <div className="border-t border-rose-100 pt-4 mt-4">
              <Row label="Total" value={`₹${grandTotal}`} bold />
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-8 bg-rose-600 text-white w-full py-3 rounded-xl font-medium hover:bg-rose-700 shadow-lg shadow-rose-200 hover:shadow-rose-300 transition duration-300"
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
    className="w-9 h-9 border border-rose-200 text-slate-700 rounded-full hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 transition"
  >
    {children}
  </button>
);

const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between mb-3 ${bold && "font-semibold text-lg"}`}>
    <span className="text-slate-600">{label}</span>
    <span className={bold ? "text-rose-600" : "text-slate-900"}>{value}</span>
  </div>
);