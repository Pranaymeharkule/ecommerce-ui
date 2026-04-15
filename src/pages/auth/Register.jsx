import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer"
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      });

      alert("Account created successfully");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT HERO */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-rose-600 via-rose-500 to-pink-600 text-white p-12 relative overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-900/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Join the Club.</h1>
          <p className="text-rose-100 text-lg max-w-md leading-relaxed">
            Create an account to unlock premium fashion, fast checkout, and exclusive seasonal collections.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center bg-gradient-to-b from-rose-50 via-white to-pink-50 px-4 py-12">

        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl shadow-rose-100 border border-rose-50 w-full max-w-md p-10">

          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Create Account</h2>

          <form onSubmit={submitHandler} className="space-y-5">

            <div>
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <input
                className="border border-rose-200 rounded-xl w-full p-3 mt-1.5 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition"
                placeholder="Enter name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input
                className="border border-rose-200 rounded-xl w-full p-3 mt-1.5 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition"
                placeholder="Enter email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                className="border border-rose-200 rounded-xl w-full p-3 mt-1.5 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition"
                placeholder="Enter password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Confirm Password</label>
              <input
                type="password"
                className="border border-rose-200 rounded-xl w-full p-3 mt-1.5 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
              />
            </div>

            {/* ROLE */}

            <button
              type="submit"
              className="bg-rose-600 text-white font-bold w-full py-3.5 rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition duration-300 mt-4"
            >
              Create Account
            </button>

          </form>

          <div className="mt-8 pt-8 border-t border-rose-100 text-center">
            <div className="text-sm font-medium text-slate-500 mb-3">
              Already have an account?
            </div>

            <button
              onClick={() => navigate("/login")}
              className="border-2 border-rose-100 text-slate-700 font-medium w-full py-3 rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition duration-300"
            >
              Sign In Instead
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}