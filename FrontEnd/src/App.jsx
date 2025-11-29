// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";

// Public Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PriceComparison from "./components/PriceComparison";

// Auth / User
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";

// Admin
import AdminDashboard from "./pages/AdminDashboard";

// Customers CRUD
import ViewCustomers from "./pages/Customers/ViewCustomers";
import AddCustomer from "./pages/Customers/AddCustomer";
import UpdateCustomer from "./pages/Customers/UpdateCustomer";

// Orders CRUD
import ViewOrders from "./pages/Orders/ViewOrders";
import AddOrder from "./pages/Orders/AddOrder";
import UpdateOrder from "./pages/Orders/UpdateOrder";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<><Home /><PriceComparison /></>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* User Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Customers CRUD (Admin Only) */}
        <Route
          path="/admin/customers"
          element={
            <ProtectedRoute role="admin">
              <ViewCustomers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers/add"
          element={
            <ProtectedRoute role="admin">
              <AddCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/customers/update/:id"
          element={
            <ProtectedRoute role="admin">
              <UpdateCustomer />
            </ProtectedRoute>
          }
        />

        {/* Orders CRUD (Admin Only) */}
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="admin">
              <ViewOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders/add"
          element={
            <ProtectedRoute role="admin">
              <AddOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders/update/:id"
          element={
            <ProtectedRoute role="admin">
              <UpdateOrder />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;