"use client";
import { useState } from "react";
import { signUp } from "../../utils/auth";
import { useRouter } from "next/navigation";
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const fullName = `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`;

    try {
      setLoading(true);
      await signUp(formData.email, formData.password, fullName, formData.mobile);
      router.push("/Home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        {/* Title */}
        <Typography variant="h4" className="text-center font-bold text-blue-600 mb-6">
          Create an Account
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography variant="body2" className="text-center text-red-500 mb-4">
            {error}
          </Typography>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          {/* Name Fields */}
          <Box display="flex" gap={1}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              fullWidth
              size="small"
            />
            <TextField
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              fullWidth
              size="small"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              fullWidth
              size="small"
            />
          </Box>

          {/* Mobile Field */}
          <TextField
            label="Mobile Number"
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />

          {/* Email Field */}
          <TextField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />

          {/* Password Fields */}
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />

          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            size="small"
          />

          {/* Signup Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            size="large"
            className="mt-2"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        {/* Link to Login */}
        <Typography variant="body2" className="text-center mt-4">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </Typography>
      </div>
    </div>
  );
}
