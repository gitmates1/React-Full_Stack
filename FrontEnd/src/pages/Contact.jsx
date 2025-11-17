// src/pages/Contact.jsx
import React from "react";

// import images (put these in src/assets/images/)
import logo from "../assets/images/logo.png";
import app from "../assets/images/pay/app.jpg";
import play from "../assets/images/pay/play.jpg";
import pay from "../assets/images/pay/pay.png";
import p1 from "../assets/images/people/1.png";
import p2 from "../assets/images/people/2.png";
import p3 from "../assets/images/people/3.png";

const Contact = () => {
  return (
    <>

      {/* Contact Details */}
      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency locations or contact us today.</h2>
          <h3>Head Office</h3>
          <div>
            <ul>
              <li>
                <i className="fa-solid fa-map"></i>
                <p>University Of Gujrat, Hafiz Hayat, Pakistan</p>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <p>arhamali111333@gmail.com</p>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <p>abubakar6984456@gmail.com</p>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <p>0314 4963920</p>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <p>0322 5911729</p>
              </li>
              <li>
                <i className="fa-solid fa-clock"></i>
                <p>Monday to Saturday: 9:00am to 6:00pm</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13439.429773295182!2d74.1605376!3d32.6366196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f03050c9a9403%3A0x547af0d30e96d8b!2sUniversity%20of%20Gujrat!5e0!3m2!1sen!2s!4v1745554668424!5m2!1sen!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </section>

      {/* Contact Form */}
      <section id="form-details" className="section-p1">
        <form action="">
          <span>LEAVE A MESSAGE</span>
          <h2>We love to hear from you</h2>
          <input type="text" placeholder="Your Name" />
          <input type="text" placeholder="E-mail" />
          <input type="text" placeholder="Subject" />
          <textarea cols="30" rows="10" placeholder="Your Message"></textarea>
          <button className="normal" type="submit">
            Submit
          </button>
        </form>

        <div className="people">
          <div>
            <img src={p1} alt="John Doe" />
            <p>
              <span>John Doe</span> Senior Marketing Manager <br /> Phone : +00 123456789 <br />
              Email : johndoe@gmail.com
            </p>
          </div>
          <div>
            <img src={p2} alt="Michael" />
            <p>
              <span>Michael</span> Senior IT Manager <br /> Phone : +00 123456789 <br /> Email :
              michael@gmail.com
            </p>
          </div>
          <div>
            <img src={p3} alt="Haley" />
            <p>
              <span>Haley</span> Senior Sales Manager <br /> Phone : +00 123456789 <br /> Email :
              haley@gmail.com
            </p>
          </div>
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

export default Contact;
