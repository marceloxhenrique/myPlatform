import { useState, useEffect, createContext, useMemo } from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser.id) navigate("/");
  }, [currentUser.id, navigate]);

  const login = (_user) => {
    setCurrentUser(_user);
    localStorage.setItem("user", JSON.stringify(_user));
  };
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const logout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/logout`, { withCredentials: true });
      setCurrentUser({});
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const isAuthenticated = () => {
    return currentUser !== null;
  };

  const memo = useMemo(() => {
    return {
      currentUser,
      login,
      logout,
      isAuthenticated,
    };
  }, [currentUser]);

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
