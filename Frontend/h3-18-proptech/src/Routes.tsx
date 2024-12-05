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
import DashboardAdminPage from "./pages/private/admin/DashboardAdminPage";
import {
  ApproveLoanPage,
  ApproveTablePage,
  InvestorState,
  InvestorStatePages,
  LoansStatePage,
  LoanState,
  ValidateTablePage,
  ValidateUserPage,
} from "./pages/private/admin/pages";

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
              <Route path="dashboard">
                <Route element={<DashboardAdminPage />}>
                  <Route path="validate" element={<ValidateTablePage />} />
                  <Route path="approve" element={<ApproveTablePage />} />
                  <Route path="loans" element={<LoansStatePage />} />
                  <Route path="investors" element={<InvestorStatePages />} />
                </Route>
                <Route path="validate/:id" element={<ValidateUserPage />} />
                <Route path="approve/:id" element={<ApproveLoanPage />} />
                <Route path="loans/:id" element={<LoanState />} />
                <Route path="investors/:id" element={<InvestorState />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
