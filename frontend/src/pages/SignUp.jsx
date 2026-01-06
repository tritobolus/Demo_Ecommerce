import { useState } from "react";
import { states } from "../assets/statesData.js";
import axios from "axios";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [coustomer, setCoustomer] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [panCard, setPanCard] = useState("");
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");

  const data = {
    firstName,
    lastName,
    email,
    state,
    pincode,
    address,
    phoneNo,
    password,
    panCard,
    storeName,
    description
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //preventing auto-refresh
    e.preventDefault();
    
    // this is for customer account creation
    if(coustomer){
      if (
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      state == "" ||
      pincode == "" ||
      address == "" ||
      phoneNo == "" ||
      password == ""
    ) {
      alert("Need to fill all inputs");
      return;
    }
    
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/customer/signup",
        data
      );
      // alert(res.responce.data.message)
      console.log(res);
      if (res.status === 201) {
        alert("customer registered successfully");
        navigate('/signin');
      }
  
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
    console.log(data);
    } 
    
    //this is for seller account creation
    else {
        if (
        firstName == "" ||
        lastName == "" ||
        email == "" ||
        state == "" ||
        pincode == "" ||
        address == "" ||
        phoneNo == "" ||
        password == "" ||
        panCard == "" ||
        storeName == "" ||
        description == "" 
      ) {
        alert("Need to fill all inputs");
        return;
      }
    
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/seller/signup",
        data
      );
      // alert(res.responce.data.message)
      console.log(res);
      if (res.status === 201) {
        alert("customer registered successfully");
        navigate('/signin')
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
    console.log(data);
    }
  };
  return (
    <>
      <div className=" flex justify-center mt-5">
        <div className="bg-teal-100   p-5  rounded-2xl flex flex-col justify-center items-center">
          <h1 className="flex justify-center font-semibold text-2xl mb-5">
            Wealcome here, Please Sign Up
          </h1>
          <div className="flex justify-center gap-x-20 mb-5  rounded-lg bg-teal-50 ">
            <p
              className={`text-xl rounded-lg py-1 px-2 ${
                coustomer ? `bg-black text-white` : ``
              }`}
              onClick={() => setCoustomer(true)}
            >
              Customer
            </p>

            <p
              className={`text-xl rounded-lg py-1 px-2 ${
                coustomer ? `` : `bg-black text-white`
              }`}
              onClick={() => setCoustomer(false)}
            >
              Seller
            </p>
          </div>

          {/* signUp from for customrs */}
          <form onSubmit={handleSubmit} className="">
            <div className="flex gap-18">
              <div className="flex flex-col">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  placeholder="enter your first name"
                  className="border px-2 py-1 w-50 rounded-xl "
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  placeholder="enter your last name"
                  className="border px-2 py-1 w-50 rounded-xl"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-18 mt-3">
              <div className="flex flex-col">
                <label htmlFor="">Phone No</label>
                <input
                  type="number"
                  placeholder="enter your phone no"
                  className="border px-2 py-1 w-50 rounded-xl"
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Email Id</label>
                <input
                  type="email"
                  placeholder="enter your email id"
                  className="border px-2 py-1 w-50 rounded-xl"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {!coustomer && (
              <div className="flex gap-18 mt-3">
                <div className="flex flex-col">
                  <label htmlFor="">Store Name</label>
                  <input
                    type="text"
                    placeholder="enter your store name"
                    className="border px-2 py-1 w-50 rounded-xl"
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">PAN Card </label>
                  <input
                    type="text"
                    placeholder="enter your PAN card no"
                    className="border px-2 py-1 w-50 rounded-xl"
                    onChange={(e) => setPanCard(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="flex mt-3 gap-x-18">
              <div className="flex flex-col">
                <label htmlFor="">State</label>
                <select
                  onChange={(e) => setState(e.target.value)}
                  className="border px-2 py-1 rounded-xl w-50 "
                >
                  <option value="">Select your state</option>
                  {states.map((state) => (
                    <option className="" key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Pincode </label>
                <input
                  type="number"
                  className="border px-2 py-1  rounded-xl w-50 "
                  placeholder="ex-700014"
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>
            <div className=" flex items-center gap-x-3 mt-3">
              <label htmlFor="">Address</label>
              <textarea
                name=""
                id=""
                className="border w-100 rounded-xl px-2 py-1"
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            {!coustomer && (
              <div className=" flex items-center gap-x-3 mt-3">
                <label htmlFor="">Description</label>
                <textarea
                  name=""
                  id=""
                  className="border w-94 rounded-xl px-2 py-1"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            )}
            <div className=" flex items-center gap-x-3 mt-3">
              <label htmlFor="">password</label>
              <input
                type="password"
                className="border px-2 py-1 w-97 rounded-xl "
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-black hover:scale-101 active:scale-99 transition-all duration-150 text-white flex items-center justify-center px-5 py-2 w-117 rounded-2xl mt-5"
            >
              Create Account
            </button>
          </form>
          <div className="flex mt-2 gap-x-2">
            <p className="text-gray-600">Don't have any account?</p> 
            <Link to='/signin' className="text-blue-500 hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
};
