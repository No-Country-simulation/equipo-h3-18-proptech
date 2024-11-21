import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "./pages";
import LoanSimulatorPage from "./pages/simulators/LoanSimulatorPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/simular-prestamo" element={<LoanSimulatorPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
