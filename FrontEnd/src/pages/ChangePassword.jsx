import { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/api/auth/change-password",
        { oldPassword, newPassword },
        { headers: { "x-auth-token": token } }
      );

      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response.data.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Change Password</h2>

      <input
        type="password"
        placeholder="Old Password"
        onChange={(e) => setOld(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setNew(e.target.value)}
      />

      <button>Update Password</button>

      {msg && <p>{msg}</p>}
    </form>
  );
}
