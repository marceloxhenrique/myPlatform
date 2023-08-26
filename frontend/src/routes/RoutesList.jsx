import { useNavigate, useRoutes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PropTypes } from "prop-types";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Course from "../pages/Course/Course";
import Lessons from "../pages/Lessons/Lessons";
import CourseById from "../pages/CourseById/CourseById";
import { AuthContext } from "../contexts/AuthContext";
import Create from "../pages/Create/Create";
import Update from "../pages/updateCourse/Update";
import CreateLesson from "../pages/createLesson/CreateLesson";
import CreateCourse from "../pages/createCourse/Createcourse";
import Pagenotfound from "../pages/PageNotFound/Pagenotfound";
import Navbar from "../components/Navbar/Navbar";
import styles from "../components/Navbar/Navbar.module.css";

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
    <ProtectedRoute key={Component}>
      <div className={styles.box}>
        <Navbar />
        {Component}
      </div>
    </ProtectedRoute>,
  ];

  function ProtectedRouteAdmin({ children }) {
    useEffect(() => {
      if (currentUser && !currentUser.admin) {
        navigate("/courses");
      }
    }, [currentUser]); // Call navigate() inside useEffect
    return children;
  }
  const protectedRouteWrapperAdmin = (Component) => [
    <ProtectedRouteAdmin key={Component}>
      <div className={styles.box}>
        <Navbar />
        {Component}
      </div>
    </ProtectedRouteAdmin>,
  ];

  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile",
      element: protectedRouteWrapper(<Profile />),
    },
    { path: "/courses", element: protectedRouteWrapper(<Course />) },
    { path: "/course/:id", element: protectedRouteWrapper(<CourseById />) },
    {
      path: "/course/:id/lesson/:id",
      element: protectedRouteWrapper(<Lessons />),
    },
    {
      path: "/create",
      element: protectedRouteWrapperAdmin(<Create />),
    },
    {
      path: "/createcourse",
      element: protectedRouteWrapperAdmin(<CreateCourse />),
    },
    {
      path: "/createlesson",
      element: protectedRouteWrapperAdmin(<CreateLesson />),
    },
    {
      path: "/updatecourse",
      element: protectedRouteWrapperAdmin(<Update />),
    },
    { path: "*", element: <Pagenotfound /> },
  ]);
}
