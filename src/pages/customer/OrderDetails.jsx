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
    return <p className="text-center mt-20">Loading order...</p>;

  if (!order)
    return <p className="text-center mt-20">Order not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Order Details</h1>

      {/* ================= STATUS ================= */}
      <div className="bg-white shadow rounded-lg p-6 mb-6 flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">
            Order ID: {order._id}
          </p>
          <p className="text-gray-400 text-sm">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            order.status === "Processing"
              ? "bg-yellow-100 text-yellow-700"
              : order.status === "Delivered"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* ================= SHIPPING ================= */}
      {order.shippingAddress && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="font-bold text-lg mb-3">Shipping Address</h2>

          <p>{order.shippingAddress.fullName}</p>
          <p>{order.shippingAddress.phone}</p>
          <p>{order.shippingAddress.address}</p>
          <p>
            {order.shippingAddress.city} –{" "}
            {order.shippingAddress.postalCode}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>
      )}

      {/* ================= ITEMS ================= */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">Items</h2>

        <div className="space-y-4">
          {order.orderItems.map((item) => (
            <Link
              key={item._id}
              to={`/product/${item.product}`}
              className="flex items-center gap-4 border-b pb-4 hover:bg-gray-50 p-2 rounded"
            >
              <img
                src={item.image || "https://via.placeholder.com/80"}
                className="w-20 h-20 rounded object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">₹{item.price}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="font-bold text-lg mb-4">Summary</h2>

        <p>
          Payment Method:{" "}
          <span className="font-semibold">
            {order.paymentMethod}
          </span>
        </p>

        <p>
          Payment Status:{" "}
          <span className="font-semibold">
            {order.paymentStatus}
          </span>
        </p>

        <p className="text-xl font-bold mt-2">
          Total: ₹{order.totalPrice}
        </p>

        {order.status === "Processing" && (
          <button
            onClick={cancelOrder}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}
