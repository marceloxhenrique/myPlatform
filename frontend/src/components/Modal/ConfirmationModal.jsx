import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import proptypes from "prop-types";
import styles from "./ConfirmationModal.module.css";
import { api } from "../../services/api";

export default function ConfirmationModal({ courseId, onClose, courseName }) {
  const handleDeleteCourse = async () => {
    try {
      await api.deleteCourse(courseId);
      toast.success("Your course was successfully delete", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course", {
        position: "bottom-right",
      });
    }
    onClose();
  };
  return (
    <div className={styles.dialogBox}>
      <section>
        <p>Are you sure you want to delete this {courseName}?</p>
        <div className={styles.button}>
          <button
            onClick={() => {
              onClose();
            }}
            type="button"
          >
            Cancel
          </button>
          <button onClick={handleDeleteCourse} type="button">
            Delete
          </button>
        </div>
      </section>
    </div>
  );
}

ConfirmationModal.propTypes = {
  onClose: proptypes.func.isRequired,
  courseId: proptypes.number.isRequired,
  courseName: proptypes.string.isRequired,
};
