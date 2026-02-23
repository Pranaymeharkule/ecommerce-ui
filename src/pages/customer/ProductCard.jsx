import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:-translate-y-2 transition duration-300">

      <img
        src={product.images?.[0]}
        className="w-full h-56 object-cover"
      />

      <div className="p-4 space-y-2">

        <h3 className="font-medium truncate">{product.name}</h3>

        <p className="text-sm text-gray-400 line-clamp-1">
          {product.description}
        </p>

        <div className="flex justify-between items-center pt-2">

          <span className="font-semibold">₹{product.price}</span>

          <Link
            to={`/product/${product._id}`}
            className="text-xs bg-black text-white px-4 py-1 rounded-full"
          >
            View
          </Link>

        </div>
      </div>
    </div>
  );
}