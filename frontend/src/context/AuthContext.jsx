import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/verification", {
          withCredentials: true,
        });
        if (res.data.status === "Success") {
          setAuth(true);
          setUser(res.data.user);
          setEmail(res.data.email)
          setUserId(res.data.userId)
          setUserDetails(res.data.userDetails)
        }
        // console.log(res)
      } catch (error) {
        console.log(error);
        setAuth(false);
        // setMessage(error.response?.data?.Error || "Authentication failed");
      }
    };
    
  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        email,
        userId,
        checkAuth,
        userDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook
export const useAuth = () => useContext(AuthContext)