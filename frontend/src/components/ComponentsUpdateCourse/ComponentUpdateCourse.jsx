import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiChevronDown, BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import styles from "./ComponentUpdateCourse.module.css";
import { api } from "../../services/api";
import "react-toastify/dist/ReactToastify.css";

export default function ComponentUpdateCourse() {
  const navigate = useNavigate();
  const [dropDownMenu, setDropDowMenu] = useState(false);
  const [coursesAvailable, setCoursesAvailable] = useState();
  const [courseData, setCourseData] = useState({
    id: "",
    title: "",
    description: "",
    color: "",
    initials: "",
  });

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
      setDropDowMenu(false);
    }
  };

  const handleCourseUpdate = async (id, data) => {
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

  const handleDeleteCourse = async (id) => {
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

  const getCourses = async () => {
    try {
      const resCoursesAvailables = await api.getAllCourses();
      setCoursesAvailable(resCoursesAvailables);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCourseSearch = (e) => {
    setDropDowMenu(true);
    if (e.target.value.length === 0) {
      getCourses();
    }
    const check = coursesAvailable.filter((course) =>
      course.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setCoursesAvailable(check);
  };

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <main className={styles.updateContainer}>
      <button
        onClick={() => {
          navigate(-1);
        }}
        type="button"
        className={styles.backButton}
      >
        <BiArrowBack />
      </button>
      <h1>Update Course</h1>
      <section className={styles.courseListe}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Select a course..."
            onClick={() => {
              setDropDowMenu(!dropDownMenu);
            }}
            onChange={handleCourseSearch}
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
                    onClick={() => {
                      handleUpdateData(course);
                    }}
                  >
                    {course.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
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
        <label htmlFor="description">Description</label>
        <textarea
          className={styles.descriptionField}
          onChange={handleChange}
          type="text"
          name="description"
          placeholder="Description"
          required
          value={courseData.description}
        />
        <button
          className={styles.submiButton}
          type="button"
          onClick={() => handleCourseUpdate(courseData.id, courseData)}
        >
          Submit
        </button>
        <button
          className={styles.deleteButton}
          type="button"
          onClick={() => handleDeleteCourse(courseData.id)}
        >
          Delete course
        </button>
      </section>
    </main>
  );
}
