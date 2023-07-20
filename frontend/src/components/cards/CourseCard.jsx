import React from "react";
import styles from "./CourseCard.module.css";

export default function cardCourse({ coursesAvailable }) {
  // console.log(coursesAvailable)
  return (
    <div>
      {coursesAvailable &&
        coursesAvailable.map((course) => (
          <div key={course.id} className={styles.cardCountainer}>
            <section
              style={{ backgroundColor: `${course.color}` }}
              className={styles.leftSide}
            >
              <p className={styles.initials}>{course.initials}</p>
            </section>
            <section className={styles.rightSide}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className={styles.buttonAllLessons}>
                <button type="button">See all lessons</button>
              </div>
            </section>
          </div>
        ))}
    </div>
  );
}
