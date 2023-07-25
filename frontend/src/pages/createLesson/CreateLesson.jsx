import React from "react";
import ComponentCreateLesson from "../../components/ComponentsCreateLesson/ComponentCreateLesson";
import styles from "./CreateLesson.module.css";

export default function CreateLesson() {
  return (
    <div className={styles.containerCreatelesson}>
      <h1>Create a New lesson</h1>
      <ComponentCreateLesson />
    </div>
  );
}
