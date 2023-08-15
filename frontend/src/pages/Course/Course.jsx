import React, { useEffect, useState } from "react";

import styles from "./Course.module.css";
import { api } from "../../services/api";
import CourseCard from "../../components/cards/course/CourseCard";

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
