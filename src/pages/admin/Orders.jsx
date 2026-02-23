import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await api.get("/orders");
    setOrders(data.orders || []);
  };

  const badgeColor = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-700";
    if (status === "Shipped") return "bg-blue-100 text-blue-700";
    if (status === "Cancelled") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  // Pagination logic
  const totalPages = Math.ceil(orders.length / perPage);

  const paginatedOrders = orders.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">

      {/* INNER WRAPPER */}
      <div className="flex-1 px-10 py-8 max-w-[1600px] mx-auto w-full">

        <h1 className="text-3xl font-bold mb-10">Orders Management</h1>

        {/* ORDER GRID */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">

          {paginatedOrders.map((o) => (
            <div
              key={o._id}
              onClick={() => setSelected(o)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">
                  #{o._id.slice(-6)}
                </span>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${badgeColor(o.status)}`}
                >
                  {o.status}
                </span>
              </div>

              <p className="text-2xl font-bold text-gray-800">
                ₹{o.totalPrice}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(o.createdAt).toLocaleString()}
              </p>

              <p className="text-sm text-gray-600 mt-3">
                {o.shippingAddress?.city}, {o.shippingAddress?.country}
              </p>
            </div>
          ))}

        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-auto pt-12 pb-6">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-lg border bg-white disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-lg border font-medium transition ${
                  page === i + 1
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-lg border bg-white disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}

      </div>

      {/* ================= MODAL ================= */}

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh] relative">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <div className="p-8">

              <h2 className="text-2xl font-bold mb-6">Order Details</h2>

              <div className="grid md:grid-cols-2 gap-6 text-sm mb-8">
                <div>
                  <p><b>Order ID:</b> {selected._id}</p>
                  <p><b>Status:</b> {selected.status}</p>
                  <p><b>Payment:</b> {selected.paymentMethod}</p>
                </div>
                <div>
                  <p><b>Date:</b> {new Date(selected.createdAt).toLocaleString()}</p>
                  <p><b>Total:</b> ₹{selected.totalPrice}</p>
                </div>
              </div>

              <div className="bg-gray-100 p-5 rounded-xl mb-6 text-sm">
                <p><b>Name:</b> {selected.shippingAddress?.fullName}</p>
                <p><b>Phone:</b> {selected.shippingAddress?.phone}</p>
              </div>

              <div className="bg-gray-100 p-5 rounded-xl mb-8">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p className="text-sm">
                  {selected.shippingAddress?.address},{" "}
                  {selected.shippingAddress?.city},{" "}
                  {selected.shippingAddress?.postalCode},{" "}
                  {selected.shippingAddress?.country}
                </p>
              </div>

              <h3 className="font-semibold mb-4 text-lg">Ordered Items</h3>

              {selected.orderItems?.map((item, idx) => {
                const qty = item.quantity || 1;

                return (
                  <div
                    key={idx}
                    className="flex gap-4 items-center border-b pb-4 mb-4"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />

                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {qty} × ₹{item.price}
                      </p>
                    </div>

                    <div className="font-semibold">
                      ₹{qty * item.price}
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}