import { Toaster } from "sonner";
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
      <Toaster toastOptions={{unstyled: false, duration: 5000, classNames: {
        success: "border-2 border-success text-success text-title-small-bold",
        error: "border-2 border-error text-error text-title-small-bold",
      }}}/>
    </main>
  );
}

export default LayoutPage;
