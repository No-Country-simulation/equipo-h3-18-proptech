import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "./pages";
import LoanSimulatorPage from "./pages/simulators/LoanSimulatorPage";
import LayoutPage from "./pages/LayoutPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/simular-prestamo" element={<LoanSimulatorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
