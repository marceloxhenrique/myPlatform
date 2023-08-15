import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
import styles from "./ComponentCreateCourse.module.css";
import { api } from "../../services/api";
import "react-toastify/dist/ReactToastify.css";

export default function CardcreateCourse() {
  const navigate = useNavigate();
  const handleData = async (values, { resetForm }) => {
    try {
      if (values) api.registerCourse(values);
      resetForm();
      toast.success("Your course was created", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          description: "",
          color: "",
          initials: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Name is required";
          } else if (!values.description) {
            errors.description = "Description is required";
          } else if (!values.color) {
            errors.color = "Color is required";
          } else if (!values.initials) {
            errors.initials = "Initials is required";
          }
          return errors;
        }}
        onSubmit={handleData}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className={styles.createCourseCard} onSubmit={handleSubmit}>
            <section>
              <button
                onClick={() => {
                  navigate(-1);
                }}
                type="button"
                className={styles.backButton}
              >
                <BiArrowBack />
              </button>
              <h2>Name</h2>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <p className={styles.required}>
                {errors.title && touched.title && errors.title}
              </p>

              <h2>Color</h2>
              <input
                type="text"
                name="color"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.color}
              />
              <p className={styles.required}>
                {errors.color && touched.color && errors.color}
              </p>
              <h2>Initials</h2>
              <input
                type="text"
                name="initials"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.initials}
              />
              <p className={styles.required}>
                {errors.initials && touched.initials && errors.initials}
              </p>
              <h2>Description</h2>
              <textarea
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={styles.descriptionField}
              />
              <p className={styles.required}>
                {errors.description &&
                  touched.description &&
                  errors.description}
              </p>
              <button
                className={styles.buttonRegister}
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </section>
          </form>
        )}
      </Formik>
    </div>
  );
}
