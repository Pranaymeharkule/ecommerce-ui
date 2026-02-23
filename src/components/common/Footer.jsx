import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const nav = useNavigate();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Fashion Store</h2>

          <p className="text-sm leading-relaxed">
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
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li onClick={()=>nav("/")} className="hover:text-white cursor-pointer">Cotton</li>
            <li onClick={()=>nav("/")} className="hover:text-white cursor-pointer">Party Wear</li>
            <li onClick={()=>nav("/")} className="hover:text-white cursor-pointer">Special</li>
            <li onClick={()=>nav("/")} className="hover:text-white cursor-pointer">Kurties</li>
            <li onClick={()=>nav("/")} className="hover:text-white cursor-pointer">Bags</li>
          </ul>
        </div>

        {/* CUSTOMER CARE */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer Care</h3>

          <ul className="space-y-2 text-sm">
            <li onClick={()=>nav("/my-orders")} className="hover:text-white cursor-pointer">
              My Orders
            </li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Shipping Info</li>
<li onClick={()=>nav("/contact")} className="hover:text-white cursor-pointer">Contact Us</li>
<li onClick={()=>nav("/about")} className="hover:text-white cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* TRUST */}
        <div>
          <h3 className="text-white font-semibold mb-4">Why Shop With Us?</h3>

          <ul className="space-y-3 text-sm">
            <li>✔ Secure Payments</li>
            <li>✔ Fast Delivery</li>
            <li>✔ Easy Returns</li>
            <li>✔ 24/7 Support</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 mt-12 py-6">

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm">
            © 2026 Fashion Store. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>UPI</span>
            <span>Paytm</span>
          </div>

        </div>

      </div>

    </footer>
  );
}

const Social = ({ Icon }) => (
  <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer">
    <Icon size={14}/>
  </div>
);