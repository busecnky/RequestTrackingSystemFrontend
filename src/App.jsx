import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login-page/LoginPage"
import RegisterPage from "./pages/register-page/RegisterPage"
import { AuthProvider } from './context/AuthProvider';
import AdminHomePage from "./pages/admin-home-page/AdminHomePage"
import UserHomePage from "./pages/user-home-page/UserHomePage"
import ProtectedRoute from './routes/ProtectedRoute';
import RedirectByRole from './components/redirect/RedirectByRole';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/user" element={<UserHomePage />} />
          </Route>
          <Route path="*" element={<RedirectByRole />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App
