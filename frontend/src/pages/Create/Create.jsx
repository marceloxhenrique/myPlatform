import React from "react";
import { Link } from "react-router-dom";
import { BiEdit, BiPlusCircle } from "react-icons/bi";
import styles from "./Create.module.css";

export default function Create() {
  return (
    <div className={styles.containerCreatecourse}>
      <section className={styles.adminContainer}>
        <Link className={styles.create} to="/createcourse">
          <BiPlusCircle className={styles.icon} />
          <div>Create a new course</div>
        </Link>
        <Link className={styles.update} to="/updatecourse">
          <BiEdit className={styles.icon} />
          <div>Update an course</div>
        </Link>
        <Link className={styles.createLesson} to="/createlesson">
          <BiPlusCircle className={styles.icon} />
          <div>Create a new lesson</div>
        </Link>
      </section>
    </div>
  );
}
