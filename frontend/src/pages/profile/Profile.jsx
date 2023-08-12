import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import styles from "./Profile.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const boxRef = useRef();
  useEffect(() => {
    const getInfo = async () => {
      const res = await api.getUserInfo(currentUser.id);
      setUserInfo(res);
    };
    getInfo();
  }, [currentUser]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      await api.editUser(userInfo.id, userInfo);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Your information could not be changed");
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const uploadProfilePicture = () => {
    // setShowEditModal(false);
  };

  const removeProfilePicture = () => {
    // setShowEditModal(false);
  };
  window.onclick = (event) => {
    if (event.target !== boxRef.current) {
      setShowEditModal(false);
    }
  };
  return (
    <main className={styles.profileContainer}>
      <section className={styles.profileBox}>
        <div className={styles.topSide}>
          <div className={styles.profilePicture}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-user-3313165-2764602.png"
              alt="Profile"
            />
            <button ref={boxRef} type="button" onClick={handleEdit}>
              Edit photo
            </button>
            {showEditModal && (
              <ul>
                <li>
                  <button onClick={uploadProfilePicture} type="button">
                    Upload a photo
                  </button>
                </li>
                <li>
                  <button onClick={removeProfilePicture} type="button">
                    Remove photo
                  </button>
                </li>
              </ul>
            )}
          </div>
          <aside className={styles.infoContainer}>
            {userInfo && (
              <>
                <p>Name</p>
                <input
                  type="text"
                  name="firstname"
                  value={userInfo.firstname}
                  onChange={handleChange}
                />
                <p>Last name</p>
                <input
                  type="text"
                  name="lastname"
                  value={userInfo.lastname}
                  onChange={handleChange}
                />
                <p>Email</p>
                <input
                  type="text"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                />
                <button type="button" onClick={handleSubmit}>
                  Update profile
                </button>
              </>
            )}
          </aside>
        </div>
        <div className={styles.bottomSide}>
          <h1>Another information</h1>
        </div>
      </section>
    </main>
  );
}
