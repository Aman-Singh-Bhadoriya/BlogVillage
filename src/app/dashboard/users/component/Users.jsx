"use client";
import { useEffect, useState } from "react";
import { db } from "../../../utils/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const [currentUserRole, setCurrentUserRole] = useState(null);

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);

        // Get current user role
        const currentUser = usersData.find(u => u.id === user.uid);
        if (currentUser) {
          setCurrentUserRole(currentUser.role);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (user) fetchUsers();
  }, [user]);

  const handleChangeRole = async (id, newRole) => {
    if (currentUserRole !== "admin") {
      alert("Only admins can change roles.");
      return;
    }

    const confirmChange = window.confirm(
      `Are you sure you want to change this user's role to '${newRole}'?`
    );
    if (!confirmChange) return;

    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { role: newRole });
      alert("User role updated successfully.");
      // Refresh users
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update user role.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            {currentUserRole === "admin" && <th className="border p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border p-2">{user.fullName}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              {currentUserRole === "admin" && (
                <td className="border p-2">
                  <select
                    value={user.role}
                    onChange={e => handleChangeRole(user.id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="admin">Admin</option>
                    <option value="author">Author</option>
                    <option value="reader">Reader</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
