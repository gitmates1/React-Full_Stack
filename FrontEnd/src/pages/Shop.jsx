import React from "react";
//import "../assets/css/style.css"; // apni CSS path ke hisab se update karna
import logo from "../assets/images/logo.png"; // logo image import
import appStore from "../assets/images/pay/app.jpg";
import playStore from "../assets/images/pay/play.jpg";
import pay from "../assets/images/pay/pay.png";

// product images import karo (sirf example ke liye kuch dikhaye hain)
import f11 from "../assets/images/products/f11.jpg";
import f12 from "../assets/images/products/f12.jpg";
import f13 from "../assets/images/products/f13.jpg";
import f14 from "../assets/images/products/f14.jpg";
import product1 from "../assets/images/product-1.jpg";
import product2 from "../assets/images/product-2.jpg";
import product3 from "../assets/images/product-3.jpg";
import product4 from "../assets/images/product-4.jpg";

const Shop = () => {
  // product list (future me easily add ya remove kar sakte ho)
  const products = [
    { id: 1, img: f11, brand: "ZARA", name: "T-Shirt", price: 35 },
    { id: 2, img: f12, brand: "ZARA", name: "T-Shirt", price: 20 },
    { id: 3, img: f13, brand: "ZARA", name: "T-Shirt", price: 40 },
    { id: 4, img: f14, brand: "ZARA", name: "T-Shirt", price: 45 },
    { id: 5, img: product1, brand: "Levis", name: "T-Shirt", price: 50 },
    { id: 6, img: product2, brand: "Levis", name: "T-Shirt", price: 45 },
    { id: 7, img: product3, brand: "Levis", name: "T-Shirt", price: 30 },
    { id: 8, img: product4, brand: "Levis", name: "T-Shirt", price: 25 },
  ];

  return (
    <>
      {/* Products */}
      <section id="product1" className="section-p1">
        <div className="pro-container">
          {products.map((item) => (
            <div className="pro" key={item.id}>
              <img src={item.img} alt={item.name} />
              <div className="des">
                <span>{item.brand}</span>
                <h5>{item.name}</h5>
                <h4>${item.price}</h4>
              </div>
              
            </div>
          ))}
        </div>
      </section>
      
    </>
  );
};

export default Shop;
