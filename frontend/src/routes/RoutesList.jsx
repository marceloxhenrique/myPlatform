import { useNavigate, useRoutes } from "react-router-dom";
import { useContext } from "react";
import { PropTypes } from "prop-types";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Course from "../pages/Course/Course";
import { AuthContext } from "../contexts/AuthContext";

export default function RoutesList() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function ProtectedRoute({ children }) {
    if (!currentUser) {
      return navigate("/");
    }
    return children;
  }

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const protectedRouteWrapper = (Component) => [
    <ProtectedRoute key={Component}>{Component}</ProtectedRoute>,
  ];

  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/profile", element: protectedRouteWrapper(<Profile />) },
    { path: "/course", element: protectedRouteWrapper(<Course />) },
  ]);
}
