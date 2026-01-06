import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaCircleMinus } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";

export const Cart = () => {
  const [products, setProducts] = useState([]);
  const { checkAuth, userDetails } = useAuth();

  const getCart = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/customer/product/getCart",
        {
          withCredentials: true,
        }
      );
      if (res.status == 200) {
        setProducts(res.data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const increaseQuantity = async(productId) => {
    try {
      const res = await axios.patch("http://localhost:5000/customer/product/increaseQuantity",
        {productId:productId},
        {withCredentials:true}
      )
      getCart()
    } catch (error) {
      console.log(error)
      
    }
  }
  const decreaseQuantity = async(productId, quantity) => {
    try {
      const res = await axios.patch("http://localhost:5000/customer/product/decreaseQuantity",
        {
          productId:productId,
          quantity:quantity
        },
        {withCredentials:true}
      )
      getCart()
    } catch (error) {
      console.log(error)
      
    }
  }
  const removeFromCart = async(cartId) => {
   try {
     const res = await axios.delete("http://localhost:5000/customer/product/removeFromCart",
      {
        params:{cartId:cartId},
        withCredentials:true
      }
    )
    getCart();
    console.log(res)
   } catch (error) {
    console.log(error)
    
   }
  }

  const totalAmount = products.reduce((sum, product) => {
    const finalPrice = product.price - (product.price * product.discount) / 100;
  return sum + product.quantity * finalPrice;
  }, 0);

  const placeOrder = async () => {

    if(products.length === 0) {
      return alert("No items, Add a item to place order")
    }
  const orderData = {
    customerId: userDetails.customer_id,
    deliveryAddress: userDetails.address,
    state: userDetails.state,
    pincode: userDetails.pincode,
    phone: userDetails.phone_no,
    totalAmount: totalAmount,
    numberOfItem: products.length,
    items: products.map(product => {
            const finalPrice = product.price - (product.price * product.discount) / 100;
            return {
              productId: product.product_id,
              sellerId:product.seller_id,
              quantity: product.quantity,
              price: product.price,
              discount: product.discount,
              finalPrice: finalPrice
            };
          })
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/customer/order/create",
      orderData,
      { withCredentials: true }
    );
    console.log(res)

    alert(res.data.message)
    getCart()

    console.log("Order created:", res.data);
  } catch (error) {
    console.log(error);
  }
};



  useEffect(() => {
    getCart();
    checkAuth();
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen p-5 gap-x-5  items-center justify-between">
        <div className="text-2xl flex gap-x-3 justify-between bg-teal-200 px-4 py-2 rounded-md">
        <div className="flex flex-col gap-x-2">
         <div className="flex gap-x-2">
           <p>Deliver to:</p>
          <p className="font-semibold"> {userDetails.first_name}{" "}{userDetails.last_name},</p>
          <p> kol-{userDetails.pincode},</p>
          {/* <p> {userDetails.address}</p> */}
          <p> {userDetails.state},</p>
          <p> {userDetails.country}</p>
         </div>
         <p className="text-sm text-gray-600 ml-63"> {userDetails.address}</p>
        </div>
        <button className="px-2 py-1 rounded-md border border-black bg-teal-100 ">Change address</button>
      </div>
      <div className="flex flex-col justify-center overflow-auto items-center gap-y-2 my-2 ">
        {products.length === 0 && <p>No items yet, add a item now</p>}
        {products.map((product) => (
          <div key={product.product_id} className="grid grid-cols-4 p-2 bg-gray-300/60 w-200 ">
            <img
              className="h-37 w-30 object-cover"
              src={`http://localhost:5000/${product.image_path}`}
              alt={product.product_id}
            />
            <div className="flex flex-col">
              <p className="font-semibold text-xl  bg-gray-600/90 text-white text-center">Product details</p>
              <p className="text-2xl font-semibold">{product.product_name}</p>
              <p className="line-through text-red-500">MRP: {product.price}</p>
              <p>MRP: {product.price - (product.price * product.discount) / 100}</p>
              <p className="text-green-600">
                  {product.discount}% discount
              </p>
            </div>
            <div className="flex flex-col   ">
              <p className="font-semibold text-xl bg-gray-600/90 text-white text-center ">Quantity</p>
              <div className="flex  mt-10 justify-between mx-6">
                <button className="active:scale-95 hover:scale-105">
                  <FaCircleMinus onClick={() => decreaseQuantity(product.product_id, product.quantity)} size={22} />
                </button>
                <p className="text-3xl font-semibold">{product.quantity}</p>
                <button className="active:scale-95 hover:scale-105">
                  <IoMdAddCircle  onClick={() => increaseQuantity(product.product_id)} size={25} />
                </button>
              </div>
            </div>
          
            <div className="flex flex-col  justify-between">
              <p className="font-semibold text-xl bg-gray-600/90 text-white text-center">Final price</p>
              <p className="text-xl text-center font-semibold ">{product.quantity*(product.price - (product.price * product.discount) / 100)}</p>
              <button onClick={() => removeFromCart(product.cart_id)} className="bg-red-500 text-white rounded-xl py-1 px-2">remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex  gap-x-10 justify-between">
        <div className="text-2xl font-semibold">Total items: {products.length}</div>
        <div className="text-2xl font-semibold">Total amount: {totalAmount}</div>
        <button 
          onClick={() => placeOrder()}
          className="rounded-md bg-green-500 hover:scale-102 active:scale-99 duration-150 transition-all text-xl text-white px-2 py-1">Place Order</button>
      </div>
      </div>
    </>
  );
};
