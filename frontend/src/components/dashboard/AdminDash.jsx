import {useAuth} from "../../context/AuthContext"
import { useEffect } from 'react';
import {Link, Outlet} from "react-router-dom"
import { useLocation, useNavigate } from "react-router-dom";

 const AdminDash = () => {
  const {userDetails, checkAuth} = useAuth();
   const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  },[])
  return (
    <>
       <div className="grid grid-cols-5 h-screen">
        {/* left section */}
        <div className="col-span-1 bg-teal-400 p-2 flex flex-col justify-between">
          <h2 className="flex justify-center text-3xl italic font-bold mt-2">shopNOW</h2>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold">Admin Dashboard</p>
            <div className='flex gap-x-1'>
              
            <p className=''>welcome </p>
            <p className='font-semibold'> {userDetails.first_name}</p>
            <p>!</p>

            </div>
            <p className='font-semibold'>Role: {userDetails.role}</p>
            <p>Email Id: {userDetails.email_id}</p>
            <p>Phone No: {userDetails.phone_no}</p>
            <p>Address: {userDetails.address}</p>
          </div>
          <div className=" flex flex-col  p-2 gap-y-1">
            {/* overview */}
            <Link to="" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/admindash" ? "bg-black" : "bg-teal-600"}`}>Overview</Link>

            {/* Create admin */}
            {userDetails.role == "super_admin" && 
              <Link to="create_admin" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/admindash/create_admin" ? "bg-black" : "bg-teal-600"}`}>Create Admin</Link>
            }
            
            {/* Manage Admin */}
            {userDetails.role == "super_admin" && 
              <Link to="manage_admin" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/admindash/manage_admin" ? "bg-black" : "bg-teal-600"}`}>Manage Admin</Link>
            }

            {/* manage seller */}
            {(userDetails.role == "super_admin" || userDetails.role == "seller_admin") &&
              <Link to="manage_seller" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/admindash/manage_seller" ? "bg-black" : "bg-teal-600"}`}>Manage Seller</Link>
            }
            {(userDetails.role == "super_admin" || userDetails.role == "seller_admin") &&
              <Link to="manage_orders" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/admindash/manage_orders" ? "bg-black" : "bg-teal-600"}`}>Manage Orders</Link>
            }

            {/* Manage user */}
            {(userDetails.role == "super_admin" || userDetails.role == "customer_admin") &&
              <Link to="manage_user" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/admindash/manage_user"  ? "bg-black" : "bg-teal-600"}`}>Manage User</Link>
            }  



            {/* settings */}
            <Link to="settings" replace className={`flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1  text-white text-xl ${location.pathname === "/customerdash/settings" ? "bg-black" : "bg-teal-600"}`}>Settings</Link>

            {/* Support & Help */}
            <Link replace className="flex justify-center rounded hover:scale-103 transition-all duration-150 py-2 px-1 bg-teal-600 text-white text-xl">Support & Help</Link>

          </div>
          {/* Logout */}
          <button className="bg-red-600 px-1 py-2 rounded text-white">Logout</button>
        </div>

        {/* Right section */}
        <div className="col-span-4 bg-gray-100 overflow-y-auto ">
          <Outlet/>
        </div>


      </div>

    </>
  )
}

export default AdminDash;