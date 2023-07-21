import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import LessonCard from "../../components/cards/lesson/LessonCard";
import styles from "./CourseById.module.css";

export default function CourseById() {
  // const navigate = useNavigate();
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
    <div className={styles.courseByIdCard}>
      <h1>{course.title}</h1>
      {lessons && <LessonCard lessons={lessons} />}
    </div>
  );
}
