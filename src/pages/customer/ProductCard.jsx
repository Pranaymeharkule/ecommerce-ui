import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-100 border border-rose-50 transition duration-300">

      <img
        src={product.images?.[0]}
        className="w-full h-64 object-cover"
      />

      <div className="p-5 space-y-3">

        <h3 className="font-bold text-slate-900 truncate text-lg">{product.name}</h3>

        <p className="text-sm text-slate-500 line-clamp-1">
          {product.description}
        </p>

        <div className="flex justify-between items-center pt-3 border-t border-rose-50">

          <span className="font-extrabold text-rose-600 text-lg">₹{product.price}</span>

          <Link
            to={`/product/${product._id}`}
            className="text-sm font-semibold bg-rose-600 text-white px-5 py-2 rounded-full hover:bg-rose-700 shadow-md shadow-rose-200 transition"
          >
            View
          </Link>

        </div>
      </div>
    </div>
  );
}