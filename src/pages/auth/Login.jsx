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
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">

    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

      {/* HEADER */}
      <div className="bg-black text-white p-6 text-center">
        <h2 className="text-2xl font-bold">Welcome</h2>
        <p className="text-sm text-gray-300 mt-1">
          Login to continue shopping or manage products
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={submitHandler} className="p-6 space-y-4">

        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            className="border rounded-lg w-full p-2 mt-1 focus:outline-none focus:ring"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Password</label>
          <input
            type="password"
            className="border rounded-lg w-full p-2 mt-1 focus:outline-none focus:ring"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Login
        </button>

      </form>

      {/* REGISTER */}
      <div className="px-6 pb-4 text-center">

        <p className="text-sm text-gray-500 mb-2">
          Don’t have an account?
        </p>

        <button
          onClick={()=>navigate("/register")}
          className="border w-full py-2 rounded-lg hover:bg-gray-50 transition"
        >
          Create Account
        </button>

      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-400 pb-4">
        Secure login • Ecommerce Platform
      </div>

    </div>

  </div>
);
}