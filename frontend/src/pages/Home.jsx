import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

import {filterProduct} from './filterProduct'

import { useProduct } from "../context/productContext";

export const Home = () => {
  const { auth, checkAuth, user, userId, userDetails } = useAuth();
  const { searchQuery, products, getProducts } = useProduct();

  
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    checkAuth();
  }, []);

   useEffect(() => {
    getProducts()
  },[])

  useEffect(() => {
    setFilteredProducts(filterProduct(products, searchQuery))
  },[searchQuery])

  const addToWishlist = async(productId) => {
    try {
      const res = await axios.post("http://localhost:5000/customer/product/addToWishlist", 
        { productId:productId},
        {withCredentials:true},
      )
      // console.log(res)
       alert(res.data.message)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
      
    }
  }
  const addToCart = async(productId) => {
    try {
      const res = await axios.post("http://localhost:5000/customer/product/addToCart", 
        { productId:productId},
        {withCredentials:true},
      )
      // console.log(res)
      alert(res.data.message)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
      
    }
  }
  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      if (res.data.status === "Success") {
        alert("Successful logout")
        // setTimeout(() => {
        //   navigate("/login");
        //   window.location.reload();
        // }, 1500);
        window.location.reload();
      }
    } catch (error) {
      alert("Logout failed");
      console.log(error);
    }
  };

  return (
    <>
      {/* <NavBar /> */}
      <div className="w-screen h-150 grid grid-cols-7">
        <div className="col-span-1 bg-gray-200">
          <p>Product Filter</p>
        </div>
        <div className="col-span-6 overflow-auto ">
          <p>
            {(filteredProducts.length == 0 && searchQuery == "") ? "Search filtered" :(
              (filteredProducts.length == 0 && searchQuery.length > 0) ? "item not found" : ""
            ) }
          </p>
          <div className="grid grid-cols-3 gap-2 p-5">
            {filteredProducts.map((product) => (
              
              <div key={product.item.product_id} className="">
               <div className="bg-gray-200 p-2">
                <p>Seller: {product.item.store_name}</p>

                <Link to={`/product/${product.item.product_id}`} className="  flex gap-x-6">
                 <img 
                className="h-50 w-40 object-cover"
                  src={`http://localhost:5000/${product.item.image_path}`} alt={product.item.product_id} 
                />
                <div className="flex flex-col justify-between">
                <p className="text-2xl font-semibold">{product.item.product_name}</p>
                <p className="font-semibold text-gray-700">
                  Brand: {product.item.product_brand}
                </p>
                <p className="font-semibold text-gray-700">
                  Model: {product.item.product_model}
                </p>
                <p className="">
                  {product.item.description.length > 20
                    ? product.item.description.substring(0, 20) + "..."
                    : product.item.description}
                </p>
                <p className="line-through text-red-500">
                  M.R.P: {product.item.price}
                </p>
                <div className="flex items-center gap-x-1">
                  <p>Current M.R.P:</p>
                  <p className="font-semibold text-xl">
                    {" "}
                    {product.item.price - (product.item.price * product.item.discount) / 100}
                    /-
                  </p>
                </div>
                <p className="text-green-600">
                  {product.item.discount}% discount
                </p>
              </div>
             
             
               </Link>

               {userDetails.role == "super_admin" || userDetails.role == "seller_admin" || userDetails.role == "customer_admin" ? "" : (

                <div className="flex justify-between mt-2">

                  <button 
                  onClick={() => addToWishlist(product.item.product_id)}
                    className="bg-yellow-500 text-black rounde-xl hover:scale-102 hover:bg-amber-300 active:scale-98 transition-all duration-150 rounded-xl px-2 py-1">      
                      Add to wishlist
                  </button>
                  <button 
                    onClick={() => addToCart(product.item.product_id)}
                    className="bg-red-500 text-white rounde-xl hover:scale-102 hover:bg-red-400 active:scale-98 transition-all duration-150 rounded-xl px-2 py-1">      
                      Add to cart
                  </button>
              </div>
             )}
               </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      {auth == true ? (
        <>
          <p className="bg-green-500">You're authenticated</p>
          <p>user:{user}</p>
          <p>userId:{userId}</p>
          <button onClick={()=> logout()} className="bg-red-500">Logout</button>
        </>
      ) : (
        <>
          <p className="bg-red-500">You're not authenticated</p>
          
        </>
      )}
    </>
  );
};
