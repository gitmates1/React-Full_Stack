import React, { useEffect, useState } from "react";
import { FiHome, FiSettings, FiLogOut, FiHeart, FiShoppingBag, FiShoppingCart, FiBell, FiPackage, FiDollarSign, FiBox, FiInbox, FiSpeaker, FiPercent, FiDatabase, FiDivide, FiHelpCircle, FiSearch, FiImage, FiGift } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { AiFillNotification, AiFillProduct, AiFillRobot, AiFillWindows, AiOutlineAppstore, AiOutlinePound } from "react-icons/ai";
import { FaInbox, FaJediOrder } from "react-icons/fa";
import { TbFilterDiscount } from "react-icons/tb";
import { BsFillBoxSeamFill, BsFillPencilFill, BsFillPeopleFill } from "react-icons/bs";
import { LuFileBox } from "react-icons/lu";

const Dashboard = () => {
const [user, setUser] = useState(null);
const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");  // if user not logged in, block access
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");

    setTimeout(() => {
    alert("You are now logout.");
    }, 300);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="menu">
          <li className="active"><AiOutlineAppstore /> Home</li>
          <li><FiShoppingBag /> Orders</li>
          <li><FiHeart /> Wishlist</li>
          <li><AiFillProduct /> Products</li>
          {/* <li><BsFillPeopleFill/> Customers</li> */}
          <li><AiOutlinePound /> Payments</li>
          <li><FiShoppingCart /> Cart</li>
          <li><FiGift/> Special Offers</li>
          <li><FiBell /> Notifications</li>
          <br></br>
          <hr></hr>
          <li><FiSettings /> Settings</li>
          <li><FiHelpCircle /> Help</li>
          <li className="logout" onClick={handleLogout}><FiLogOut /> Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="dashboard-header">
          <p1>Dashboard</p1> <span></span>
          <BsFillPencilFill/>
                 
          <p>Welcome, {user ? user.name : "User"} 👋</p>
        </header>

        <secton className = "cards">
          <div className="card">
            <h3>Total Orders</h3>
            <p style={{textDecoration: "none"}}>456</p>
          </div>
          <div className="card">
            <h3>Total Price</h3>
            <p>Rs.1,23,000</p>
          </div>
          <div className="card">
            <h3>Total Items</h3>
            <p>124</p>
          </div>
          <div className="card">
            <h3>Cart</h3>
            <p>200</p>
          </div>
        </secton>
        <div className="recent-side">
        <section className="recent-orders">
          <h4 style={{fontFamily: "calibri"}}>Recent Orders</h4>
          <div className="table-scroll">
           <table>
            <thead>
              <tr>
                <th style={{fontWeight: "550"}}>#</th>
                <th style={{fontWeight: "550"}}>Product</th>
                <th style={{fontWeight: "550"}}>Status</th>
                <th style={{fontWeight: "550"}}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nike Air Force 1</td>
                <td><span className="status delivered">Delivered</span></td>
                <td>Oct 30, 2025</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Apple Watch SE</td>
                <td><span className="status pending">Pending</span></td>
                <td>Oct 29, 2025</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Wireless Earbuds</td>
                <td><span className="status cancelled">Cancelled</span></td>
                <td>Oct 28, 2025</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Nike Air Force 1</td>
                <td><span className="status delivered">Delivered</span></td>
                <td>Oct 30, 2025</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Apple Watch SE</td>
                <td><span className="status pending">Pending</span></td>
                <td>Oct 29, 2025</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Apple Watch SE</td>
                <td><span className="status pending">Pending</span></td>
                <td>Oct 29, 2025</td>
              </tr>
             </tbody>
           </table>
          </div>
        </section>
        <section className="side-content">
          <h4 style={{fontFamily: "calibri"}}>AI Chatbot</h4>
          <div className="sc-content">
            <p><AiFillRobot />Hi, Outfitly Chatbot is here.</p>
          </div>
        </section>
      </div>
      <section className="below-content">
        <h4 style={{fontFamily: "calibri"}}>Navigation</h4>
          
          
      </section>
      </main>
    </div>
  );
};

export default Dashboard;
