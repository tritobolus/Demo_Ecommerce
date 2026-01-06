import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const Wishlist = () => {
  const [products, setProducts] = useState([])

  const getWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/customer/product/getWishlist", {
        withCredentials: true
      })
      setProducts(res.data.wishlist)
    } catch (error) {
      console.log(error)
    }
  }
    const addToCart = async(productId) => {
    try {
      const res = await axios.post("http://localhost:5000/customer/product/addToCart", 
        { productId:productId},
        {withCredentials:true},
      )
      // console.log(res)
      getWishlist()
      alert(res.data.message)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
      
    }
  }
    const removeWishlist = async(wishlistId) => {
    try {
      const res = await axios.delete("http://localhost:5000/customer/product/removeWishlist",{
          params:{wishlistId:wishlistId},
          withCredentials:true
        },
      )
      // console.log(res)
      getWishlist()
      alert(res.data.message)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
      
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])

  return (
    <>
      <div className="min-h-screen p-5 flex flex-col gap-y-3">
        <h2 className='font-semibold text-3xl'>My Wishlist</h2>
        <hr />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length === 0 && (
            <p className="text-gray-600">No items in wishlist.</p>
          )}

          {products.map((item) => (
            <div key={item.wishlistId} className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 border">
              <img
                src={`http://localhost:5000/${item.imagePath}`}
                alt={item.productName}
                className="w-full h-48 object-cover rounded-md"
              />

              <h3 className="text-xl font-semibold">{item.productName}</h3>
              <p className="text-gray-700">{item.productBrand} - {item.productModel}</p>

              <p className="text-sm text-gray-600">{item.description}</p>

              <div className="flex justify-between items-center mt-2">
                <span className=" text-red-500 line-through">₹{item.price}</span>
                <span className="text-lg font-bold">₹{item.price-(item.price*item.discount)/100}</span>
                <span className="text-green-600 font-semibold">{item.discount}% off</span>
              </div>

              <div className="flex justify-between gap-x-2">
                <button
                  onClick={() => removeWishlist(item.wishlistId)} 
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mt-3">
                Remove from Wishlist
              </button>
                <button
                  onClick={() => addToCart(item.productId)} 
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mt-3">
                Add to cart
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
