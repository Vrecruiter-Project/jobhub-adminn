
import { BASE_URL } from "../../api/api";
import DashboardLayoutBasic from "./component/sidebar";
const Dashboard = () => {

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/api/admin/logout`, { method: "POST", credentials: "include" });
      window.location.href = "/";
    } catch (error)  {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>

<DashboardLayoutBasic />


























      
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" onClick={handleLogout}>Logout</button>
    </>
  )
};

export default Dashboard;