import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage, LoginPage, RegisterPage } from './pages'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes