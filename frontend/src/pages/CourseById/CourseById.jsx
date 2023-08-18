import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { api } from "../../services/api";
import LessonCard from "../../components/cards/lesson/LessonCard";
import styles from "./CourseById.module.css";

export default function CourseById() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const courseById = async () => {
      const res = await api.getLessons(id);
      setLessons(res);
    };

    const courseName = async () => {
      const res = await api.getCourseById(id);
      setCourse(res);
    };

    courseById();
    courseName();
  }, [id, setLessons, setCourse]);

  return (
    <main className={styles.courseByIdCard}>
      <section>
        <button
          onClick={() => {
            navigate(-1);
          }}
          type="button"
          className={styles.backButton}
        >
          <BiArrowBack />
        </button>
        <h1>{course.title}</h1>
        <aside>
          {/* {lessons && <LessonCard lessons={lessons} color={course.color} />} */}
          {lessons &&
            lessons.map((lesson) => (
              <div className={styles.lessons}>
                <LessonCard lesson={lesson} color={course.color} />
              </div>
            ))}
        </aside>
      </section>
    </main>
  );
}
