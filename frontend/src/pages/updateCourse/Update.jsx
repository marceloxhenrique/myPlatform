import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Update.module.css";
import { api } from "../../services/api";
import "react-toastify/dist/ReactToastify.css";

export default function Update() {
  const [courseData, setCourseData] = useState({
    id: "",
    title: "",
    description: "",
    color: "",
    initials: "",
  });
  const [coursesAvailable, setCoursesAvailable] = useState();

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleUpdateData = (course) => {
    if (course) {
      setCourseData({
        id: course.id,
        title: course.title,
        description: course.description,
        color: course.color,
        initials: course.initials,
      });
    }
  };

  useEffect(() => {
    const getCourses = async () => {
      try {
        const resCoursesAvailables = await api.getAllCourses();

        setCoursesAvailable(resCoursesAvailables);
      } catch (error) {
        console.error(error);
      }
    };
    getCourses();
  }, []);

  const handleDataUpdate = async (id, data) => {
    try {
      await api.updateCourse(id, data);
      toast.success("Your course was successfully updated", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the course", {
        position: "bottom-right",
      });
    }
  };

  const handleDelete = async (id) => {
    // console.log(id);
    try {
      await api.deleteCourse(id);
      toast.success("Your course was successfully delete", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course", {
        position: "bottom-right",
      });
    }
  };
  return (
    <div className={styles.containerUpdate}>
      <div className={styles}>
        <div className={styles.title}> Chose a course to update</div>
        {coursesAvailable && (
          <div className={styles.courseListe}>
            <span>
              {coursesAvailable.map((course) => (
                <button
                  type="button"
                  key={course.id}
                  onClick={() => handleUpdateData(course)}
                >
                  {course.title}
                </button>
              ))}
            </span>
          </div>
        )}
      </div>
      <section className={styles.updateBox}>
        <label htmlFor="title">Course Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Course Title"
          required
          value={courseData.title}
        />
        <label htmlFor="description">Description</label>
        <input
          onChange={handleChange}
          type="text"
          name="description"
          placeholder="Description"
          required
          value={courseData.description}
        />
        <label htmlFor="color">Color</label>
        <input
          onChange={handleChange}
          type="text"
          name="color"
          placeholder="Color"
          required
          value={courseData.color}
        />
        <label htmlFor="initials">Initials</label>
        <input
          onChange={handleChange}
          type="text"
          name="initials"
          placeholder="initials"
          required
          value={courseData.initials}
        />
        <label htmlFor="id">id</label>
        <input
          onChange={handleChange}
          type="text"
          name="id"
          placeholder="id"
          required
          value={courseData.id}
        />
        <button
          className={styles.submiButton}
          type="button"
          onClick={() => handleDataUpdate(courseData.id, courseData)}
        >
          Submit
        </button>
        <button
          className={styles.deleteButton}
          type="button"
          onClick={() => handleDelete(courseData.id)}
        >
          Delete course
        </button>
      </section>
    </div>
  );
}
