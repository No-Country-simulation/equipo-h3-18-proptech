import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  BuyerSharesPage,
  CheckIdentityPage,
  DashboardBuyerPage,
  HomePage,
  LayoutPage,
  LoginPage,
  PrivatePagesAuth,
  ProfilePage,
  RegisterPage,
  RoleAdminAuth,
  RoleBuyerAuth,
  SwitchFinanceFormPage,
  ValidateIdentityPage,
} from "./pages";

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

          <Route element={<PrivatePagesAuth />}>

            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/validate-identity"
              element={<ValidateIdentityPage />}
            />

            <Route path="/buyer" element={<RoleBuyerAuth />}>
              <Route path="" element={<DashboardBuyerPage />} />
              <Route path="shares" element={<BuyerSharesPage />} />
              <Route path="finance" element={<SwitchFinanceFormPage />} />
            </Route>

            <Route path="/investor">// Rutas del Inversor</Route>

            <Route path="/admin" element={<RoleAdminAuth />}>
              <Route path="" element={<CheckIdentityPage />} />
            </Route>
            
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
