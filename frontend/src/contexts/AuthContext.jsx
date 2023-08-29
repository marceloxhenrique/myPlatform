import { useState, useEffect, createContext, useMemo } from "react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../services/api";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();
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

  const getCurrentUser = async () => {
    const res = await api.getCurrentUser();
    if (res) {
      setCurrentUser(res);
    } else {
      try {
        await api.refreshToken();
        const refreshUser = await api.getCurrentUser();
        setCurrentUser(refreshUser.data);
      } catch (error) {
        console.error();
        logout();
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const login = (_user) => {
    setCurrentUser(_user);
  };

  const isAuthenticated = () => {
    return currentUser !== null;
  };

  const memo = useMemo(() => {
    return {
      currentUser,
      getCurrentUser,
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
