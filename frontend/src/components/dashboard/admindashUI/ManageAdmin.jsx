import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [allAdmins, setAllAdmins] = useState(true);
  const [sellerAdmins, setSellerAdmins] = useState(false);
  const [customerAdmins, setCustomerAdmins] = useState(false);
  const [superAdmins, setSuperAdmins] = useState(false);

  const getCurrrentAdmin = () => {
    if(allAdmins) {
      return "allAdmin";
    } else if (sellerAdmins) {
      return "seller_admin";
    } else if (customerAdmins) {
      return "customer_admin"
    } else {
      return "super_admin"
    }
  }
  

  const getAdmins = async() => {
    try {
      const currentAdmin = getCurrrentAdmin();
      const res = await axios.get("http://localhost:5000/admin/get_admins", {
        withCredentials:true,
        params:{currentAdmin: currentAdmin}
      })
      setAdmins(res.data.admin)
      // console.log(res.data.admin)
      
    } catch (error) {
      console.log(error)
    } 
  }
  useEffect(() => {
    getAdmins();
  },[allAdmins,sellerAdmins,customerAdmins,superAdmins])
  return (
    <>
      <div className='p-5 h-screen flex flex-col gap-y-3'> 
        <h2 className='text-3xl font-semibold'>Manage Admin</h2>
        <hr />
        <div className='flex justify-between'>
          <div onClick={()=> {setAllAdmins(true),setSuperAdmins(false),setCustomerAdmins(false),setSellerAdmins(false)}}>
            <p  className='text-2xl font-semibold'>All Admin</p>
            <hr className={`border-2 rounded-4xl ${allAdmins ? "text-black" : "text-gray-400"}`} />
          </div>
          <div onClick={()=> {setAllAdmins(false),setSuperAdmins(false),setCustomerAdmins(false),setSellerAdmins(true)}}>
            <p  className='text-2xl font-semibold'>Seller Admin</p>
            <hr className={`border-2 rounded-4xl ${sellerAdmins ? "text-black" : "text-gray-400"}`} />
          </div>
          <div onClick={()=> {setAllAdmins(false),setSuperAdmins(false),setCustomerAdmins(true),setSellerAdmins(false)}}>
            <p  className='text-2xl font-semibold'>Customer Admin</p>
            <hr className={`border-2 rounded-4xl ${customerAdmins ? "text-black" : "text-gray-400"}`} />
          </div>
          <div onClick={()=> {setAllAdmins(false),setSuperAdmins(true),setCustomerAdmins(false),setSellerAdmins(false)}}>
            <p  className='text-2xl font-semibold'>Super Admin</p>
            <hr className={`border-2 rounded-4xl ${superAdmins ? "text-black" : "text-gray-400"}`} />
          </div>
        </div>
        <div className='overflow-y-auto h-100px flex flex-col gap-y-2'>
          {admins.map((admin) => (
            <div key={admin.admin_id} className='flex justify-between p-4 rounded-xl bg-white border'>
              <div>
                <p className='text-xl font-semibold'>{admin.first_name + " " + admin.last_name}</p>
                <p>Email: {admin.email_id}</p>
                <p>Phone: {admin.phone_no}</p>
                <p>Created at: {admin.created_at}</p>
              </div>
              <div>
                <p>Status: {admin.status}</p>
                <p>Role: {admin.role}</p>
               
                <p>last update: {admin.created_at}</p>
                <div className='flex justify-between px-2'>
                  <button className='px-2 py-1 rounded-xl bg-green-300 hover:bg-green-400 transition-all duration-150'>See profile</button>
                  <button className='px-2 py-1 rounded-xl bg-red-300 hover:bg-red-400 transition-all duration-150'>Edit</button>
                </div>

              </div>
            </div>
          ))}
        </div>
        
      </div>
    </>
  )
}
