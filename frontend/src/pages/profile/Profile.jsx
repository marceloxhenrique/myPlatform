import { useContext } from "react";
import styles from "./Profile.module.css";
import { AuthContext } from "../../contexts/AuthContext";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className={styles.profileContainer}>
      <section className={styles.profilePicture}>
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/free-user-3313165-2764602.png"
          alt="Profile"
        />
      </section>
      <section className={styles.infoContainer}>
        <span>{`Name: ${currentUser.firstname}`}</span>
        <span>{`Last name: ${currentUser.lastname}`}</span>
        <span>{`Email: ${currentUser.email}`}</span>
      </section>
    </div>
  );
}
