import { useEffect, useState } from "react";
import api from "../../api/axios";
import ProductCard from "../../components/customer/ProductCard";
import Hero from "../../components/common/Hero";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const categories = ["All", "Cotton", "Party Wear", "Special", "Kurties", "Bags"];
const ITEMS_PER_PAGE = 8;

export default function Home() {
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

  return (
    <div className="bg-gradient-to-b from-[#faf7f4] via-white to-[#f4efe9]">

      <Hero />

      <div className="max-w-[1500px] mx-auto px-6 lg:px-20 py-20">

        {/* CATEGORY */}
        <div className="flex flex-wrap justify-center gap-5 mb-16  ">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-full border text-lg transition
                ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-white hover:bg-black hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <h2 className="text-5xl font-semibold mb-14 text-center">
          Latest Collection
        </h2>

        {/* GRID */}
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-12">
          {paginated.map((product, i) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-20">

            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-6 py-2 border rounded-full disabled:opacity-40"
            >
              Prev
            </button>

            <span className="px-4 py-2">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-6 py-2 border rounded-full disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </div>
  );
}