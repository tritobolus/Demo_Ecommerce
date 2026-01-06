import React from 'react'
import { Orders } from './Orders'

export const ManageOrders = () => {
  return (
    <>
       <div className=" h-screen flex flex-col gap-y-3 p-5 ">
        <h2 className="font-semibold text-3xl">Manage Your Orders</h2>
        <hr />
        <div className="flex justify-between">
          <div className=" bg-teal-400 rounded-md text-2xl  font-semibold flex flex-col items-center  p-4">
            <p>Total Orders</p>
            {/* <p>{totalProduct ? totalProduct : 0}</p> */}
          </div>
          <div className="bg-teal-400 rounded-md text-2xl  font-semibold flex flex-col items-center p-4">
            <p>Pending Orders</p>
            {/* <p>{enableProduct ? enableProduct : 0}</p> */}
          </div>
          <div className="bg-teal-400 rounded-md text-2xl font-semibold flex flex-col items-center  p-4">
            <p>Proceesing Orders</p>
            {/* <p>{disableProduct ? disableProduct : 0}</p> */}
          </div>

          <div
            className="bg-teal-400 rounded-md text-2xl font-semibold flex flex-col justify-center  p-4"
          >
            Delivered Orders
          </div>
        </div>
        <h3 className="text-xl">Your Orders</h3>
        <div className=" overflow-y-auto">
          <Orders/>
        </div>
      </div>
    </>
  )
}
