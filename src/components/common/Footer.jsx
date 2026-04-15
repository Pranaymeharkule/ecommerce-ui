import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const nav = useNavigate();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 border-t border-rose-100">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Fashion Store</h2>

          <p className="text-sm leading-relaxed text-slate-400">
            Premium kurtis, party wear and trending fashion collections curated just for you.
          </p>

          <div className="flex gap-4 mt-6">
            <Social Icon={FaFacebookF}/>
            <Social Icon={FaInstagram}/>
            <Social Icon={FaTwitter}/>
          </div>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wide">Categories</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li onClick={()=>nav("/")} className="hover:text-rose-400 transition cursor-pointer">Cotton</li>
            <li onClick={()=>nav("/")} className="hover:text-rose-400 transition cursor-pointer">Party Wear</li>
            <li onClick={()=>nav("/")} className="hover:text-rose-400 transition cursor-pointer">Special</li>
            <li onClick={()=>nav("/")} className="hover:text-rose-400 transition cursor-pointer">Kurties</li>
            <li onClick={()=>nav("/")} className="hover:text-rose-400 transition cursor-pointer">Bags</li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wide">Customer Care</h3>

          <ul className="space-y-2 text-sm text-slate-400">
            <li onClick={()=>nav("/my-orders")} className="hover:text-rose-400 transition cursor-pointer">
              My Orders
            </li>
            <li className="hover:text-rose-400 transition cursor-pointer">Returns</li>
            <li className="hover:text-rose-400 transition cursor-pointer">Shipping Info</li>
            <li onClick={()=>nav("/contact")} className="hover:text-rose-400 transition cursor-pointer">Contact Us</li>
            <li onClick={()=>nav("/about")} className="hover:text-rose-400 transition cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* TRUST */}
        <div>
          <h3 className="text-white font-semibold mb-4 tracking-wide">Why Shop With Us?</h3>

          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2"><span className="text-rose-500">✔</span> Secure Payments</li>
            <li className="flex items-center gap-2"><span className="text-rose-500">✔</span> Fast Delivery</li>
            <li className="flex items-center gap-2"><span className="text-rose-500">✔</span> Easy Returns</li>
            <li className="flex items-center gap-2"><span className="text-rose-500">✔</span> 24/7 Support</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-800 mt-12 py-6 bg-slate-950">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-slate-500">
            © 2026 Fashion Store. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm text-slate-500 font-medium">
            <span className="hover:text-slate-300 transition cursor-pointer">Visa</span>
            <span className="hover:text-slate-300 transition cursor-pointer">Mastercard</span>
            <span className="hover:text-slate-300 transition cursor-pointer">UPI</span>
            <span className="hover:text-slate-300 transition cursor-pointer">Paytm</span>
          </div>

        </div>

      </div>

    </footer>
  );
}

const Social = ({ Icon }) => (
  <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition cursor-pointer shadow-lg hover:shadow-rose-500/30">
    <Icon size={14}/>
  </div>
);