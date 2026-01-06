import React, { useState } from "react";
import axios from 'axios'

export const CreateAdmin = () => {
  const states = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
    "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
    "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
    "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
    "Uttarakhand","West Bengal","Delhi","Jammu and Kashmir",
    "Ladakh","Puducherry"
  ];

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_no: "",
    address: "",
    state: "",
    country: "india",
    pincode: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/admin/signup",
        formData,
        {withCredentials:true}
      )

      console.log(res)
      alert(res.data.message)
      
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <div className="p-5 h-screen flex flex-col gap-y-3">
        
        {/* Title */}
        <h2 className="font-semibold text-3xl">Create Admin</h2>
        <hr />

        {/* Form Container */}
        <div className="flex-1 overflow-y-auto px-5">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl"
          >

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email_id"
                value={formData.email_id}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                value={formData.country}
                disabled
                className="w-full bg-gray-100 border rounded-lg px-3 py-2"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="super_admin">Super Admin</option>
                <option value="seller_admin">Seller Admin</option>
                <option value="customer_admin">Customer Admin</option>
              </select>
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
              >
                Create Admin
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};
