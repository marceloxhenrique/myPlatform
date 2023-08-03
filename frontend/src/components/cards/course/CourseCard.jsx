import React from "react";
import { Link } from "react-router-dom";
import styles from "./CourseCard.module.css";

export default function cardCourse({ course }) {
  return (
    <div>
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
          <Link to={`/course/${course.id}`}>
            <div className={styles.buttonAllLessons}>
              <button type="button">See all lessons</button>
            </div>
          </Link>
        </section>
      </div>
    </div>
  );
}
