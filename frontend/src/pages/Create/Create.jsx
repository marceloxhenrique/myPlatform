import React from "react";
import { Link } from "react-router-dom";
// import CardcreateCourse from "../../components/cards/createCourse/CardcreateCourse";
import styles from "./Create.module.css";

export default function Create() {
  return (
    <div className={styles.containerCreatecourse}>
      <h1>Create </h1>
      {/* <CardcreateCourse /> */}
      <section className={styles.adminContainer}>
        <Link to="/createcourse">
          <div className={styles.create}>Create a new course</div>
        </Link>
        <Link to="/updatecourse">
          <div className={styles.update}>Update an course</div>
        </Link>
        <Link to="/createlesson">
          <div className={styles.create}>Create a new lesson</div>
        </Link>
      </section>
    </div>
  );
}
