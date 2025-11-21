import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [editUser, setEditUser] = useState(null);

  const token = localStorage.getItem("token");

  const loadUsers = async () => {
    const res = await axios.get(`/api/admin/users?search=${search}&filter=${filter}`, {
      headers: { "x-auth-token": token }
    });
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, [search, filter]);

  const updateUser = async () => {
    await axios.put(
      `/api/admin/users/update/${editUser._id}`,
      editUser,
      { headers: { "x-auth-token": token } }
    );

    setEditUser(null);
    loadUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`/api/admin/users/delete/${id}`, {
      headers: { "x-auth-token": token }
    });

    loadUsers();
  };

  const toggleStatus = async (id) => {
    await axios.put(`/api/admin/users/status/${id}`, {}, {
      headers: { "x-auth-token": token }
    });

    loadUsers();
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Search Bar */}
      <input
        placeholder="Search by name, email, ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div>
        <label><input type="radio" name="filter" value="" onChange={() => setFilter("")}/> All</label>
        <label><input type="radio" name="filter" value="user" onChange={() => setFilter("user")}/> Users</label>
        <label><input type="radio" name="filter" value="admin" onChange={() => setFilter("admin")}/> Admins</label>
        <label><input type="radio" name="filter" value="active" onChange={() => setFilter("active")}/> Active</label>
        <label><input type="radio" name="filter" value="blocked" onChange={() => setFilter("blocked")}/> Blocked</label>
      </div>

      {/* Scrollable Table */}
      <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "400px" }}>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Block/Unblock</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.userId}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>

                <td><button onClick={() => setEditUser({ ...u })}>Edit</button></td>
                <td><button onClick={() => deleteUser(u._id)}>Delete</button></td>
                <td><button onClick={() => toggleStatus(u._id)}>
                  {u.status === "active" ? "Block" : "Unblock"}
                </button></td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      {editUser && (
        <div style={{ background: "#fff", padding: 20, border: "1px solid black", position: "fixed", top: "20%", left: "30%" }}>
          <h2>Edit User</h2>

          <input value={editUser.name} onChange={(e)=>setEditUser({...editUser, name:e.target.value})}/>
          <input value={editUser.email} onChange={(e)=>setEditUser({...editUser, email:e.target.value})}/>
          
          <select value={editUser.role} onChange={(e)=>setEditUser({...editUser, role:e.target.value})}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <br /><br />
          <button onClick={updateUser}>Save</button>
          <button onClick={() => setEditUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
