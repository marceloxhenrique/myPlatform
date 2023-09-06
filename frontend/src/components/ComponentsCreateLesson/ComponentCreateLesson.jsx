import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiChevronDown, BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import styles from "./ComponentCreateLesson.module.css";
import { api } from "../../services/api";
import "react-toastify/dist/ReactToastify.css";

export default function CardcreateCourse() {
  const navigate = useNavigate();
  const [coursesAvailable, setCoursesAvailable] = useState();
  const [dropDownMenu, setDropDowMenu] = useState(false);
  // const [courseName, setCourseName] = useState("");

  const [info, setInfo] = useState({
    lesson_name: "",
    duration: "",
    description: "",
    course_id: "",
    video: "",
  });
  // { resetForm }
  const handleChanges = (e) => {
    setInfo((prevInfo) => ({ ...prevInfo, [e.target.name]: e.target.value }));
    setDropDowMenu(false);
  };

  const inputRef = useRef();
  const handleData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("lesson_name", info.lesson_name);
    formData.append("duration", info.duration);
    formData.append("description", info.description);
    formData.append("course_id", info.course_id);
    formData.append("video", inputRef.current.files[0]);
    try {
      api.registerLesson(formData);
      toast.success("Your lesson was created", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
    }
    setInfo({
      lesson_name: "",
      description: "",
      duration: "",
      course_id: "",
      video: "",
    });
  };

  const getCourses = async () => {
    try {
      const resCoursesAvailables = await api.getAllCourses();
      setCoursesAvailable(resCoursesAvailables);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <main className={styles.createLessonCard}>
      <button
        onClick={() => {
          navigate(-1);
        }}
        type="button"
        className={styles.backButton}
      >
        <BiArrowBack />
      </button>
      <h1>Create lesson</h1>
      <section className={styles.courseListe}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Select a course..."
            defaultValue={info.course_id}
            onClick={() => {
              setDropDowMenu(!dropDownMenu);
            }}
          />
          <p>
            |<BiChevronDown />
          </p>
        </div>
        {dropDownMenu && (
          <div className={styles.coursesOptions}>
            <ul>
              {coursesAvailable.map((course) => (
                <li key={course.id}>
                  <button
                    type="button"
                    name="course_id"
                    value={course.id}
                    onClick={handleChanges}
                  >
                    {course.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <form onSubmit={handleData}>
        <h2>Lesson name:</h2>
        <input
          type="text"
          name="lesson_name"
          value={info.lesson_name}
          onChange={handleChanges}
        />
        <h2>Video</h2>
        <label htmlFor="uploadvideo" className={styles.videoField}>
          <input
            name="uploadvideo"
            id="uploadvideo"
            type="file"
            ref={inputRef}
          />
          <span>Select a file</span>
        </label>
        <h2>Duration</h2>
        <input
          type="number"
          name="duration"
          value={info.duration}
          onChange={handleChanges}
        />
        <h2>Description</h2>
        <textarea
          className={styles.descriptionField}
          type="text"
          name="description"
          value={info.description}
          onChange={handleChanges}
        />
        <button className={styles.buttonRegister} type="submit">
          Submit
        </button>
      </form>
    </main>
  );
}
