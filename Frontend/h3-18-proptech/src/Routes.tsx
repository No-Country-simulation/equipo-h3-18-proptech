import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "./pages";
import LayoutPage from "./pages/LayoutPage";
import DashboardBuyerPage from "./pages/private/DashboardBuyerPage";
import BuyerShares from "./pages/private/BuyerShares";

function AppRoutes() {
  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/buyer" element={<DashboardBuyerPage />} />
          <Route path="/shares" element={<BuyerShares />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
