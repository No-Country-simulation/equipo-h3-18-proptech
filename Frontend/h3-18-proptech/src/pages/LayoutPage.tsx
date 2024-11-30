import Footer from "../components/footer/Footer";
import Modal from "../components/Modal/Modal";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function LayoutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Modal />
      <Footer />
    </main>
  );
}

export default LayoutPage;
