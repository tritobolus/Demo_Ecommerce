import React from "react";
import { useState } from "react";
import { INDIAN_STATES } from "../../../assets/statesData";
import axios from "axios";

export const EditCustomer = ({
  setEditCustomer,
  currentCustomerId,
  customers,
  getCustomers,
}) => {
  const customer = customers.find(
    (customer) => customer.customer_id == currentCustomerId
  );

  const [formData, setFormData] = useState({
    customer_id: customer?.customer_id || "",
    first_name: customer?.first_name || "",
    last_name: customer?.last_name || "",
    phone_no: customer?.phone_no || "",
    address: customer?.address || "",
    state: customer?.state || "",
    pincode: customer?.pincode || "",
    pan_card: customer?.pan_card || "",
    store_name: customer?.store_name || "",
    status: customer?.status || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
        const res = await axios.put("http://localhost:5000/customer/edit_customer",
            formData,
        );
        console.log(res)
        alert(res.data.message)
        getCustomers();
        setEditCustomer(false)

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl w-[400px] bg-white shadow-xl flex flex-col gap-2"
        >
          <h2 className="text-2xl font-semibold text-center mb-2">
            Edit Customer Details
          </h2>

          {/* First & Last Name */}
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">First Name</label>
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">Last Name</label>
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Phone Number</label>
            <input
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded px-3 py-2 resize-none"
              rows={2}
            />
          </div>

          {/* State & Pincode */}
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium mb-1">State</label>
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
              <label className="text-sm font-medium mb-1">Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border rounded px-3 py-2"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="ban">Ban</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setEditCustomer(false)}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
