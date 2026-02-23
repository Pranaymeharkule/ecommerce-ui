import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition overflow-hidden">

        <img
          src={product.images?.[0]}
          className="h-56 w-full object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold truncate">{product.name}</h3>

          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <span className="font-bold text-lg">₹{product.price}</span>

            <span className="text-xs bg-black text-white px-3 py-1 rounded">
              View
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
