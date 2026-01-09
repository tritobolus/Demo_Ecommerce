import { useState,useEffect } from "react";
import axios from "axios";
import { EditCustomer } from "./EditCustomer";

export const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);

  //to prevent the background scroll issue when my editAdmin is open
  useEffect(() => {
  if (editCustomer) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return () => {
    document.body.style.overflow = "auto";
  };
}, [editCustomer]);
  
  const getCustomers = async() => {
    try {
      const res = await axios.get("http://localhost:5000/customer/get_customer", {
        withCredentials:true,
      })
      setCustomers(res.data.customer)
      
    } catch (error) {
      console.log(error)
    } 
  }

  useEffect(() => {
    getCustomers();
  },[])
  return (
    <>
      <div className='p-5 h-screen flex flex-col gap-y-3'> 
        <h2 className='text-3xl font-semibold'>Manage Customers</h2>
        <hr />
        
        <div className='overflow-y-auto h-100px flex flex-col gap-y-2'>
          {customers.map((customer) => (
            <div key={customer.customer_id} className={`flex justify-between p-4 rounded-xl ${customer.status == "ban" ? "bg-red-100" : "bg-green-100"} border`}>
              <div>
                <p className='text-xl font-semibold'>{customer.first_name + " " + customer.last_name}</p>
                <p>Email: {customer.email_id}</p>
                <p>Phone: {customer.phone_no}</p>
                <p>Created at: {customer.created_at}</p>
              </div>
              <div>
                <p>Status: {customer.status}</p>
                <p>Store Name: {customer.store_name}</p>
               
                <p>last update: {customer.created_at}</p>
                <div className='flex justify-between px-2'>
                  <button className='px-2 py-1 rounded-xl bg-green-300 hover:bg-green-400 transition-all duration-150 hover:cursor-pointer'>See profile</button>
                  <button
                    onClick={() => {setEditCustomer(true), setCurrentCustomerId(customer.customer_id)}}
                    className='px-2 py-1 rounded-xl bg-red-300 hover:bg-red-400 transition-all duration-150 hover:cursor-pointer'
                  >
                    Edit
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
        
      </div>
      {editCustomer && <EditCustomer setEditCustomer={setEditCustomer} currentCustomerId={currentCustomerId} customers={customers} getCustomers={getCustomers}/>}
    </>
  )
}
