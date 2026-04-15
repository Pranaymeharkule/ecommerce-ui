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
    if (status === "Delivered") return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    if (status === "Shipped") return "bg-indigo-50 text-indigo-700 border border-indigo-200";
    if (status === "Cancelled") return "bg-rose-50 text-rose-700 border border-rose-200";
    return "bg-amber-50 text-amber-700 border border-amber-200";
  };

  // Pagination logic
  const totalPages = Math.ceil(orders.length / perPage);

  const paginatedOrders = orders.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex flex-col">

      {/* INNER WRAPPER */}
      <div className="flex-1 px-6 sm:px-10 py-10 max-w-[1600px] mx-auto w-full">

        <h1 className="text-3xl font-bold mb-10 text-slate-900 tracking-tight">Orders Management</h1>

        {/* ORDER GRID */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">

          {paginatedOrders.map((o) => (
            <div
              key={o._id}
              onClick={() => setSelected(o)}
              className="bg-white/90 backdrop-blur rounded-3xl shadow-[0_10px_30px_rgba(225,29,72,0.03)] hover:shadow-[0_20px_40px_rgba(225,29,72,0.08)] transition-all duration-300 p-8 cursor-pointer border border-rose-100 hover:border-rose-200"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-rose-400 uppercase tracking-widest">
                  #{o._id.slice(-6)}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${badgeColor(o.status)}`}
                >
                  {o.status}
                </span>
              </div>

              <p className="text-3xl font-extrabold text-slate-900">
                ₹{o.totalPrice}
              </p>

              <p className="text-sm font-medium text-slate-400 mt-2">
                {new Date(o.createdAt).toLocaleString()}
              </p>

              <p className="text-sm font-medium text-slate-600 mt-4 border-t border-rose-50 pt-4">
                📍 {o.shippingAddress?.city}, {o.shippingAddress?.country}
              </p>
            </div>
          ))}

        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-auto pt-16 pb-6">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-5 py-2.5 rounded-xl border border-rose-200 bg-white text-slate-600 font-medium disabled:opacity-40 hover:bg-rose-50 transition"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-11 h-11 rounded-xl border font-bold transition duration-300 ${
                  page === i + 1
                    ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200"
                    : "bg-white text-slate-600 border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-5 py-2.5 rounded-xl border border-rose-200 bg-white text-slate-600 font-medium disabled:opacity-40 hover:bg-rose-50 transition"
            >
              Next
            </button>

          </div>
        )}

      </div>

      {/* ================= MODAL ================= */}

      {selected && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-y-auto max-h-[95vh] relative border border-rose-100">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-2xl text-slate-400 hover:text-rose-600 transition bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            <div className="p-10">

              <h2 className="text-3xl font-bold mb-8 text-slate-900">Order Details</h2>

              <div className="grid md:grid-cols-2 gap-6 text-sm mb-8">
                <div className="space-y-2 text-slate-600">
                  <p><b className="text-slate-900">Order ID:</b> {selected._id}</p>
                  <p><b className="text-slate-900">Status:</b> <span className={badgeColor(selected.status) + " px-2 py-0.5 rounded ml-1"}>{selected.status}</span></p>
                  <p><b className="text-slate-900">Payment:</b> {selected.paymentMethod}</p>
                </div>
                <div className="space-y-2 text-slate-600">
                  <p><b className="text-slate-900">Date:</b> {new Date(selected.createdAt).toLocaleString()}</p>
                  <p className="text-lg"><b className="text-slate-900">Total:</b> <span className="text-rose-600 font-bold">₹{selected.totalPrice}</span></p>
                </div>
              </div>

              <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl mb-6 text-sm">
                <p className="font-semibold text-slate-900 mb-1">Customer Info</p>
                <p className="text-slate-700">{selected.shippingAddress?.fullName}</p>
                <p className="text-slate-700">{selected.shippingAddress?.phone}</p>
              </div>

              <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-2xl mb-10">
                <h3 className="font-semibold text-slate-900 mb-2">Shipping Address</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selected.shippingAddress?.address},<br/>
                  {selected.shippingAddress?.city}, {selected.shippingAddress?.postalCode},<br/>
                  {selected.shippingAddress?.country}
                </p>
              </div>

              <h3 className="font-bold mb-6 text-xl text-slate-900 border-b border-rose-100 pb-4">Ordered Items</h3>

              <div className="space-y-6">
                {selected.orderItems?.map((item, idx) => {
                  const qty = item.quantity || 1;

                  return (
                    <div
                      key={idx}
                      className="flex gap-6 items-center bg-white border border-rose-50 shadow-sm p-4 rounded-2xl hover:shadow-md transition"
                    >
                      <img
                        src={item.image || "https://via.placeholder.com/100"}
                        className="w-24 h-24 object-cover rounded-xl border border-rose-100"
                      />

                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-lg">{item.name}</p>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                          Qty: {qty} <span className="mx-2">•</span> ₹{item.price} each
                        </p>
                      </div>

                      <div className="font-extrabold text-xl text-rose-600">
                        ₹{qty * item.price}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}