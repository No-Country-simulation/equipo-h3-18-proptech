import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "./pages";
import LayoutPage from "./pages/LayoutPage";
import DashboardBuyerPage from "./pages/private/DashboardBuyerPage";
import BuyerShares from "./pages/private/BuyerShares";
import ValidateIdentityPage from "./pages/private/identity/ValidateIdentityPage";
import ProfilePage from "./pages/private/identity/ProfilePage";
import SwitchFinanceForm from "./pages/private/buyer/SwitchFinanceForm";
import PrivatePages from "./pages/private/PrivatePages";
import RoleBuyerAuth from "./pages/private/buyer/RoleBuyerAuth";

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
          <Route element={<PrivatePages />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/validate-identity"
              element={<ValidateIdentityPage />}
            />

            <Route element={<RoleBuyerAuth />}>
              <Route path="/buyer" element={<DashboardBuyerPage />} />
              <Route path="/shares" element={<BuyerShares />} />
              <Route path="/finance" element={<SwitchFinanceForm />} />
            </Route>

            <Route path="/role-investor">// Rutas del Inversor</Route>

            <Route path="/role-admin">// Rutas del Administrador</Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
