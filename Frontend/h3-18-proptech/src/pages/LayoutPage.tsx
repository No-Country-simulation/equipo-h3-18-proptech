import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { useSessionStore } from "../stores/session/session.store";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Loader } from "../components/common";
import { Modal } from "../components/modal";

export function LayoutPage() {
  const [loading, setLoading] = useState(true);
  const newSession = useSessionStore((state) => state.newSession);
  useEffect(() => {
    const session = localStorage.getItem("user");
    if (session) {
      const parsedSession = JSON.parse(session);
      newSession(parsedSession);
    }
    setLoading(false);
  }, []);

  return loading ? (
    <Loader/>
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
