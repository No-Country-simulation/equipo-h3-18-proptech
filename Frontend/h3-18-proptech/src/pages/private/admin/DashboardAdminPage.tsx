import { Outlet } from "react-router-dom";
import SideBarAdmin from "./components/SideBarAdmin";

function DashboardAdminPage() {
  return (
    <article className="bg-background flex justify-center min-h-[86vh]">
      <SideBarAdmin />
      <section className="w-full flex flex-col items-center py-6 px-4">
        <Outlet />
      </section>
    </article>
  );
}

export default DashboardAdminPage;
