import {Outlet, Link} from 'react-router-dom'
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

const SellerDash = () => {
  const [details, setDetails] = useState([])
  const location = useLocation();
  const navigate = useNavigate();

  //go back to the overview after refresh the page
  //  useEffect(() => {
  //   if (location.pathname !== "/sellerdash") {
  //     navigate("/sellerdash");
  //   }
  // }, []);

  const getSellerDetails = async() => {
    try {
      const res = await axios.get("http://localhost:5000/seller/account/details",{withCredentials:true})
      setDetails(res.data.details)
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(() => {
    console.log("seller details : " , details)
  },[details])
  useEffect(() => {
    getSellerDetails();
  },[]);
  return (
    <>
      <div className="grid grid-cols-5 h-screen">
        {/* left section */}
        <div className="col-span-1 bg-teal-400 p-2 flex flex-col justify-between">
          <h2 className="flex justify-center text-3xl italic font-bold mt-2">shopNOW</h2>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">Seller Dashboard</p>
            <p className='flex gap-x-1'>welcome <p className='font-semibold'> {details.first_name}</p>!</p>
            <p>Email Id: {details.email_id}</p>
            <p>Phone No: {details.phone_no}</p>
            <p>Store Name: {details.store_name}</p>
          </div>
          <div className=" flex flex-col  p-2 gap-y-1">
            {/* overview */}
            <Link to="" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/sellerdash" ? "bg-black" : "bg-teal-600"}`}>Overview</Link>

            {/* Manage Order */}
            <Link to="manage_orders" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/sellerdash/manage_orders" ? "bg-black" : "bg-teal-600"}`}>Manage Order</Link>

            {/* Manage Product */}
            <Link to="manage_product" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/sellerdash/manage_product"  ? "bg-black" : "bg-teal-600"}`}>Manage Product</Link>

            {/* Invetory & Stock */}
            <Link to="inventory_stock" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/sellerdash/inventory_stock" ? "bg-black" : "bg-teal-600"}`}>Inventory & Stock</Link>

            {/* Review & Ratings */}
            <Link to="review_rating" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/sellerdash/review_rating" ? "bg-black" : "bg-teal-600"}`}>Review & Ratings</Link>

            {/* Payment & Earnings */}
            <Link replace className="flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1 bg-teal-600 text-white text-xl">Payment & Earning</Link>

            {/* Profile & store settings */}
            <Link replace className="flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1 bg-teal-600 text-white text-xl">Profile & Store Settings</Link>

            {/* Support & Help */}
            <Link replace className="flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1 bg-teal-600 text-white text-xl">Support & Help</Link>

          </div>
          {/* Logout */}
          <button className="bg-red-600 px-1 py-2 rounded text-white">Logout</button>
        </div>

        {/* Right section */}
        <div className="col-span-4 bg-gray-100 ">
          <Outlet/>
          </div>


      </div>
    </>
  );
};

export default SellerDash;
