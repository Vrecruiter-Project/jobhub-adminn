import { Routes, Route, Navigate } from "react-router-dom";

import Adminlogin from "../Pages/Login/Adminlogin";
import Dashboard from "../Pages/Dashboard/Admindashboard";
import ProtectedRoute from "./ProtectedRoute";
import Hrlogin from "../Pages/Login/Hrlogin";

export default function Approuter() {
  return (
    <Routes>
      <Route path="/" element={<Adminlogin />} />
      <Route path="/hrlogin" element={< Hrlogin />} />
      <Route path="/dashboard" element={<ProtectedRoute />}>

        <Route path="" element={<Dashboard />} />
      </Route>
      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

