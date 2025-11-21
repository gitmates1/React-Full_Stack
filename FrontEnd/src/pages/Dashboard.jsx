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

  const navigate = useNavigate();

  // auth check
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) navigate("/login");
    else setUser(storedUser);
  }, [navigate]);

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!document.querySelector(".profile-container")?.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    setTimeout(() => alert("You are now logout."), 300);
  };

  // toggle function
  const toggleDropdown = (menu) => {
    setOpenDropdown(prev => (prev === menu ? null : menu));
  };

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
              <div
                className="profile-icon"
                onClick={(e) => {
                  e.stopPropagation(); // stops closing when clicking icon
                  setShowProfileMenu(!showProfileMenu);
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  alt="profile"
                  className="profile-img"
                />
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
        <section className="cards">
          <div className="card">
            <h3>Orders</h3>
            <p>456</p>
          </div>
          <div className="card">
            <h3>Wishlist</h3>
            <p>456</p>
          </div>
          <div className="card">
            <h3>Products</h3>
            <p>124</p>
          </div>
          <div className="card">
            <h3>Cart</h3>
            <p>200</p>
          </div>
        </section>

        <br></br><hr></hr><br></br>

        <div className="button">
          <button className="buttons"> Recent Orders </button>
          <button className="buttons"> Track Status </button>
          <button className="buttons"> Manage Refunds </button>
          <button className="buttons"> Manage Payment </button>
          <button className="buttons"> Payment History </button>
          <button className="buttons"> Billing Address </button>
        </div>

        <div className="recent-side">
          <section className="recent-orders">
            <h4>Recent Orders</h4>
          </section>

          <section className="side-content">
            <h4>AI Chatbot</h4>
            <div className="sc-content">
              <p><AiFillRobot /> Hi, Outfitly Chatbot is here.</p>
            </div>
          </section>
        </div>

        <section className="below-content">
          <h4>Navigation</h4>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
