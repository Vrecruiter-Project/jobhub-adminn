import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Adminlogin from "../Pages/Login/Adminlogin";
import Dashboard from "../Pages/Dashboard/Admindashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function Approuter() {
  return (
    <Routes>
      <Route path="/" element={<Adminlogin />} />
      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

