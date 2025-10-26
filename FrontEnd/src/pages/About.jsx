// src/pages/About.jsx
import React from "react";

// images (put these in src/assets/images/)
import a6 from "../assets/images/about/a6.jpg";
import video1 from "../assets/images/about/1.mp4";
import f1 from "../assets/images/features/f1.png";
import f2 from "../assets/images/features/f2.png";
import f3 from "../assets/images/features/f3.png";
import f4 from "../assets/images/features/f4.png";
import f5 from "../assets/images/features/f5.png";
import f6 from "../assets/images/features/f6.png";

const About = () => {
  return (
    <>
      {/* About Head */}
      <section id="about-head" className="section-p1">
        <img src={a6} alt="about" />
        <div>
          <h2>Who we are?</h2>
          <p>
            At Outfitly, we believe fashion is more than just clothing — it’s a way to express who you are.
            We're a passionate team dedicated to bringing you stylish, high-quality, and comfortable pieces
            that fit every moment of your life. Whether you're dressing up or keeping it casual, our collection
            is designed to help you feel confident and look your best. We value authenticity, creativity,
            and the power of personal style.
          </p>
        </div>
      </section>

      {/* About App */}
      <section id="about-app" className="section-p1">
        <h1>
          Download Our <a href="#">App</a>
        </h1>
        <div className="video">
          <video autoPlay muted loop src={video1}></video>
        </div>
      </section>

      {/* Features */}
      <section id="feature" className="section-p1">
        <div className="feature-box">
          <img src={f1} alt="" />
          <h6>Free Shipping</h6>
        </div>
        <div className="feature-box">
          <img src={f2} alt="" />
          <h6>Online Order</h6>
        </div>
        <div className="feature-box">
          <img src={f3} alt="" />
          <h6>Save Money</h6>
        </div>
        <div className="feature-box">
          <img src={f4} alt="" />
          <h6>Promotions</h6>
        </div>
        <div className="feature-box">
          <img src={f5} alt="" />
          <h6>Happy Sell</h6>
        </div>
        <div className="feature-box">
          <img src={f6} alt="" />
          <h6>24/7 Support</h6>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Sign Up for Newsletters</h4>
          <p>
            Get Email updates about our latest shop and <span>special offers</span>.
          </p>
        </div>
        <div className="form">
          <input type="text" placeholder="Your Email Address" />
          <button className="normal">Sign Up</button>
        </div>
      </section>
    </>
  );
};

export default About;
