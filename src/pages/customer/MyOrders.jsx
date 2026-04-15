import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Eye, XCircle } from "lucide-react";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders/my");
      setOrders(data.orders);
    } catch {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrderHandler = async (id) => {
    if (!window.confirm("Cancel this order?")) return;
    await api.put(`/orders/${id}/cancel`);
    fetchOrders();
  };

  const statusStyle = (s) => {
    switch (s) {
      case "Processing":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      case "Delivered":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-600 border border-rose-200";
      case "Shipped":
        return "bg-indigo-50 text-indigo-600 border border-indigo-200";
      default:
        return "bg-slate-100 text-slate-600 border border-slate-200";
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg text-rose-500 animate-pulse">
        Loading your orders...
      </div>
    );

  if (!orders.length)
    return (
      <div className="text-center py-32 text-slate-400">
        <Package className="mx-auto mb-4 text-rose-300" size={48} />
        <p className="text-lg font-medium">No orders yet.</p>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-rose-50 via-white to-pink-50 min-h-screen py-20">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-semibold mb-16 tracking-tight text-slate-900">
          My Orders
        </h1>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="space-y-12"
        >

          {orders.map((order) => (

            <motion.div
              key={order._id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4 }}
              className="bg-white/90 backdrop-blur border border-rose-100 rounded-3xl shadow-[0_25px_60px_rgba(225,29,72,0.06)] p-8 transition duration-300"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-8">

                <div>
                  <p className="text-sm font-semibold text-rose-400 tracking-wide uppercase">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-xs font-medium text-slate-500 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusStyle(order.status)}`}>
                  {order.status}
                </span>

              </div>

              {/* ITEMS */}
              <div className="space-y-6">

                {order.orderItems.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item.product}`}
                    className="group flex gap-6 items-center border-b border-rose-50 pb-6"
                  >

                    <div className="overflow-hidden rounded-2xl border border-rose-100">
                      <img
                        src={item.image}
                        className="w-24 h-24 object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-lg text-slate-900 group-hover:text-rose-600 transition">
                        {item.name}
                      </p>
                      <p className="text-sm font-medium text-slate-500 mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-lg text-rose-600">
                      ₹{item.price}
                    </p>

                  </Link>
                ))}

              </div>

              {/* FOOTER */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 mt-10">

                <div>
                  <p className="text-sm text-slate-500">
                    Payment Method: <span className="font-semibold text-slate-700">{order.paymentMethod}</span>
                  </p>

                  <p className="text-3xl font-bold mt-2 text-slate-900">
                    ₹{order.totalPrice}
                  </p>
                </div>

                <div className="flex gap-4">

                  <Link
                    to={`/order/${order._id}`}
                    className="flex items-center gap-2 border border-rose-200 text-rose-600 px-6 py-2 rounded-xl font-medium hover:bg-rose-50 transition"
                  >
                    <Eye size={16} />
                    View Details
                  </Link>

                  {order.status === "Processing" && (
                    <button
                      onClick={() => cancelOrderHandler(order._id)}
                      className="flex items-center gap-2 bg-rose-500 text-white font-medium px-6 py-2 rounded-xl hover:bg-rose-600 shadow-md shadow-rose-200 transition"
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  )}

                </div>

              </div>

            </motion.div>

          ))}

        </motion.div>

      </div>
    </div>
  );
}