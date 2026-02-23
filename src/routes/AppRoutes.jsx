import { Routes, Route } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";

import Home from "../pages/customer/Home";
import Login from "../pages/auth/Login";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import MyOrders from "../pages/customer/MyOrders";
import ProductDetails from "../pages/customer/ProductDetails";

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <CustomerLayout>
            <Home />
          </CustomerLayout>
        }
      />

      <Route
        path="/cart"
        element={
          <CustomerLayout>
            <Cart />
          </CustomerLayout>
        }
      />

      <Route
        path="/checkout"
        element={
          <CustomerLayout>
            <Checkout />
          </CustomerLayout>
        }
      />

      <Route
        path="/my-orders"
        element={
          <CustomerLayout>
            <MyOrders />
          </CustomerLayout>
        }
      />

      <Route
        path="/product/:id"
        element={
          <CustomerLayout>
            <ProductDetails />
          </CustomerLayout>
        }
      />

      <Route path="/login" element={<Login />} />

    </Routes>
  );
}