import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { BASE_URL } from "../api/api";

const ProtectedRoute = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/admin/dashboard`, {
          method: "GET",
          credentials: "include",
        });

        setAuth(res.ok);
      } catch (error) {
        console.error("Error checking auth:", error);
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) return <div>Loading...</div>;
  return auth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;