import { Routes, Route } from "react-router-dom";
import MyOrders from "../pages/customer/MyOrders";
import OrderDetails from "../pages/customer/OrderDetails";

import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import Orders from "../pages/customer/MyOrders";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import OrderSuccess from "../pages/customer/OrderSuccess";

export default function CustomerRoutes() {
  return (
    <Routes>
     <Route element={<CustomerLayout />}>
 <Route path="/" element={<Home />} />
 <Route path="/product/:id" element={<ProductDetails />} />
 <Route path="/cart" element={<Cart />} />
 <Route path="/checkout" element={<Checkout />} />
 <Route path="/orders" element={<Orders />} />
 <Route path="/my-orders" element={<MyOrders />} />
 <Route path="/order/:id" element={<OrderDetails />} />
</Route>

{/* SUCCESS PAGE OUTSIDE LAYOUT */}
<Route path="/order-success/:orderId" element={<OrderSuccess />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
