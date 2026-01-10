import React from "react";
import axios from "axios";
import { useEffect } from "react";

export const EditProductStatus = ({
  setEdit,
  getProducts,
  numberOfItemsApproved,
  orderId,
  orders,
  items,
  getOrders,
}) => {
  const order = orders?.find((order) => order.order_id == orderId);

  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/seller/order/update_order_status`,
        {
          status: status,
          orderId: orderId,
        },
        { withCredentials: true }
      );

      console.log(res);
      getOrders();
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts(order.order_id);
  }, [order]);

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm">
        <div className="bg-teal-50 rounded-2xl shadow-2xl p-5">
            <h2 className="flex justify-center text-xl font-semibold mb-5">Edit Order Status</h2>
          <div className="flex gap-x-2">
            <label className="font-semibold">Order Id:</label>
            <p> {order.order_id}</p>
          </div>
          <div className="flex gap-x-2">
            <p className="font-semibold">Change status:</p>
            <select
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
                      <option value="delivered">Delivered</option>
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
            </select>
          </div>

          <div className="flex justify-end">
            <button
            className=" mt-8 rounded px-3 py-1 bg-teal-200 hover:bg-teal-300 border-black"
            onClick={() => setEdit(false)}
          >
            cancel
          </button>
          </div>
        </div>
      </div>
    </>
  );
};
