"use client";
import { useState } from "react";
import { signIn, googleSignIn } from "../../utils/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signIn(formData.email, formData.password);
      router.push("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/dashboard"); // Redirect after Google login
    } catch (err) {
      setError("Google Sign-In failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Sign In</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
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

          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Sign In
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center bg-white border p-2 rounded shadow hover:bg-gray-100 w-full"
        >
          <img src="/google-logo.png" alt="Google Logo" className="h-5 w-5 mr-2" />
          Sign in with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account? <a href="/auth/signup" className="text-blue-500">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
