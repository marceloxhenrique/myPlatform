import React from "react";
import { Link } from "react-router-dom";
// import CardcreateCourse from "../../components/cards/createCourse/CardcreateCourse";
import styles from "./Create.module.css";

export default function Create() {
  return (
    <div className={styles.containerCreatecourse}>
      {/* <h1>Create </h1> */}
      {/* <CardcreateCourse /> */}
      <section className={styles.adminContainer}>
        <Link className={styles.create} to="/createcourse">
          <div>Create a new course</div>
        </Link>
        <Link className={styles.update} to="/updatecourse">
          <div>Update an course</div>
        </Link>
        <Link className={styles.createLesson} to="/createlesson">
          <div>Create a new lesson</div>
        </Link>
      </section>
    </div>
  );
}
