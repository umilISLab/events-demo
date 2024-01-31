import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthGuard({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  return children;
}

export default AuthGuard;
