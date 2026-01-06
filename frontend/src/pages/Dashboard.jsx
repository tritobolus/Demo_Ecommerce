import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === "customer") navigate("/customerdash", { replace: true });
    if (user === "seller") navigate("/sellerdash",  { replace: true });
    if (user === "admin") navigate("/admindash",  { replace: true });
  }, [user, navigate]);

  return <div>Loading...</div>;
};
