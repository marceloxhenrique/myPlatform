import React from "react";
import styles from "./Update.module.css";
import ComponentUpdateCourse from "../../components/ComponentsUpdateCourse/ComponentUpdateCourse";

export default function Update() {
  return (
    <div className={styles.containerUpdate}>
      <h1>Update Course</h1>
      <ComponentUpdateCourse />
    </div>
  );
}
