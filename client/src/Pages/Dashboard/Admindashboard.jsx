import React from "react";
import { BASE_URL } from "../../api/api";
import DashboardLayoutBasic from "./components/Dashboardlayout";

const Dashboard = () => {

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/admin/logout`, { method: "POST", credentials: "include" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <DashboardLayoutBasic />

    </>
  )
};

export default Dashboard;