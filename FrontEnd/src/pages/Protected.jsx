import { useEffect, useState } from "react";
import axios from "axios";

export default function Protected() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized! Please login first.");
      window.location.href = "/Login";
      return;
    }

    axios
      .get("http://localhost:5000/api/protected", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setData(res.data))
      .catch(() => {
        alert("Token expired / invalid. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/Login";
      });
  }, []);

  return (
    <div>
      <h2>Protected Route</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
}
