import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Adminlogin from "../Pages/Login/Adminlogin";
import Dashboard from "../Pages/Dashboard/Admindashboard";
import { ProtectedRoute, HrProtectedRoute } from "./ProtectedRoute";
import Hrlogin from "../Pages/Login/Hrlogin";
import HrDashboard from "../Pages/Dashboard/Hrdashboard";

export default function Approuter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Routes>
      <Route path="/hrlogin" element={<Hrlogin onLogin={() => setIsAuthenticated(true)} />} />
      <Route
        path="/hrdashboard"
        element={
          <HrProtectedRoute isAuthenticated={isAuthenticated}>
            <HrDashboard />
          </HrProtectedRoute>
        }
      />


      <Route path="/" element={<Adminlogin />} />
      {/* <Route path="/hrlogin" element={< Hrlogin />} /> */}


      <Route path="/dashboard" element={<ProtectedRoute />}>

        <Route path="" element={<Dashboard />} />
      </Route>
      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

