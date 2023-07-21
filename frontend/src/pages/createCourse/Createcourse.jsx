import React from "react";
import CardcreateCourse from "../../components/cards/createCourse/CardcreateCourse";
import styles from "./Createcourse.module.css";

export default function Createcourse() {
  return (
    <div className={styles.containerCreatecourse}>
      <h1>Create A new Course</h1>
      <CardcreateCourse />
    </div>
  );
}
