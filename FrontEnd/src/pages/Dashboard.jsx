import React, { useEffect, useState } from "react";
import { FiSettings, FiLogOut, FiHeart, FiShoppingBag, FiShoppingCart, FiBell, FiHelpCircle, FiChevronRight, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { AiFillProduct, AiFillRobot, AiOutlineAppstore, AiOutlinePound } from "react-icons/ai";
import { BsFillPencilFill, BsFillPeopleFill } from "react-icons/bs";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); // dropdown state
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [stats, setStats] = useState({ totalOrders: 0, totalWishlist: 0, totalCart: 0, totalProduct: 0, });

  const navigate = useNavigate();
  useEffect(() => { const storedUser = JSON.parse(localStorage.getItem("user")); if (!storedUser) navigate("/login"); else setUser(storedUser); }, [navigate]);

  // Close profile menu on outside click
  useEffect(() => { const handleClickOutside = (e) => { if (!document.querySelector(".profile-container")?.contains(e.target)) { setShowProfileMenu(false); } }; document.addEventListener("click", handleClickOutside); return () => { document.removeEventListener("click", handleClickOutside); }; }, []);

  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login"); setTimeout(() => alert("You are now logout."), 300); };
  const toggleDropdown = (menu) => { setOpenDropdown(prev => (prev === menu ? null : menu)); };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="menu">
          <li className="active"><AiOutlineAppstore /> Home</li>

          {/* Orders ---- Dropdown */}
          <li className="dropdown-header" onClick={() => toggleDropdown("orders")}>
            <FiShoppingBag /> Orders
            <FiChevronRight className={`arrow ${openDropdown === "orders" ? "rotate" : ""}`} />
          </li>

          {openDropdown === "orders" && (
            <ul className="dropdown-menu">
              <li>Track Orders</li>
              <li>Orders History</li>
            </ul>
          )}

          {/* Wishlist */}
          <li><FiHeart /> Wishlist</li>

          {/* Products ---- Dropdown */}
          <li className="dropdown-header" onClick={() => toggleDropdown("products")}>
            <AiFillProduct /> Products
            <FiChevronRight className={`arrow ${openDropdown === "products" ? "rotate" : ""}`} />
          </li>

          {openDropdown === "products" && (
            <ul className="dropdown-menu">
              <li>View Products</li>
            </ul>
          )}

          {/* Payments */}
          <li><AiOutlinePound /> Payments </li>

          {/* Other static items */}
          <li><FiShoppingCart /> Cart</li>
          <li><FiBell /> Notifications</li>

          <hr />

          <li onClick={() => navigate("/profile")}><FiSettings /> Settings</li>
          <li><FiHelpCircle /> Help</li>

          <li className="logout" onClick={handleLogout}>
            <FiLogOut /> Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="dashboard-header">
          <div className="main-dashpro">
            <h3 style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}> <FiHome /> Dashboard </h3>
            
            {/* Profile Dropdown */}
            <div className="profile-container">
              <div className="profile-icon" onClick={(e) => { e.stopPropagation(); setShowProfileMenu(!showProfileMenu); }} >
                <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="profile" className="profile-img" />
              </div>

              {showProfileMenu && (
                <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
                  <p onClick={() => navigate("/profile")}><BsFillPencilFill /> My Profile</p>
                  <p onClick={handleLogout}> <FiLogOut /> Signout</p>
                </div>
              )}

            </div>
          </div>
          <p>Welcome, {user?.name || "User"} 👋</p>
        </header>

        {/* Cards */}
        <div className="cards">
          <div className="card"> <h3> Orders </h3> <p>{stats.totalOrders} </p> </div>
          <div className="card"> <h3> Wishlist </h3> <p>{stats.totalWishlist} </p> </div>
          <div className="card"> <h3> Products </h3> <p>{stats.totalProduct}</p> </div>
          <div className="card"> <h3> Cart </h3> <p>{stats.totalCart}</p> </div>
        </div>

        <br></br><hr></hr><br></br>

        <div className="button">
          <button className="buttons"> Recent Orders </button>
          <button className="buttons"> Track Status </button>
          <button className="buttons"> Manage Refunds </button>
          <button className="buttons"> Manage Payment </button>
          <button className="buttons"> History </button>
          <button className="buttons"> Billing Address </button>
        </div>

        <div className="recent-side" id="orders">
          <section className="recent-orders">
            <h4>Orders</h4>
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
            <h3>AI Chatbot</h3>
            <div className="sc-content">
              <p style={{fontFamily: "systemsystem-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}><AiFillRobot /> Hi, Outfitly Chatbot is here.</p>
            </div>
          </section>
        </div>

        <section className="below-content" id="nav">
          <h4>Navigation</h4>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;