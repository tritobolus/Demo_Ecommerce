import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

export const SignIn = () => {
  const [coustomer, setCoustomer] = useState(true);
  const [seller, setSeller] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

   axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    //preventing auto-refresh
    e.preventDefault();

    if (email == "" || password == "") {
        alert("Need to fill all inputs");
        return;
      }

    // this is for customer sign in
    if (coustomer) {
      try {
        const res = await axios.post(
          "http://localhost:5000/auth/customer/signin",
          {email, password, user:"customer"}
        );
        // alert(res.responce.data.message)
        console.log(res);
        if (res.status === 200) {
          alert("Customer login successfully");
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }

    //this is for seller sign in
    else if (seller) {
      try {
        const res = await axios.post(
          "http://localhost:5000/auth/seller/signin",
          {email, password, user:"seller"}
        );
        // alert(res.responce.data.message)
        console.log(res);
        if (res.status === 200) {
          alert("Seller login successfully");
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
    //this is fro admin sign in
    else if(admin){
        try {
        const res = await axios.post(
          "http://localhost:5000/auth/admin/signin",
          {email, password, user:"admin"}
        );
        // alert(res.responce.data.message)
        console.log(res);
        if (res.status === 200) {
          alert("Admin login successfully");
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    }
}
  return (
    <>
      <div className=" flex justify-center mt-40">
        <div className="bg-teal-100 w-95  p-5  rounded-2xl flex flex-col justify-center items-center">
          <h1 className="flex justify-center font-semibold text-2xl mb-5">
            Wealcome here, Please Sign In
          </h1>
          <div className="flex justify-center gap-x-5 mb-5 w-70 rounded-lg bg-teal-50 ">
            <p
              className={`text-xl rounded-lg py-1 px-2 ${
                coustomer ? `bg-black text-white` : ``
              }`}
              onClick={() => {
                setCoustomer(true);
                setAdmin(false);
                setSeller(false);
              }}
            >
              Customer
            </p>

            <p
              className={`text-xl rounded-lg py-1 px-2 ${
                seller ? `bg-black text-white` : ``
              }`}
              onClick={() => {
                setCoustomer(false);
                setAdmin(false);
                setSeller(true);
              }}
            >
              Seller
            </p>
            <p
              className={`text-xl rounded-lg py-1 px-2 ${
                admin ? `bg-black text-white` : ``
              }`}
              onClick={() => {
                setCoustomer(false);
                setAdmin(true);
                setSeller(false);
              }}
            >
              Admin
            </p>
          </div>

          {/* signIn from for customrs */}
          <form onSubmit={handleSubmit} className="w-100">
            <div className="flex flex-col gap-y-3.5 items-center">
              <div className="flex flex-col">
                <label htmlFor="">Email ID</label>
                <input
                  type="email"
                  placeholder="enter your first name"
                  className="border px-2 py-1 w-70 rounded-xl "
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col ">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  placeholder="enter your first name"
                  className="border px-2 py-1 w-70 rounded-xl "
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-black hover:scale-101 active:scale-99 transition-all duration-150 text-white flex items-center justify-center w-80 ml-10   py-2 rounded-2xl mt-10"
            >
              Sign In
            </button>
          </form>
          <div className="flex mt-2 gap-x-2">
            <p className="text-gray-600">Don't have any account?</p> 
            <Link to='/signup' className="text-blue-500 hover:underline">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  )
};
