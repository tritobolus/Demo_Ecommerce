import React, { useState } from "react";
import { INDIAN_STATES } from "../../../assets/statesData";
import axios from "axios";

export const EditAdmin = ({ setEditAdmin, currentAdminId, admins, getAdmins }) => {
    const admin = admins.find((a) => a.admin_id === currentAdminId);

    const [formData, setFormData] = useState({
        admin_id: admin.admin_id || "",
        first_name: admin.first_name || "",
        last_name: admin.last_name || "",
        phone_no: admin.phone_no || "",
        address: admin.address || "",
        state: admin.state || "",
        pincode: admin.pincode || "",
        role: admin.role || "",
        status: admin.status || "",
    })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
        const res = await axios.put("http://localhost:5000/admin/edit_admin",
            formData,
            // {
            //     withcreadentials: true
            // }
        );
        console.log(res)
        alert(res.data.message)
        getAdmins();
        setEditAdmin(false)

    } catch (error) {
        console.log(error)
    }
  }


  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm  flex justify-center items-center">
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl w-[420px] bg-white shadow-xl">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Edit Admin Details
          </h2>

          {/* First & Last Name */}
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">First Name</label>
              <input
                onChange={handleChange}
                name="first_name"
                type="text"
                value={formData.first_name}
                className="border rounded px-3 py-2 "
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">Last Name</label>
              <input
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                className="border rounded px-3 py-2 "
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium">Phone NO</label>
            <input
              type="text"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>

          {/* State & Pincode */}
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              >
                {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                        {state}
                    </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Role & Status */}
          <div className="flex gap-4 mb-6">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">Role</label>
              <select
                name="role" 
                value={formData.role} 
                onChange={handleChange}
                className="border rounded px-3 py-2">
                <option value="customer_admin">Customer Admin</option>
                <option value="seller_admin">Seller Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">Status</label>
              <select
                name="status" 
                value={formData.status} 
                onChange={handleChange}
                className="border rounded px-3 py-2">
                <option value="active">Active</option>
                <option value="ban">Ban</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setEditAdmin(false)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button type="submit" className="px-4 py-2 rounded bg-teal-500 text-white hover:bg-teal-600">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
