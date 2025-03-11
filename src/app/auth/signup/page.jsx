"use client";
import { useState } from "react";
import { signUp } from "../../utils/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await signUp(formData.email, formData.password);
      router.push("/dashboard"); // Redirect to dashboard after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Create an Account</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="p-2 border rounded w-1/3"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              className="p-2 border rounded w-1/3"
              value={formData.middleName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="p-2 border rounded w-1/3"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            className="p-2 border rounded"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="p-2 border rounded"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account? <a href="/auth/login" className="text-blue-500">Log in</a>
        </p>
      </div>
    </div>
  );
}
