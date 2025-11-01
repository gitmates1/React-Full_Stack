import React, { useEffect, useState } from "react";
import { FiHome, FiSettings, FiLogOut, FiHeart, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

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
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="menu">
          <li className="active"><FiHome /> Dashboard</li>
          <li><FiShoppingBag /> Orders</li>
          <li><FiHeart /> Wishlist</li>
          <li><FiSettings /> Settings</li>
          <li className="logout" onClick={handleLogout}><FiLogOut /> Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="dashboard-header">
          <h3>Welcome, {user ? user.name : "User"} 👋</h3>
          <p>What's going on today?</p>
        </header>

        <section className="stats">
          <div className="card">
            <h3>Orders</h3>
            <p>25</p>
          </div>
          <div className="card">
            <h3>Wishlist</h3>
            <p>12</p>
          </div>
          <div className="card">
            <h3>Cart Items</h3>
            <p>4</p>
          </div>
          <div className="card">
            <h3>Notifications</h3>
            <p>3</p>
          </div>
        </section>

        <section className="recent-orders">
          <h4>Recent Orders</h4>
          <div className="table-scroll">
           <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
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
                <td>Wireless Earbuds</td>
                <td><span className="status cancelled">Cancelled</span></td>
                <td>Oct 28, 2025</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Nike Air Force 1</td>
                <td><span className="status delivered">Delivered</span></td>
                <td>Oct 30, 2025</td>
              </tr>
              <tr>
                <td>8</td>
                <td>Apple Watch SE</td>
                <td><span className="status pending">Pending</span></td>
                <td>Oct 29, 2025</td>
              </tr>
              <tr>
                <td>9</td>
                <td>Wireless Earbuds</td>
                <td><span className="status cancelled">Cancelled</span></td>
                <td>Oct 28, 2025</td>
              </tr>
              <tr>
                <td>10</td>
                <td>Nike Air Force 1</td>
                <td><span className="status delivered">Delivered</span></td>
                <td>Oct 30, 2025</td>
              </tr>
              <tr>
                <td>12</td>
                <td>Apple Watch SE</td>
                <td><span className="status pending">Pending</span></td>
                <td>Oct 29, 2025</td>
              </tr>
              <tr>
                <td>13</td>
                <td>Wireless Earbuds</td>
                <td><span className="status cancelled">Cancelled</span></td>
                <td>Oct 28, 2025</td>
              </tr>
              <tr>
                <td>14</td>
                <td>Nike Air Force 1</td>
                <td><span className="status delivered">Delivered</span></td>
                <td>Oct 30, 2025</td>
              </tr>
              <tr>
                <td>15</td>
                <td>Apple Watch SE</td>
                <td><span className="status pending">Pending</span></td>
                <td>Oct 29, 2025</td>
              </tr>
              <tr>
                <td>16</td>
                <td>Wireless Earbuds</td>
                <td><span className="status cancelled">Cancelled</span></td>
                <td>Oct 28, 2025</td>
              </tr>
              <tr>
                <td>17</td>
                <td>Nike Air Force 1</td>
                <td><span className="status delivered">Delivered</span></td>
                <td>Oct 30, 2025</td>
              </tr>
              <tr>
                <td>18</td>
                <td>Apple Watch SE</td>
                <td><span className="status pending">Pending</span></td>
                <td>Oct 29, 2025</td>
              </tr>
              <tr>
                <td>19</td>
                <td>Wireless Earbuds</td>
                <td><span className="status cancelled">Cancelled</span></td>
                <td>Oct 28, 2025</td>
              </tr>
             </tbody>
           </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
