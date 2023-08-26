import { useState, useEffect, createContext, useMemo } from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../services/api";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    const res = await api.getCurrentUser();
    setCurrentUser(res);
    if (res === undefined) navigate("/");
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const login = (_user) => {
    setCurrentUser(_user);
  };
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const logout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/logout`, { withCredentials: true });
      setCurrentUser({});
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const memo = useMemo(() => {
    return {
      currentUser,
      login,
      logout,
    };
  }, [currentUser]);

  return <AuthContext.Provider value={memo}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
