import React, { useState } from "react";
import "./PriceComparison.css";



const PriceComparison = () => {
  const [productName, setProductName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy function (mock API call)
  const handleCompare = async () => {
  setLoading(true);
  let myKey = "e153da4e34c24a5abe721aceb728fb9e";
  let url = "";
  try {
    const res = await fetch();

    const data = await res.json();
    console.log("API Response:", data);

    // Dummy mapping for display
    const result = [
      {
        store: "Amazon",
        price: data.data?.product_price || "$499",
        link: data.data?.product_url || "#",
      },
    ];

    setResults(result);
  } catch (error) {
    console.error("Error:", error);
  }
  setLoading(false);
};


  return (
    <div className="price-compare-container">
      <h2>Price Comparison</h2>
      <p>Enter a product name to compare prices across stores</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="e.g. iPhone 14"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <button onClick={handleCompare}>Compare Prices</button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      <div className="results">
        {results.map((item, index) => (
          <div key={index} className="price-card">
            <h4>{item.store}</h4>
            <p className="price">{item.price}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              Visit Store
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceComparison;
