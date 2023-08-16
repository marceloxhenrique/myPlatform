import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BiSolidCheckCircle } from "react-icons/bi";
import styles from "./LessonCard.module.css";

export default function LessonCard({ lessons, color }) {
  return (
    <main>
      {lessons &&
        lessons.map((lesson) => (
          <section key={lesson.id} className={styles.cardCountainer}>
            <div className={styles.topSide}>
              {true && <BiSolidCheckCircle className={styles.watchedCheck} />}
              <p>{lesson.lesson_name}</p>
            </div>
            <div className={styles.bottomSide}>
              <p>{lesson.description.slice(0, 50)}...</p>
              <Link to={`lesson/${lesson.id}`}>
                <button className={styles.watchLessonButton} type="button">
                  Watch
                </button>
              </Link>
              <span
                style={{ backgroundColor: `${color}` }}
                className={styles.bottomBar}
              />
            </div>
          </section>
        ))}
    </main>
  );
}
LessonCard.defaultProps = {
  color: "",
};

LessonCard.propTypes = {
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lesson_name: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      description: PropTypes.string,
      course_id: PropTypes.number.isRequired,
    })
  ).isRequired,

  color: PropTypes.string,
};
