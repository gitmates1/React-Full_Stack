// FrontEnd/src/pages/AdminDashboard.jsx

import { useEffect, useState } from "react";
import { FiLogOut, FiChevronRight, FiHome, FiShoppingBag, FiBell } from "react-icons/fi";
import { AiFillProduct, AiOutlineAppstore, AiOutlinePound } from "react-icons/ai";
import { BsFillPeopleFill, BsFillPencilFill } from "react-icons/bs";
import { AiFillRobot } from "react-icons/ai";
import { useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";

import ViewCustomers from "./Customers/ViewCustomers";
import ViewOrders from "./Orders/ViewOrders";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalProducts: 0,
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Load dashboard stats
  const loadStats = async () => {
    try {
      const res = await axios.get("/api/admin/stats", {
        headers: { "x-auth-token": token },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  useEffect(() => {
    // Redirect if not logged in
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) navigate("/login");
    else setUser(storedUser);

    // Load stats
    loadStats();
    const interval = setInterval(loadStats, 5000); // optional auto-refresh
    return () => clearInterval(interval);
  }, [navigate]);

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!document.querySelector(".profile-container")?.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setTimeout(() => alert("You are logged out."), 300);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="menu">
          <li className="active" onClick={() => navigate("/admin-dashboard")}>
            <AiOutlineAppstore /> Home
          </li>

          {/* Orders Dropdown */}
          <li className="dropdown-header" onClick={() => toggleDropdown("orders")}>
            <FiShoppingBag /> Orders <FiChevronRight className={`arrow ${openDropdown === "orders" ? "rotate" : ""}`} />
          </li>
          {openDropdown === "orders" && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/admin/orders/add")}>Add Order</li>
              <li onClick={() => navigate("/admin/orders")}>View Orders</li>
            </ul>
          )}

          {/* Products Dropdown */}
          <li className="dropdown-header" onClick={() => toggleDropdown("products")}>
            <AiFillProduct /> Products <FiChevronRight className={`arrow ${openDropdown === "products" ? "rotate" : ""}`} />
          </li>
          {openDropdown === "products" && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/admin/products/add")}>Add Product</li>
              <li onClick={() => navigate("/admin/products")}>View Products</li>
            </ul>
          )}

          {/* Customers Dropdown */}
          <li className="dropdown-header" onClick={() => toggleDropdown("customers")}>
            <BsFillPeopleFill /> Customers <FiChevronRight className={`arrow ${openDropdown === "customers" ? "rotate" : ""}`} />
          </li>
          {openDropdown === "customers" && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/admin/customers")}>View Customers</li>
              <li onClick={() => navigate("/admin/customers/add")}>Add Customer</li>
            </ul>
          )}

          <li><FiBell /> Notifications</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="dashboard-header">
          <div className="main-dashpro">
            <h3><FiHome /> Dashboard</h3>

            {/* Profile Dropdown */}
            <div className="profile-container">
              <div className="profile-icon" onClick={(e) => { e.stopPropagation(); setShowProfileMenu(!showProfileMenu); }}>
                <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="profile" className="profile-img" />
              </div>

              {showProfileMenu && (
                <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
                  <p onClick={() => navigate("/profile")}><BsFillPencilFill /> My Profile</p>
                  <p onClick={handleLogout}><FiLogOut /> Signout</p>
                </div>
              )}
            </div>
          </div>
          <p>Welcome, {user?.name || "User"} 👋</p>
        </header>

        {/* Dashboard Stats */}
        <div className="box">
          <div className="boxes"><h3>Total Sales</h3><p>{stats.totalSales}</p></div>
          <div className="boxes"><h3>Total Orders</h3><p>{stats.totalOrders}</p></div>
          <div className="boxes"><h3>Total Customers</h3><p>{stats.totalCustomers}</p></div>
          <div className="boxes"><h3>Total Products</h3><p>{stats.totalProducts}</p></div>
        </div>

        {/* Child Routes */}
        <Routes>
          <Route path="/admin/customers" element={<ViewCustomers refreshStats={loadStats} />} />
          <Route path="/admin/orders" element={<ViewOrders refreshStats={loadStats} />} />
        </Routes>
        
<br></br><hr></hr><br></br>

        <div className="button">
          <button className="buttons"> Recent Orders {/* All Orders */} </button>
          <button className="buttons"> Update Status {/* Mark P/C/C */} </button>
          <button className="buttons"> Orders History {/* Customers Order History */} </button>
          <button className="buttons"> Manage Refunds {/* Customers Refund Payment */} </button>
          <button className="buttons"> Manage Payments {/* Payments Pending or Issues */} </button>
          <button className="buttons"> Shipping Zone {/* Track Shipping */} </button>
        </div>

        <div className="recent-side">
          <section className="recent-orders">
            <h4>Orders</h4>
            {/* Table */}
            <div className="table-scroll">
              <table>
                <tbody>
                  <thead>
                    <th>Order ID</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Order Date</th>
                    <tr>
                      <td>13313</td>
                      <td>23434</td>
                      <td>T-Shirt</td>
                      <td>2</td>
                      <td>Rs.10,000</td>
                      <td className="status-pending">Pending</td>
                      <td>22 Nov 2025</td>
                    </tr>
                    <tr>
                      <td>13313</td>
                      <td>23434</td>
                      <td>T-Shirt</td>
                      <td>2</td>
                      <td>Rs.10,000</td>
                      <td className="status-pending">Pending</td>
                      <td>22 Nov 2025</td>
                    </tr>
                    <tr>
                      <td>13313</td>
                      <td>23434</td>
                      <td>T-Shirt</td>
                      <td>2</td>
                      <td>Rs.10,000</td>
                      <td className="status-pending">Pending</td>
                      <td>22 Nov 2025</td>
                    </tr>
                    <tr>
                      <td>13313</td>
                      <td>23434</td>
                      <td>T-Shirt</td>
                      <td>2</td>
                      <td>Rs.10,000</td>
                      <td className="status-pending">Pending</td>
                      <td>22 Nov 2025</td>
                    </tr>
                    <tr>
                      <td>13313</td>
                      <td>23434</td>
                      <td>T-Shirt</td>
                      <td>2</td>
                      <td>Rs.10,000</td>
                      <td className="status.pending">Pending</td>
                      <td>22 Nov 2025</td>
                    </tr>
                    <tr>
                      <td>13313</td>
                      <td>23434</td>
                      <td>T-Shirt</td>
                      <td>2</td>
                      <td>Rs.10,000</td>
                      <td className="status.pending">Pending</td>
                      <td>22 Nov 2025</td>
                    </tr>
                    <tr>
                      <td>13313</td>
                      <td>23434</td>
                      <td>T-Shirt</td>
                      <td>2</td>
                      <td>Rs.10,000</td>
                      <td className="status.pending">Pending</td>
                      <td>22 Nov 2025</td>
                    </tr>
                  </thead>
                </tbody>
              </table>
            </div>
          </section>

          <section className="side-content">
            <h3>AI Chatbot</h3> <p><AiFillRobot /> Hi, Outfitly Chatbot is here.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
