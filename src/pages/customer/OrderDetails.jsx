import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===============================
     📦 Fetch Order
  =============================== */
  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data.order);
    } catch (err) {
      alert("Failed to load order");
      navigate("/my-orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  /* ===============================
     ❌ Cancel Order
  =============================== */
  const cancelOrder = async () => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      await api.put(`/orders/${id}/cancel`);
      alert("Order cancelled");
      fetchOrder();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-rose-500 font-medium animate-pulse">Loading order...</p>;

  if (!order)
    return <p className="text-center mt-20 font-medium text-slate-500">Order not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">Order Details</h1>

      {/* ================= STATUS ================= */}
      <div className="bg-white shadow-lg shadow-rose-50 border border-rose-100 rounded-xl p-6 mb-6 flex justify-between">
        <div>
          <p className="text-rose-500 font-medium text-sm">
            Order ID: {order._id}
          </p>
          <p className="text-slate-400 text-sm mt-1 font-medium">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <span
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide h-fit ${
            order.status === "Processing"
              ? "bg-amber-100 text-amber-700"
              : order.status === "Delivered"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* ================= SHIPPING ================= */}
      {order.shippingAddress && (
        <div className="bg-white shadow-lg shadow-rose-50 border border-rose-100 rounded-xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-4 text-slate-900">Shipping Address</h2>

          <div className="text-slate-600 space-y-1">
            <p className="font-medium text-slate-800">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city} –{" "}
              {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      )}

      {/* ================= ITEMS ================= */}
      <div className="bg-white shadow-lg shadow-rose-50 border border-rose-100 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-lg mb-4 text-slate-900">Items</h2>

        <div className="space-y-4">
          {order.orderItems.map((item) => (
            <Link
              key={item._id}
              to={`/product/${item.product}`}
              className="flex items-center gap-4 border-b border-rose-50 pb-4 hover:bg-rose-50 p-2 rounded-lg transition"
            >
              <img
                src={item.image || "https://via.placeholder.com/80"}
                className="w-20 h-20 rounded-lg object-cover border border-rose-100"
              />

              <div className="flex-1">
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-sm font-medium text-slate-500 mt-1">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-bold text-rose-600 text-lg">₹{item.price}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="bg-white shadow-lg shadow-rose-50 border border-rose-100 rounded-xl p-6">
        <h2 className="font-bold text-lg mb-4 text-slate-900">Summary</h2>

        <p className="text-slate-600 mb-2">
          Payment Method:{" "}
          <span className="font-semibold text-slate-800">
            {order.paymentMethod}
          </span>
        </p>

        <p className="text-slate-600 mb-4">
          Payment Status:{" "}
          <span className="font-semibold text-slate-800">
            {order.paymentStatus}
          </span>
        </p>

        <p className="text-2xl font-bold mt-2 text-slate-900 border-t border-rose-100 pt-4">
          Total: <span className="text-rose-600">₹{order.totalPrice}</span>
        </p>

        {order.status === "Processing" && (
          <button
            onClick={cancelOrder}
            className="mt-6 bg-rose-500 text-white font-medium px-8 py-3 rounded-lg hover:bg-rose-600 shadow-md transition"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}