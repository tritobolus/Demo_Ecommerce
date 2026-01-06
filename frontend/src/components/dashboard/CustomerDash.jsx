
import {Outlet, Link} from 'react-router-dom'
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const CustomerDash = () => {
  const {userDetails, checkAuth} = useAuth()
  const location = useLocation();
  const navigate = useNavigate();

  //go back to the overview after refresh the page
  //  useEffect(() => {
  //   if (location.pathname !== "/sellerdash") {
  //     navigate("/sellerdash");
  //   }
  // }, []);

  useEffect(() => {
    checkAuth();
  },[]);
  return (
    <>
      <div className="grid grid-cols-5 h-screen">
        {/* left section */}
        <div className="col-span-1 bg-teal-400 p-2 flex flex-col justify-between">
          <h2 className="flex justify-center text-3xl italic font-bold mt-2">shopNOW</h2>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">Customer Dashboard</p>
            <div className='flex gap-x-1'>
              
            <p className=''>welcome </p>
            <p className='font-semibold'> {userDetails.first_name}</p>
            <p>!</p>

            </div>
            <p>Email Id: {userDetails.email_id}</p>
            <p>Phone No: {userDetails.phone_no}</p>
            <p>Address: {userDetails.address}</p>
          </div>
          <div className=" flex flex-col  p-2 gap-y-1">
            {/* overview */}
            <Link to="" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/customerdash" ? "bg-black" : "bg-teal-600"}`}>Overview</Link>

            {/* Manage Order */}
            <Link to="my_orders" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/customerdash/my_orders" ? "bg-black" : "bg-teal-600"}`}>My Orders</Link>
            
            {/* Review & Ratings */}
            <Link to="wishlist" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/customerdash/wishlist" ? "bg-black" : "bg-teal-600"}`}>My Wishlist</Link>

            {/* Review & Ratings */}
            <Link to="my_reviews" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/customerdash/my_reviews" ? "bg-black" : "bg-teal-600"}`}>My Reviews</Link>

            {/* Manage address */}
            <Link to="manage_address" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/customerdash/manage_address"  ? "bg-black" : "bg-teal-600"}`}>Manage Address</Link>



            {/* settings */}
            <Link to="settings" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/customerdash/settings" ? "bg-black" : "bg-teal-600"}`}>Settings</Link>

            {/* Support & Help */}
            <Link replace className="flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1 bg-teal-600 text-white text-xl">Support & Help</Link>

          </div>
          {/* Logout */}
          <button className="bg-red-600 px-1 py-2 rounded text-white">Logout</button>
        </div>

        {/* Right section */}
        <div className="col-span-4 bg-gray-100 overflow-y-auto ">
          <Outlet/>
        </div>


      </div>
    </>
  );
};

export default CustomerDash;

