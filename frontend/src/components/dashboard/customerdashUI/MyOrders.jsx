import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { AddReview } from "./AddReview";

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [items, setItems] = useState([]);
  const [reviewItems, setReviewItems] = useState([]);
  const [openReview, setOpenReview] = useState(false);


  const getOders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/customer/order/getOrders",
        {
          withCredentials: true,
        }
      );
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/customer/order/delete",
        {
          params: { orderId: orderId },
          withCredentials: true,
        }
      );
      getOders();
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOders();
  }, []);

  const showProducts = async (orderId) => {
    if (openOrderId === orderId) {
      setOpenOrderId(null); // close if already open
    } else {
      setOpenOrderId(orderId); // open
      try {
        const res = await axios.get("http://localhost:5000/customer/order/get_order_items",
        {
          params:{orderId:orderId},
          withCredentials: true,
        }
      );
      console.log(res.data.orderItems)
      setItems(res.data.orderItems)
        
      } catch (error) {
        console.log(error)
      }
    }
  };
  const getReviewProducts = async (orderId) => {
    
      try {
        const res = await axios.get("http://localhost:5000/customer/order/get_order_items",
        {
          params:{orderId:orderId},
          withCredentials: true,
        }
      );
      console.log(res.data.orderItems)
      setReviewItems(res.data.orderItems)
        
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <>
      <div className="p-5 h-screen flex flex-col gap-y-3">
        <h2 className="text-3xl font-semibold ">My Orders</h2>
        <hr />
        {orders.length == 0 && (
          <div className="flex justify-center">
            No Orders Yet, Make a Order Now!
          </div>
        )}
        <div className="flex flex-col gap-y-3 h-151 overflow-y-auto ">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="flex flex-col bg-white px-10 py-5 rounded-2xl "
            >
              <div className="flex justify-between text-2xl  font-semibold ">
                <p>Order id: {order.order_id}</p>
                <p>
                  Order date:{" "}
                  {new Date(order.order_date).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="flex flex-col">
                <p>Items: {order.no_of_item}</p>
                <div className="flex gap-x-1">
                  <label>Order Status: </label>
                  <p
                    className={`${
                      order.order_status === "pending"
                        ? "text-orange-500"
                        : order.order_status === "processing"
                        ? "text-yellow-500"
                        : order.order_status === "shipped"
                        ? "text-blue-500" 
                        : order.order_status === "delivered"
                        ? "text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    {order.order_status}
                  </p>
                </div>
              </div>
              <div className="flex gap-x-1">
                <label>Total Amount:</label>
                <p className="font-semibold">{order.total_amount}/-</p>
              </div>
              <div className="flex gap-x-1">
                <label>Deliver to :</label>
                <p>{order.delivery_address},</p>
                <p>Kol-{order.pincode}</p>
              </div>
              <div className="flex justify-between mt-2">
                {order.order_status != "delivered" 
                      ? <button
                        onClick={() => deleteOrder(order.order_id)}
                        className="rounded-md bg-red-500 hover:bg-red-600 py-1 px-2 text-white"
                      >
                        Delete Order
                      </button>
                      : <button
                        onClick={() =>{ setOpenReview(true), getReviewProducts(order.order_id) }}
                        className="rounded-md bg-green-500 hover:bg-green-600 py-1 px-2 text-white"
                      >
                        Add Review
                      </button>
                }
                <button
                  onClick={() => showProducts(order.order_id)}
                  className="hover:scale-102 active:scale-98 hover:underline transition-all duration-100 flex justify-center items-center gap-x-1"
                >
                  {/* FaArrowDown, FaArrowLeft */}
                  <p className="mt-1">{openOrderId === order.order_id ? <FaArrowDown/> :<FaArrowLeft/> }</p>
                  <p className="font-semibold">see products</p>
                </button>
              </div>
              {openOrderId === order.order_id && (
                <div className="mt-2 bg-gray-100 p-3 rounded-md shadow-lg">
                  {items.map((item) => (
                    <div key={item.order_item_id} className="grid grid-cols-8 mt-1 mb-1 border border-gray-400 p-1">
                      <img
                          className="h-20 w-15 object-cover rounded-md"
                          src={`http://localhost:5000/${item.image_path}`}
                          alt="" 
                        />
                      <p className="flex items-center justify-center">{item.product_name}</p>
                      <p className="flex items-center justify-center">{item.product_brand}</p>
                      <p className="flex items-center justify-center">{item.product_model}</p>
                      <p className="flex items-center justify-center">{item.price}</p>
                      <p className="flex items-center justify-center">{item.final_price}</p>
                      <p className="flex items-center justify-center">{item.quantity}</p>
                      <p className="flex items-center justify-center">{item.final_price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              )}

             
            </div>
          ))}
        </div>
         {openReview && <AddReview reviewItems={reviewItems} setOpenReview={setOpenReview} />}
      </div>
    </>
  );
};
