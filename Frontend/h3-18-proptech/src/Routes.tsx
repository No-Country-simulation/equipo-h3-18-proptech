import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  BuyerSharesPage,
  DashboardBuyerPage,
  HomePage,
  LayoutPage,
  LoanRequestPage,
  LoginPage,
  NotFoundPage,
  PrivatePagesAuth,
  ProfilePage,
  RegisterPage,
  RoleAdminAuth,
  RoleBuyerAuth,
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
  LoanUserDataPage,
  ValidateTablePage,
  ValidateUserPage,
} from "./pages/private/admin/pages";
import { GuarantorForm, LoanForm } from "./pages/private/buyer/components";
import RoleInvestorAuth from "./pages/private/investor/RoleInvestorAuth";
import DashboardInvestorPage from "./pages/private/investor/DashboardInvestorPage";

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
              <Route path="shares/:id" element={<BuyerSharesPage />} />
              <Route path="loan-request" element={<LoanRequestPage />}>
                <Route path="" element={<LoanForm />} />
                <Route path="guarantor" element={<GuarantorForm />} />
              </Route>
            </Route>

            <Route path="/investor" element={<RoleInvestorAuth />}>
              <Route path="" element={<DashboardInvestorPage />} />
            </Route>

            <Route path="/admin" element={<RoleAdminAuth />}>
              <Route path="" element={<Navigate to={"validate"} />} />
              <Route element={<DashboardAdminPage />}>
                <Route path="validate" element={<ValidateTablePage />} />
                <Route path="approve" element={<ApproveTablePage />} />
                <Route path="loans" element={<LoansStatePage />} />
                <Route path="investors" element={<InvestorStatePages />} />
              </Route>
              <Route path="validate/:id" element={<ValidateUserPage />} />
              <Route path="approve/:id" element={<ApproveLoanPage />} />
              <Route path="loans/:id" element={<LoanState />} />
              <Route path="loans/:id/clientDetails" element={<LoanUserDataPage />} />
              <Route path="investors/:id" element={<InvestorState />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
