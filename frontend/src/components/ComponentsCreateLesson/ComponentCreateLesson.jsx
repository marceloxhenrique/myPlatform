import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "./ComponentCreateLesson.module.css";
import { api } from "../../services/api";
import "react-toastify/dist/ReactToastify.css";

export default function CardcreateCourse() {
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
  return (
    <div>
      <form className={styles.createLessonCard} onSubmit={handleData}>
        <div className={styles.inputInfoName}>
          <h2>Lesson name:</h2>
          <input
            type="text"
            name="lesson_name"
            value={info.lesson_name}
            onChange={handleChanges}
          />
          {/* <p className={styles.required}>a</p> */}
        </div>
        <div className={styles.inputInfo}>
          <h2>Description</h2>
          <input
            type="text"
            name="description"
            value={info.description}
            onChange={handleChanges}
          />
          {/* <p className={styles.required}>a</p> */}
        </div>
        <div className={styles.video}>
          <h2>Video</h2>
          <input type="file" ref={inputRef} />
          {/* <p className={styles.required}>a</p> */}
        </div>
        <div className={styles.inputInfo}>
          <h2>Duration</h2>
          <input
            type="number"
            name="duration"
            value={info.duration}
            onChange={handleChanges}
          />
          {/* <p className={styles.required}>a</p> */}
        </div>
        <div className={styles.inputInfo}>
          <h2>Course id</h2>
          <input
            type="number"
            name="course_id"
            value={info.course_id}
            onChange={handleChanges}
          />
          {/* <p className={styles.required}>a</p> */}
        </div>
        <button className={styles.buttonRegister} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
