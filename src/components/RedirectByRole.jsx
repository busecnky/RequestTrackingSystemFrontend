import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { getRedirectPathByRole } from "./getRedirectPathByRole";

const RedirectByRole = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const path = getRedirectPathByRole(token);
    navigate(path, { replace: true });
  }, [token, navigate]);

  return null;
};

export default RedirectByRole;
