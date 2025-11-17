// src/components/Footer.jsx
import React from "react";
import logo from "../assets/images/logo.png";
import app from "../assets/images/pay/app.jpg";
import play from "../assets/images/pay/play.jpg";
import pay from "../assets/images/pay/pay.png";

const Footer = () => {
  return (
    <>
      <footer className="section-p1">
        <div className="col">
          <img className="logo1" src={logo} alt="logo" />
          <h4>Contact</h4>
          <p><strong>Address:</strong> University Of Gujrat, Pakistan</p>
          <p><strong>Phone:</strong> +(92) 3225911729 / +(92) 3154963980</p>
          <p><strong>Hours:</strong> 10:00 - 18:00, Monday - Saturday</p>
          <div className="follow">
            <h4>Follow Us</h4>
            <div className="icon">
              <i className="fa-brands fa-linkedin-in"></i>
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>
        </div>

        <div className="col">
          <h4>About</h4>
          <a href="#">About Us</a>
          <a href="#">Delivery Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms and Condition</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="col">
          <h4>My Account</h4>
          <a href="/login">Sign In</a>
          <a href="#">View Cart</a>
          <a href="#">My Wishlist</a>
          <a href="#">Track My Order</a>
          <a href="#">Help</a>
        </div>

        <div className="col install">
          <h4>Install Now!</h4>
          <p>From App Store or Google Play</p>
          <div className="row">
            <img src={app} alt="app" /> <span></span>
            <img src={play} alt="play" />
          </div>
          <p>Secured Payment Gateways</p>
          <img src={pay} alt="pay" />
        </div>
      </footer>

      <div className="copyright">
        <p>Copyright © 2025. All rights reserved</p>
      </div>
    </>
  );
};

export default Footer;
