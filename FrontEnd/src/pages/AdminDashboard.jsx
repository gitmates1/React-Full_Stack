import React, { useEffect, useState } from "react";
import { FiSettings, FiLogOut, FiHeart, FiShoppingBag, FiShoppingCart, FiBell, FiHelpCircle, FiChevronRight, FiHome } from "react-icons/fi";
import { AiFillProduct, AiOutlineAppstore } from "react-icons/ai";
import { BsFillPeopleFill, BsFillPencilFill } from "react-icons/bs";
import { AiFillRobot } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null); // store which dropdown is open
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();

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
    setTimeout(() => alert("You are Logout."), 300);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(prev => (prev === menu ? null : menu)); // only one open at a time
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="menu">
          <li className="active"><AiOutlineAppstore /> Home</li>

          {/* Orders Dropdown */}
          <li className="dropdown-header" onClick={() => toggleDropdown("orders")}>
            <FiShoppingBag /> Orders <FiChevronRight className={`arrow ${openDropdown === "orders" ? "rotate" : ""}`} />
          </li>
          {openDropdown === "orders" && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/admin/orders/add")}>Add Order</li>
              <li onClick={() => navigate("/admin/orders/view")}>View Orders</li>
              <li onClick={() => navigate("/admin/orders/update")}>Update Order</li>
              <li onClick={() => navigate("/admin/orders/delete")}>Delete Order</li>
            </ul>
          )}

          {/* Products Dropdown */}
          <li className="dropdown-header" onClick={() => toggleDropdown("products")}>
            <AiFillProduct /> Products <FiChevronRight className={`arrow ${openDropdown === "products" ? "rotate" : ""}`} />
          </li>
          {openDropdown === "products" && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/admin/products/add")}>Add Product</li>
              <li onClick={() => navigate("/admin/products/view")}>View Products</li>
              <li onClick={() => navigate("/admin/products/update")}>Update Product</li>
              <li onClick={() => navigate("/admin/products/delete")}>Delete Product</li>
            </ul>
          )}

          {/* Customers Dropdown */}
          <li className="dropdown-header" onClick={() => toggleDropdown("customers")}>
            <BsFillPeopleFill /> Customers <FiChevronRight className={`arrow ${openDropdown === "customers" ? "rotate" : ""}`} />
          </li>
          {openDropdown === "customers" && (
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/admin/customers/view")}>View Customers</li>
              <li onClick={() => navigate("/admin/customers/add")}>Add Customer</li>
              <li onClick={() => navigate("/admin/customers/update")}>Update Customer</li>
              <li onClick={() => navigate("/admin/customers/delete")}>Delete Customer</li>
            </ul>
          )}

          <br></br><hr></hr>
          <li><FiBell /> Notifications</li>
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


        <div className="box">
          <div className="boxes"><h3>Total Sales</h3><p>200</p></div>
          <div className="boxes"><h3>Total Orders</h3><p>456</p></div>
          <div className="boxes"><h3>Total Customers</h3><p>Rs.1,23,000</p></div>
          <div className="boxes"><h3>Total Products</h3><p>124</p></div>
        </div>

        <br></br><hr></hr><br></br>
        <div className="button">
          <button className="buttons">
            Recent Orders
          </button>
          <button className="buttons">
            Shippment Track
          </button>
          <button className="buttons">
            Verify Payment
          </button>
          <button className="buttons">
            Billing Zone
          </button>
          <button className="buttons">
            Pending
          </button>
          <button className="buttons">
            New Items
          </button>
        </div>

        <div className="recent-side">
          <section className="recent-orders">
            <h4>Recent Orders</h4>
            {/* Table */}
          </section>
          <section className="side-content">
            <h4>AI Chatbot</h4>
            <p><AiFillRobot /> Hi, Outfitly Chatbot is here.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
