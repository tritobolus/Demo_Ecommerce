import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { EditSeller } from './EditSeller';

export const ManageSeller = () => {
  const [sellers, setSellers] = useState([]);
  const [editSeller, setEditSeller] = useState(false);
  const [currentSellerId, setCurrentSellerId] = useState(null);

  //to prevent the background scroll issue when my editAdmin is open
  useEffect(() => {
  if (editSeller) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return () => {
    document.body.style.overflow = "auto";
  };
}, [editSeller]);
  
  const getSellers = async() => {
    try {
      const res = await axios.get("http://localhost:5000/seller/get_sellers", {
        withCredentials:true,
      })
      setSellers(res.data.seller)
      // console.log(res.data.seller)
      
    } catch (error) {
      console.log(error)
    } 
  }

  useEffect(() => {
    console.log(sellers)
  },[sellers])

  useEffect(() => {
    getSellers();
  },[])
  return (
    <>
      <div className='p-5 h-screen flex flex-col gap-y-3'> 
        <h2 className='text-3xl font-semibold'>Manage Seller</h2>
        <hr />
        
        <div className='overflow-y-auto h-100px flex flex-col gap-y-2'>
          {sellers.map((seller) => (
            <div key={seller.seller_id} className={`flex justify-between p-4 rounded-xl ${seller.status == "ban" ? "bg-red-100" : "bg-green-100"} border`}>
              <div>
                <p className='text-xl font-semibold'>{seller.first_name + " " + seller.last_name}</p>
                <p>Email: {seller.email_id}</p>
                <p>Phone: {seller.phone_no}</p>
                <p>Created at: {seller.created_at}</p>
              </div>
              <div>
                <p>Status: {seller.status}</p>
                <p>Store Name: {seller.store_name}</p>
               
                <p>last update: {seller.created_at}</p>
                <div className='flex justify-between px-2'>
                  <button className='px-2 py-1 rounded-xl bg-green-300 hover:bg-green-400 transition-all duration-150 hover:cursor-pointer'>See profile</button>
                  <button
                    onClick={() => {setEditSeller(true), setCurrentSellerId(seller.seller_id)}}
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
      {editSeller && <EditSeller setEditSeller={setEditSeller} currentSellerId={currentSellerId} sellers={sellers} getSellers={getSellers}/>}
    </>
  )
}
