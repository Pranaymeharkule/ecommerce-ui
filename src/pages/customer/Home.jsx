import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/customer/ProductCard";
import Hero from "../../components/common/Hero";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Login from "../auth/Login";

const categories = ["All", "Cotton", "Party Wear", "Special", "Kurties", "Bags"];
const ITEMS_PER_PAGE = 8;

export default function Home() {
  const { user, loading: authLoading } = useAuth(); // ✅ added

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `/products?search=${search || ""}`;
      if (selectedCategory !== "All") url += `&category=${selectedCategory}`;

      const { data } = await api.get(url);
      setProducts(data.data || []);
      setPage(1);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, search]);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = products.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  if (authLoading) return null;

  return (
    <div className="bg-gradient-to-b from-rose-50 via-white to-pink-50">

      <Hero />

      

      <div className="max-w-[1500px] mx-auto px-6 lg:px-20 py-20">

        {/* CATEGORY */}
        <div className="flex flex-wrap justify-center gap-5 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-full border text-lg font-medium transition duration-300
                ${
                  selectedCategory === cat
                    ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200"
                    : "bg-white text-slate-600 border-rose-200 hover:border-rose-600 hover:text-rose-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="text-5xl font-semibold mb-14 text-center text-slate-900">
          Latest Collection
        </h2>

        {/* GRID */}
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-12">
          {paginated.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-20">

            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-6 py-2 border border-rose-200 text-rose-600 font-medium rounded-full disabled:opacity-40 hover:bg-rose-50 transition"
            >
              Prev
            </button>

            <span className="px-4 py-2 font-medium text-slate-600">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-6 py-2 border border-rose-200 text-rose-600 font-medium rounded-full disabled:opacity-40 hover:bg-rose-50 transition"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </div>
  );
}