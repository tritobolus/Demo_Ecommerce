import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { EditProductStatus } from "./EditProductStatus";

export const AdminManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [items, setItems] = useState([]);
  const [numberOfItemsApproved, setNumberOfItemsApproved] = useState([]);
  const [edit, setEdit] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);


  const getOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/seller/order/getOrders",
        {
          withCredentials: true,
        }
      );
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const getProducts = async(orderId) => {
    try {
        const res = await axios.get(
          "http://localhost:5000/seller/order/get_order_items",
          {
            params: { orderId: orderId },
            withCredentials: true,
          }
        );
        console.log(res.data.orderItems);
        setItems(res.data.orderItems);
        setNumberOfItemsApproved(res.data.numberOfItemsApproved);
      } catch (error) {
        console.log(error);
      }
  }

  const showProducts = async (orderId) => {
    if (openOrderId === orderId) {
      setOpenOrderId(null); // close if already open
    } else {
      setOpenOrderId(orderId); // open
      getProducts(orderId);
    }
  };



  return (
    <div className="p-5 h-screen flex flex-col gap-y-3">
      <h2 className="text-3xl font-semibold ">Manage Orders</h2>
      <hr />
      {orders.length == 0 && (
        <div className="flex justify-center">
          No orders yet. Let customers place an order.
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
            <div className="flex justify-between">
              <p className="font-semibold">
                Order by - {order.first_name} {order.last_name}
              </p>
              <p className="font-semibold">customer Id: {order.customer_id}</p>
            </div>
            <div className="flex flex-col">
              <p>Items: {order.no_of_item}</p>
              <div className="flex gap-x-2 items-center">
                <label>Order Status:</label>

                {/* <select
                  value={order.order_status}
                  onChange={(e) =>
                    handleStatusChange(order.order_id, e.target.value)
                  }
                  className={`border px-2 py-1 rounded ${
                    order.order_status === "pending"
                      ? "text-orange-400"
                      : order.order_status === "processing"
                      ? "text-yellow-500"
                      : order.order_status === "shipped"
                      ? "text-blue-500"
                      : order.order_status === "delivered"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {order.order_status !== "delivered" && (
                    <>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>

                      {items.length === numberOfItemsApproved && (
                        <>
                          <option value="shipped">Shipped</option>
                        </>
                      )}

                      <option value="cancelled">Cancelled</option>
                    </>
                  )}
                  {order.order_status == "delivered" && (
                    <>
                      <option value="delivered">Delivered</option>
                    </>
                  )}
                </select> */}
               <div className="flex justify-center items-center gap-x-3">
                 <p 
                  className={`border px-2 py-1 rounded ${
                    order.order_status === "pending"
                      ? "text-orange-400"
                      : order.order_status === "processing"
                      ? "text-yellow-500"
                      : order.order_status === "shipped"
                      ? "text-blue-500"
                      : order.order_status === "delivered"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {order.order_status}
                </p>
                  {/* to handle status of the product */}
                  <CiEdit onClick={() => {setEdit(true), setCurrentOrderId(order.order_id)}} size={25} className="hover:scale-105 hover:shadow-2xl transition-all duration-100"/>
                    
               </div>
              </div>
            </div>
            <div className="flex gap-x-1">
              <label>Total Amount:</label>
              <p className="font-semibold">{order.total_amount}/-</p>
            </div>

            <div className="flex justify-between mt-2">
              <div className="flex gap-x-1">
                <label>Deliver to :</label>
                <p>{order.delivery_address},</p>
                <p>Kol-{order.pincode}</p>
              </div>
              <button
                onClick={() => showProducts(order.order_id)}
                className="hover:scale-102 active:scale-98 hover:underline transition-all duration-100 flex justify-center items-center gap-x-1"
              >
                {/* FaArrowDown, FaArrowLeft */}
                <p className="mt-1">
                  {openOrderId === order.order_id ? (
                    <FaArrowDown />
                  ) : (
                    <FaArrowLeft />
                  )}
                </p>
                <p className="font-semibold">see products</p>
              </button>
            </div>
            {openOrderId === order.order_id && (
              <div className="mt-2 bg-gray-100 p-3 rounded-md shadow-lg">
                {items.map((item) => (
                  <div
                    key={item.order_item_id}
                    className="grid grid-cols-9 mt-1 mb-1 border border-gray-400 p-1"
                  >
                    <img
                      className="h-20 w-15 object-cover rounded-md"
                      src={`http://localhost:5000/${item.image_path}`}
                      alt=""
                    />
                    <p className="flex items-center justify-center">
                      {item.product_name}
                    </p>
                    <p className="flex items-center justify-center">
                      {item.product_brand}
                    </p>
                    <p className="flex items-center justify-center">
                      {item.product_model}
                    </p>
                    <p className="flex items-center justify-center">
                      {item.price}
                    </p>
                    <p className="flex items-center justify-center">
                      {item.final_price}
                    </p>
                    <p className="flex items-center justify-center">
                      {item.quantity}
                    </p>
                    <p className="flex items-center justify-center">
                      {item.final_price * item.quantity}
                    </p>
                    <p
                      className={`flex items-center justify-center ${
                        item.status == "pending"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
        {edit && <EditProductStatus setEdit={setEdit} getProducts={getProducts} numberOfItemsApproved={numberOfItemsApproved} orderId = {currentOrderId} orders={orders} items={items} getOrders={getOrders}  />}
    </div>
  );
};
