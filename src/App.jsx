import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* CUSTOMER */
import Home from "./pages/customer/Home";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import MyOrders from "./pages/customer/MyOrders";
import OrderDetails from "./pages/customer/OrderDetails";
import ProductDetails from "./pages/customer/ProductDetails";
import About from "./pages/customer/About";
import Contact from "./pages/customer/Contact";
import OrderSuccess from "./pages/customer/OrderSuccess";

/* LAYOUT + GUARD */
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerGuard from "./guards/CustomerGuard";

/* ADMIN */
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {

  const { loading } = useContext(AuthContext);

  if (loading) return null; // prevent flicker

  return (
    <Routes>

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* CUSTOMER */}
      <Route
        element={
          <CustomerGuard>
            <CustomerLayout />
          </CustomerGuard>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin/*" element={<AdminRoutes />} />

    </Routes>
  );
}