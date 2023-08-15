import React from "react";
import ComponentCreateCourse from "../../components/ComponentsCreateCourse/ComponentCreateCourse";
import styles from "./Createcourse.module.css";

export default function CreateCourse() {
  return (
    <div className={styles.containerCreatecourse}>
      {/* <h1>New Course</h1> */}
      <ComponentCreateCourse />
    </div>
  );
}
