import React, { useEffect, useState, useContext } from "react";

import styles from "./Course.module.css";
import { api } from "../../services/api";
import CourseCard from "../../components/cards/course/CourseCard";
import { AuthContext } from "../../contexts/AuthContext";

export default function Course() {
  const [coursesAvailable, setCoursesAvailable] = useState();
  const { getCurrentUser } = useContext(AuthContext);
  const getCourses = async () => {
    try {
      const resCoursesAvailables = await api.getAllCourses();
      if (resCoursesAvailables === undefined) {
        getCurrentUser();
      }
      setCoursesAvailable(resCoursesAvailables);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <main className={styles.containerCourse}>
      <section>
        <h1>Courses</h1>
        <aside>
          {coursesAvailable &&
            coursesAvailable.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </aside>
      </section>
    </main>
  );
}
