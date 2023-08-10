import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import styles from "./Lessons.module.css";
import { api } from "../../services/api";

export default function Lesson() {
  const [lesson, setLesson] = useState();
  const [videoPath, setVideoPath] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getLessons = async () => {
      try {
        const resLesson = await api.getLessonById(id);
        setVideoPath(resLesson.video);
        setLesson(resLesson);
      } catch (error) {
        console.error(error);
      }
    };
    getLessons();
  }, []);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const filePath = `${BACKEND_URL}/assets/videos/${videoPath}`;

  return (
    <main className={styles.lessonContainer}>
      {lesson ? (
        <div className={styles.boxLesson}>
          <h1>{lesson.lesson_name}</h1>
          <div className={styles.playerContainer}>
            <ReactPlayer url={filePath} controls width={854} height={480} />
          </div>
          <p>{lesson.description}</p>
        </div>
      ) : (
        "Loading..."
      )}
    </main>
  );
}
