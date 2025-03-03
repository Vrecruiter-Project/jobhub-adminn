import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { BASE_URL } from "../api/api";

const ProtectedRoute = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/dashboard`, {
          method: "GET",
          credentials: "include",
        });
    
        const data = await res.json(); // Get the response body
    
        console.log("Auth Check Response:", res.status, data);
    
        setAuth(res.ok);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };
    

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  return auth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
