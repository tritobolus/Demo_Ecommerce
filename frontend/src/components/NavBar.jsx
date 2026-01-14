import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect, useState } from "react";

import { useProduct } from "../context/productContext";


export let searchQuery;

export const NavBar = () => {
  const navigate = useNavigate();
  const { auth, userDetails } = useAuth();
  const {setSearchQuery} = useProduct()
  
  return (
    <>
      <nav className="flex justify-between py-4 px-10 shadow-2xl bg-teal-400 text-white  ">
        <h1 className="font-semibold text-2xl p-1 text-black">shopNOW</h1>
        <div className="div">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search products"
            className="w-100 border-black border-2 text-black focus:outline-none rounded-xl px-3 py-2"
          />
        </div>
        {auth == true ? (
          <>
            <div className="flex gap-x-1 ">
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-full bg-black text-white px-4 text-md"
              >
                D
              </button>
              {userDetails.role == "super_admin" ||
              userDetails.role == "seller_admin" ||
              userDetails.role == "customer_admin" ? (
                ""
              ) : (
                <FaCartShopping
                  onClick={() => navigate("/cart")}
                  size={38}
                  className="text-black hover:text-gray-700"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex">
              <button
                onClick={() => navigate("/signin")}
                className="text-lg font-semibold bg-black p-1 px-2 rounded-l-2xl  pr-3 hover:scale-103 transition-all duration-100 hover:shadow"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-lg font-semibold bg-teal-100 p-1 px-2 text-black  rounded-r-2xl hover:scale-103 transition-all duration-100 hover:shadow "
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </nav>
    </>
  );
};
