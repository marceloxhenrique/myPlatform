import React, { useEffect, useState, useContext } from "react";
import { BiSolidCheckCircle, BiChevronLeft } from "react-icons/bi";
import { useParams, NavLink } from "react-router-dom";
import ReactPlayer from "react-player";
import styles from "./Lessons.module.css";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Lesson() {
  const { currentUser } = useContext(AuthContext);
  const [finishedlesson, setFinishedLesson] = useState([]);
  const [modalLessons, setModalLessons] = useState(false);
  const [allLesson, setAllLesson] = useState();
  const [lesson, setLesson] = useState();
  const [videoPath, setVideoPath] = useState();
  const { id } = useParams();

  const getAllLessons = async (data) => {
    const res = await api.getLessons(data);
    setAllLesson(res);
  };

  const getLesson = async () => {
    try {
      const resLesson = await api.getLessonById(id);
      setVideoPath(resLesson.video);
      setLesson(resLesson);
      getAllLessons(resLesson.course_id);
    } catch (error) {
      console.error(error);
    }
  };

  const getFinishedLessons = async () => {
    const res = await api.getFinishedLessons(currentUser.id);
    setFinishedLesson(res);
  };

  useEffect(() => {
    getFinishedLessons();
    getLesson();
  }, []);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const filePath = `${BACKEND_URL}/assets/videos/${videoPath}`;
  return (
    <main className={styles.lessonContainer}>
      {lesson ? (
        <section>
          <aside>
            <h1>
              {lesson.lesson_name}
              <button
                className={styles.openModal}
                onClick={() => {
                  setModalLessons(!modalLessons);
                }}
                type="button"
              >
                See Lessons
              </button>
            </h1>
            <div className={styles.playerContainer}>
              <ReactPlayer url={filePath} controls width="100%" height="100%" />
            </div>
            <p>{lesson.description}</p>
          </aside>
          {modalLessons && (
            <div className={styles.lessonsList} id={styles.nav}>
              <button
                className={styles.closeModal}
                onClick={() => {
                  setModalLessons(!modalLessons);
                }}
                type="button"
              >
                <BiChevronLeft className={styles.backIcon} />
                Close
              </button>
              {allLesson.map((item, index) => (
                <NavLink
                  key={item.id}
                  className={styles.lessonlistButtons}
                  to={`/course/${lesson.course_id}/lesson/${item.id}`}
                  style={({ isActive }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      backgroundColor: isActive ? " #00000088" : "",
                    };
                  }}
                >
                  {/* //**checking if the Lesson have already been watched or not */}
                  {finishedlesson.map((finished) =>
                    finished.lesson_id === item.id ? (
                      <BiSolidCheckCircle
                        key={finished.lesson_id}
                        className={styles.watchedCheck}
                      />
                    ) : (
                      <BiSolidCheckCircle
                        key={finished.lesson_id}
                        className={styles.watchedNotCheck}
                      />
                    )
                  )}
                  #{index + 1}: {item.lesson_name}
                </NavLink>
              ))}
            </div>
          )}
        </section>
      ) : (
        "Loading..."
      )}
    </main>
  );
}
