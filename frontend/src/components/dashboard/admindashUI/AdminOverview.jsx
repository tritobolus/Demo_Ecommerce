import React from 'react'
import {useAuth} from "../../../context/AuthContext"

export const AdminOverview = () => {
  const {userDetails} = useAuth()
  
  return (
    <>
       <div className="p-5 h-screen flex flex-col justify-between">
        <div className="flex justify-between p-10">
          <div className="flex flex-col ">
            <p className='font-semibold text-3xl'>Welcome</p>
            <p className='font font-semibold text-6xl ml-10 bg-gradient-to-r from-black via-teal-500 to-black
                          bg-clip-text text-transparent'>{userDetails.first_name}{' '} {userDetails.last_name}</p>
          </div>
          <div className="div">
            <p className='p-6  shadow-2xl shadow-green-400 rounded-full text-3xl font-semibold '>{userDetails.status}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mx-30 text-xl">
          <div className="rounded-xl bg-teal-200 p-10 w-100">
            <p className='font-semibold text-2xl'>Order Summery</p>
            <p>Total Orders: 12</p>
            <p>Pending Orders: 2</p>
            <p>Delivered Orders: 10</p>
          </div>
          <div className="rounded-xl bg-teal-200 p-10 w-100">
            <p className='font-semibold text-2xl'>Primary address</p>
            <p>{userDetails.address}</p>
            <p>kol-{userDetails.pincode}</p>
            <p>{userDetails.state}</p>
          </div>
          
        </div>
        <div className="flex justify-between items-center mx-10">
          <p>User since, {new Date(userDetails.created_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}</p>
          <div className='flex flex-col '>
            <p className='font-semibold'>Contact Details</p>
            <p>Email: {userDetails.email_id}</p>
            <p>Phone: {userDetails.phone_no}</p>
          </div>

        </div>
      </div>
    </>
  )
}
