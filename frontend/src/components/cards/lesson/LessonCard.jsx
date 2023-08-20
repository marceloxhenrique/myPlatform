import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BiSolidCheckCircle } from "react-icons/bi";
import styles from "./LessonCard.module.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";

export default function LessonCard({ lesson, color }) {
  const { currentUser } = useContext(AuthContext);
  const [finishedlesson, setFinishedLesson] = useState([]);

  const getFinishedLessons = async () => {
    const res = await api.getFinishedLessons(currentUser.id);
    setFinishedLesson(res);
  };
  useEffect(() => {
    getFinishedLessons();
  }, []);

  return (
    <main className={styles.main}>
      {lesson && (
        <section key={lesson.id} className={styles.cardCountainer}>
          <div className={styles.topSide}>
            {finishedlesson.map((item) =>
              item.lesson_id === lesson.id ? (
                <BiSolidCheckCircle
                  key={item.lesson_id}
                  className={styles.watchedCheck}
                />
              ) : undefined
            )}
            <p>{lesson.lesson_name}</p>
          </div>
          <div className={styles.bottomSide}>
            <p>{lesson.description.slice(0, 45)}...</p>
            <span className={styles.watchLessonButton}>
              <Link to={`lesson/${lesson.id}`}>Watch</Link>
            </span>
            <span
              style={{ backgroundColor: `${color}` }}
              className={styles.bottomBar}
            />
          </div>
        </section>
      )}
    </main>
  );
}
LessonCard.defaultProps = {
  color: "",
};

LessonCard.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lesson_name: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string,
    course_id: PropTypes.number.isRequired,
  }).isRequired,

  color: PropTypes.string,
};
