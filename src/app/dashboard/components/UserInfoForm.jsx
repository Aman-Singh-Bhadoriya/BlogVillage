"use client";

import { useState } from "react";

const UserInfoForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    summary: initialData?.summary || "",
  });

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Filter out empty fields to prevent overwriting existing values
    const updatedData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value.trim() !== "")
    );

    if (onSubmit && Object.keys(updatedData).length > 0) {
      await onSubmit(updatedData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border border-gray-300 rounded-lg shadow-md"
    >
      {/* ✅ Name Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>

      {/* ✅ Phone Number Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your phone number"
        />
      </div>

      {/* ✅ Summary Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Summary:</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          rows="4"
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a brief summary about yourself"
        />
      </div>

      {/* ✅ Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Save Info
      </button>
    </form>
  );
};

export default UserInfoForm;
