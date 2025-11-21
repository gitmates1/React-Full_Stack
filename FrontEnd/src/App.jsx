// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PriceComparison from "./components/PriceComparison";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import ScrollToTop from "./ScrollToTop";
import AdminUsers from "./pages/AdminUsers";
import UpdateUser from "./pages/UpdateUser";
import ViewUser from "./pages/ViewUser";
import DeleteUser from "./pages/DeleteUser";
import Profile from "./pages/Profile"

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

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/update/:id" element={<UpdateUser />} />
        <Route path="/admin/users/view/:id" element={<ViewUser />} />
        <Route path="/admin/users/delete/:id" element={<DeleteUser />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
