import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("https://jobhub-admin.onrender.com/api/admin/dashboard", {
        credentials: "include", 
      });
      setAuth(res.ok);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;
  return auth ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
