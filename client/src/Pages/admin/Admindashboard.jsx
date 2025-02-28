import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   Paper,
//   Button,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Box,
//   IconButton,
// } from "@mui/material";
// import { Close, CloudUpload } from "@mui/icons-material";
// import axios from "axios";

const Dashboard = () => {

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/admin/logout", { method: "POST", credentials: "include" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      Hello i am dashboard <br />
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={handleLogout}>Logout</button>
    </>
  )
};

export default Dashboard;