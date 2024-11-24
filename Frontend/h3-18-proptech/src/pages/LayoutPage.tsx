import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function LayoutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
    </main>
  );
}

export default LayoutPage;
