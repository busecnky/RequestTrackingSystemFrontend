import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {getRedirectPathByRole} from "../components/getRedirectPathByRole";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

const login = (newToken) => {
  setToken(newToken);
  const redirectPath = getRedirectPathByRole(newToken);
  navigate(redirectPath);
};

  const logout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);