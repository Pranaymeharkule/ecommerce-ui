import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
import CreateProduct from "../pages/admin/CreateProduct";
import EditProduct from "../pages/admin/EditProduct";

import AdminLayout from "../layouts/AdminLayout";
import AdminGuard from "../guards/AdminGuard";

export default function AdminRoutes() {
  return (
    <AdminGuard>
      <AdminLayout>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
        </Routes>

      </AdminLayout>
    </AdminGuard>
  );
}