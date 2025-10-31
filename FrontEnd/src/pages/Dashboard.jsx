import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Outfitly</h2>
        <ul className="menu">
          <li className="active">🏠 Dashboard</li>
          <li>🛒 Orders</li>
          <li>❤️ Wishlist</li>
          <li>⚙️ Settings</li>
          <li>🚪 Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="dashboard-header">
          <h1>Welcome, {user ? user.name : "User"} 👋</h1>
          <p>Here's what's happening in your account today</p>
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
            <h3>Messages</h3>
            <p>3</p>
          </div>
        </section>

        <section className="recent-orders">
          <h2>Recent Orders</h2>
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
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
