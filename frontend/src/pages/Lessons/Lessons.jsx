import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Lessons.module.css";
import { api } from "../../services/api";

export default function Lesson() {
  const [lesson, setLesson] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getLessons = async () => {
      try {
        const resLesson = await api.getLessonById(id);

        setLesson(resLesson);
      } catch (error) {
        console.error(error);
      }
    };
    getLessons();
  }, []);

  return (
    <main className={styles.lessonContainer}>
      {lesson ? (
        <div className={styles.boxLesson}>
          <h1>{lesson.lesson_name}</h1>
          <div className={styles.playerContainer}>Video</div>
          <p>{lesson.text}</p>
        </div>
      ) : (
        "Loading..."
      )}
    </main>
  );
}
