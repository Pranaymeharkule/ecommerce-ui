import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUpload, FiTrash2, FiPlus, FiArrowLeft, 
  FiShoppingBag, FiInfo, FiLayers 
} from "react-icons/fi";

const categories = ["Cotton", "Party Wear", "Special", "Kurties", "Bags"];
const sub = ["Readymade", "Unstitched Fabric", "Trending", "Clutches"];

export default function CreateProduct() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", price: "", stock: "", description: "",
    category: "Cotton", subCategory: "Readymade", images: []
  });

  const uploadImage = async (e) => {
    const files = Array.from(e.target.files);
    if (form.images.length + files.length > 4) return alert("Maximum 4 images allowed.");
    setLoading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("image", file);
        const { data } = await api.post("/upload", fd);
        uploaded.push(data.url);
      }
      setForm((p) => ({ ...p, images: [...p.images, ...uploaded] }));
    } catch (err) {
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== index) }));
  };

  const submit = async () => {
    if (!form.images.length) return alert("Please upload at least one image.");
    setLoading(true);
    try {
      await api.post("/products", { ...form, price: Number(form.price), stock: Number(form.stock) });
      nav("/admin/products");
    } catch (err) {
      alert("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* SIMPLE HEADER */}
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={() => nav("/admin/products")}
          className="p-3 bg-white border border-slate-100 rounded-full hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900"
        >
          <FiArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900">Add New Kurti</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-black mt-1">Boutique Entry</p>
        </div>
        <div className="w-11" /> {/* Spacer for symmetry */}
      </div>

      <div className="space-y-8">
        {/* IMAGE UPLOAD AREA */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <FiUpload className="text-amber-500" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Visual Gallery</h3>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            <AnimatePresence>
              {form.images.map((img, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={i} 
                  className="relative min-w-[150px] h-[200px] rounded-2xl overflow-hidden shadow-md group"
                >
                  <img src={img} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {form.images.length < 4 && (
              <label className="min-w-[150px] h-[200px] border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 transition-all group">
                <input hidden type="file" multiple onChange={uploadImage} />
                <div className="p-3 bg-slate-50 rounded-full group-hover:scale-110 transition-transform">
                  <FiPlus className="text-slate-400 group-hover:text-amber-500" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase">Add Image</span>
              </label>
            )}
          </div>
        </section>

        {/* BASIC INFO */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
          <div className="flex items-center gap-2 mb-2">
            <FiInfo className="text-amber-500" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Product Essentials</h3>
          </div>

          <div className="grid gap-6">
            <div className="relative">
              <input 
                placeholder="Product Name"
                className="w-full text-xl font-serif font-bold border-b border-slate-100 py-4 focus:border-amber-400 outline-none transition-all placeholder:text-slate-200"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>

            <textarea 
              placeholder="Tell the story of this design..."
              rows="3"
              className="w-full text-sm font-medium border-b border-slate-100 py-4 focus:border-amber-400 outline-none transition-all placeholder:text-slate-200 resize-none"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Retail Price</label>
              <div className="flex items-center gap-2 border-b border-slate-100 focus-within:border-amber-400 transition-all">
                <span className="font-bold text-slate-400">₹</span>
                <input 
                  type="number"
                  placeholder="0.00"
                  className="w-full py-3 text-lg font-bold outline-none bg-transparent"
                  value={form.price}
                  onChange={e => setForm({...form, price: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock Units</label>
              <div className="flex items-center gap-2 border-b border-slate-100 focus-within:border-amber-400 transition-all">
                <FiShoppingBag className="text-slate-400" />
                <input 
                  type="number"
                  placeholder="0"
                  className="w-full py-3 text-lg font-bold outline-none bg-transparent"
                  value={form.stock}
                  onChange={e => setForm({...form, stock: e.target.value})}
                />
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIZATION */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <FiLayers className="text-amber-500" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Categorization</h3>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Main Category</label>
              <select 
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-amber-400 transition-all appearance-none cursor-pointer"
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Sub-Collection</label>
              <select 
                value={form.subCategory}
                onChange={e => setForm({...form, subCategory: e.target.value})}
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-amber-400 transition-all appearance-none cursor-pointer"
              >
                {sub.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* ACTION BUTTON */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={submit}
          disabled={loading}
          className="w-full bg-[#0f172a] text-amber-400 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          {loading ? "Adding to Collection..." : "Publish to Boutique"}
        </motion.button>
      </div>
    </div>
  );
}