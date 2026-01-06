import axios from "axios";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";

export const Orders = () => {
  const { userDetails } = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrderItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/seller/order/get_all_order_items",
        {
          params: { sellerId: userDetails.seller_id },
          withCredentials: true,
        }
      );
      console.log(res);
      setOrders(res.data.allOrderItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderItems();
  }, []);

  const handleStatusChange = async(orderItemId, status) => {
    try {
       const res = await axios.put(`http://localhost:5000/seller/order/update_order_item_status`,
        { 
          status: status,
          orderItemId: orderItemId
         },
        { withCredentials: true }
      );

      console.log(res)
      getOrderItems();
    } catch (error) {
      console.log(error)
      
    }
  }


  return (
    <>
      <div>
        <div className="flex flex-col gap-y-3 h-151 ">
          {orders.map((order) => (
            <div
              key={order.order_item_id}
              className="grid grid-cols-4 justify-center items-center bg-white px-10 py-5 rounded-2xl "
            >
              <div className="flex flex-col">
                <p className="text-2xl  font-semibold">
                Order item id: {order.order_item_id}
              </p>
            
                <p>Quantity {order.quantity}</p>
                <p>Price: {order.price}</p>
                
              
              <div className="flex gap-x-1">
                <label>Buying price:</label>
                <p className="font-semibold">{order.final_price}/-</p>
              </div>
              </div>
              <div className="div">
                <p>product id: {order.product_id}</p>
                <p>product name: {order.product_name}</p>
                <p>product model: {order.product_model}</p>
                <p>product brand: {order.product_brand}</p>
              </div>
              <img 
                  className="h-30 object-cover"
                  src={`http://localhost:5000/${order.image_path}`} alt="" 
              />

              <div className="flex flex-col gap-x-1">
                  <label>Order Status: </label>
                  
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.order_item_id, e.target.value)
                    }
                    className={`border px-2 py-1 rounded ${
                      order.status === "pending"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    <option value="pending">pending</option>
                    <option value="approved">approved</option>
                  </select>
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
