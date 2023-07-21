import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./LessonCard.module.css";

export default function LessonCard({ lessons }) {
  return (
    <div>
      {lessons &&
        lessons.map((lesson) => (
          <div key={lesson.id} className={styles.cardCountainer}>
            <section className={styles.leftSide}>Video</section>
            <section className={styles.rightSide}>
              <h2>{lesson.lesson_name}</h2>
              <Link to={`lesson/${lesson.id}`}>
                <div className={styles.buttonAllLessons}>
                  <button type="button">Watch</button>
                </div>
              </Link>
            </section>
          </div>
        ))}
    </div>
  );
}

LessonCard.propTypes = {
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lesson_name: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      complete: PropTypes.number,
      url: PropTypes.string.isRequired,
      text: PropTypes.string,
      course_id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
