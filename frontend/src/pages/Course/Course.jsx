import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Course.module.css";
import { api } from "../../services/api";
import CourseCard from "../../components/cards/course/CourseCard";
import { AuthContext } from "../../contexts/AuthContext";

export default function Course() {
  const [coursesAvailable, setCoursesAvailable] = useState();
  const [adminArea, setAdminArea] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser.admin) {
      setAdminArea(true);
    } else {
      setAdminArea(false);
    }
    const getCourses = async () => {
      try {
        const resCoursesAvailables = await api.getAllCourses();

        setCoursesAvailable(resCoursesAvailables);
      } catch (error) {
        console.error(error);
      }
    };
    getCourses();
  }, []);

  return (
    <div className={styles.containerCourse}>
      {adminArea && (
        <section className={styles.adminContainer}>
          <Link to="/createcourse">
            <div className={styles.create}>Create a new course</div>
          </Link>
          <Link to="/updatecourse">
            <div className={styles.update}>Update an course</div>
          </Link>
        </section>
      )}
      <main>
        {coursesAvailable && <CourseCard coursesAvailable={coursesAvailable} />}
      </main>
    </div>
  );
}
