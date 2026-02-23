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
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "Delivered":
        return "bg-green-50 text-green-700 border border-green-200";
      case "Cancelled":
        return "bg-red-50 text-red-700 border border-red-200";
      case "Shipped":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      default:
        return "bg-neutral-100 text-neutral-700 border border-neutral-200";
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-lg text-neutral-500 animate-pulse">
        Loading your orders...
      </div>
    );

  if (!orders.length)
    return (
      <div className="text-center py-32 text-neutral-500">
        <Package className="mx-auto mb-4" size={48} />
        No orders yet.
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-[#faf7f4] via-white to-[#f4efe9] min-h-screen py-20">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-semibold mb-16 tracking-tight text-neutral-900">
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
              className="bg-white/90 backdrop-blur border border-[#e0d8cf] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.06)] p-8 transition"
            >

              {/* HEADER */}
              <div className="flex justify-between items-center mb-8">

                <div>
                  <p className="text-sm text-neutral-400 tracking-wide">
                    ORDER #{order._id.slice(-6)}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className={`px-4 py-1 rounded-full text-xs font-semibold ${statusStyle(order.status)}`}>
                  {order.status}
                </span>

              </div>

              {/* ITEMS */}
              <div className="space-y-6">

                {order.orderItems.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product/${item.product}`}
                    className="group flex gap-6 items-center border-b border-[#eee6df] pb-6"
                  >

                    <div className="overflow-hidden rounded-2xl border border-[#e0d8cf]">
                      <img
                        src={item.image}
                        className="w-24 h-24 object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-neutral-500 mt-1">
                        Qty {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-neutral-900">
                      ₹{item.price}
                    </p>

                  </Link>
                ))}

              </div>

              {/* FOOTER */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 mt-10">

                <div>
                  <p className="text-sm text-neutral-500">
                    Payment: <span className="font-medium">{order.paymentMethod}</span>
                  </p>

                  <p className="text-3xl font-semibold mt-2 text-neutral-900">
                    ₹{order.totalPrice}
                  </p>
                </div>

                <div className="flex gap-4">

                  <Link
                    to={`/order/${order._id}`}
                    className="flex items-center gap-2 border border-neutral-300 px-6 py-2 rounded-xl hover:bg-neutral-900 hover:text-white transition"
                  >
                    <Eye size={16} />
                    View
                  </Link>

                  {order.status === "Processing" && (
                    <button
                      onClick={() => cancelOrderHandler(order._id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition"
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