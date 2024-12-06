import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Modal } from "../components/modal";
import { useSessionStore } from "../stores";
import { getCookie } from "../lib";
import LoadingPage from "./LoadingPage";

export function LayoutPage() {
  const [loading, setLoading] = useState(true);
  const newSession = useSessionStore((state) => state.newSession);
  useEffect(() => {
    const cookie = getCookie("user") ?? {};
    if (cookie.token) {
      newSession(cookie.token);
    }
    setLoading(false);
  }, []);

  return loading ? (
    <LoadingPage background="contrast" size="page"/>
  ) : (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Modal />
      <Footer />
      <Toaster
        toastOptions={{
          unstyled: false,
          duration: 5000,
          classNames: {
            success:
              "border-2 border-success text-success text-title-small-bold",
            error: "border-2 border-error text-error text-title-small-bold",
          },
        }}
      />
    </main>
  );
}

export default LayoutPage;
