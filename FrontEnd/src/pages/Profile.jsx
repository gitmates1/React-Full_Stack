import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setName(storedUser?.name || ""); 
  }, []);

  const handleUpdate = () => {
    const updatedUser = { ...user, name };

    // Update localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");
  };

  if (!user) return <h3>Loading...</h3>;

  return (
    <div style={styles.container}>
      <h3 style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>My Account</h3>

      <div style={styles.card}>
        <label>Name:</label>
        <input
          style={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email:</label>
        <input
          style={styles.input}
          type="email"
          value={user.email}
          disabled
        />

        <button style={styles.btn} onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "30px"},
  card: {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "#d33c44",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Profile;
