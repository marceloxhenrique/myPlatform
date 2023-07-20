import React, { useEffect, useState } from "react";
import styles from "./Course.module.css";
import { api } from "../../services/api";
import CardCourse from "../../components/cards/CourseCard";

export default function Course() {
  const [coursesAvailable, setCoursesAvailable] = useState();

  useEffect(() => {
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
    <main className={styles.containerCourse}>
      {/* {console.log(coursesAvailable)} */}
      {coursesAvailable && <CardCourse coursesAvailable={coursesAvailable} />}
    </main>
  );
}
