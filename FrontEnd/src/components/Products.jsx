import React from "react";
import product1 from "../assets/images/product-1.jpg";
import product2 from "../assets/images/product-2.jpg";
import product3 from "../assets/images/product-3.jpg";
import product4 from "../assets/images/product-4.jpg";
import f11 from "../assets/images/products/f11.jpg";
import f12 from "../assets/images/products/f12.jpg";
import f13 from "../assets/images/products/f13.jpg";
import f14 from "../assets/images/products/f14.jpg";

function Products() {

  const products = [
      { id: 1, img: f11, brand: "ZARA", name: "T-Shirt", price: 35 },
      { id: 2, img: f12, brand: "ZARA", name: "T-Shirt", price: 20 },
      { id: 3, img: f13, brand: "ZARA", name: "T-Shirt", price: 40 },
      { id: 4, img: f14, brand: "ZARA", name: "T-Shirt", price: 45 },
    ];

  return (
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
  );
}

export default Products;
