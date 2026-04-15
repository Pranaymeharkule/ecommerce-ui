import { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);   // DEBUG

      const token = res.data.token;
      const user = res.data.data;   // ⭐ THIS IS USER OBJECT

      // SAVE INTO CONTEXT + SESSION
      login(token, user);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4">

      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-[0_25px_60px_rgba(225,29,72,0.08)] border border-rose-100 w-full max-w-md overflow-hidden">

        {/* HEADER */}
        <div className="bg-rose-600 text-white p-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-sm text-rose-100 mt-2 font-medium">
            Login to continue shopping or manage products
          </p>
        </div>

        {/* FORM */}
        <div className="p-8">
          <form onSubmit={submitHandler} className="space-y-5">

            <div>
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input
                className="border border-rose-200 rounded-xl w-full p-3 mt-1.5 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                className="border border-rose-200 rounded-xl w-full p-3 mt-1.5 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-rose-600 text-white font-semibold w-full py-3.5 rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition duration-300 mt-2"
            >
              Login Securely
            </button>

          </form>

          {/* REGISTER */}
          <div className="pt-8 text-center border-t border-rose-100 mt-8">

            <p className="text-sm text-slate-500 mb-3 font-medium">
              Don’t have an account?
            </p>

            <button
              onClick={() => navigate("/register")}
              className="border-2 border-rose-100 text-slate-700 font-medium w-full py-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition duration-300"
            >
              Create Account
            </button>

          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-slate-50 text-center text-xs text-slate-400 py-4 border-t border-rose-50">
          🔒 Secure login • Premium Fashion
        </div>

      </div>

    </div>
  );
}