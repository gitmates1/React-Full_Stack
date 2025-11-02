import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <section id="header">
      <img src={logo} alt="logo" />
      <div>
        <ul id="navbar">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? "active" : "")}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact
            </NavLink>
          </li>

          {/* This part auto-switches */}
          <li>
            <NavLink
              to={token ? "/dashboard" : "/login"}
              className={({ isActive }) =>
                isActive ? "login-link active" : "login-link"
              }
            >
              {token ? "Dashboard" : "Login"}
            </NavLink>
          </li>

          <li id="lg-bag">
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
              <i className="fa-solid fa-cart-shopping clr-pad"></i>
            </NavLink>
          </li>

          <a href="#" title="close" id="close1">
            <i className="fa-solid fa-xmark"></i>
          </a>
        </ul>
      </div>
    </section>
  );
};

export default Header;