import { Outlet } from "react-router-dom";
import SideBarAdmin from "./components/SideBarAdmin";

function DashboardAdminPage() {
  return (
    <div className="relative">
      <SideBarAdmin />
      <div className="bg-[#F8F8F8] min-h-[750px] flex flex-col  items-center py-6 ml-[260px]">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardAdminPage;
