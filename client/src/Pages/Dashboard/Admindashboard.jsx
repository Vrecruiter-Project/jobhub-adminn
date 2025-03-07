// import { BASE_URL } from "../../api/api";
import AppProviderBasic from "./component/Sidebar/Sidebar";

const Dashboard = () => {

  // const handleLogout = async () => {
  //   try {
  //     await fetch(`${BASE_URL}/api/admin/logout`, { method: "POST", credentials: "include" });
  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  return (
    <>
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button> */}
      <AppProviderBasic />
    </>
  )
};

export default Dashboard;