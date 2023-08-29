import { useContext, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import styles from "./Profile.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const { currentUser, getCurrentUser } = useContext(AuthContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filePath, setFilePath] = useState();
  const [userInfo, setUserInfo] = useState();
  const [file, setFile] = useState(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const getInfo = async () => {
    try {
      const res = await api.getUserInfo(currentUser.id);
      setUserInfo(res);
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      setFilePath(`${BACKEND_URL}/assets/images/${res.profilePicture}`);
    } catch (error) {
      getCurrentUser();
    }
  };

  const inputRef = useRef();
  const uploadProfilePicture = async () => {
    setShowEditModal(false);
    setFile(!file);
    const formData = new FormData();
    formData.append("profilePicture", inputRef.current.files[0]);
    try {
      await api.updateProfilePicture(userInfo.id, formData);
      toast.success("Your photo is updated", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
    }
    getInfo();
  };

  const handleUpdateProfile = async () => {
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

  const removeProfilePicture = () => {
    setShowEditModal(false);
  };

  const boxRef = useRef();
  window.onclick = (event) => {
    if (event.target === boxRef.current) {
      setShowEditModal(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.id) {
      getInfo();
    }
  }, []);
  return (
    <main className={styles.profileContainer}>
      <section className={styles.profileBox}>
        <h1>Profile</h1>
        <div className={styles.topSide} ref={boxRef}>
          <div className={styles.profilePicture}>
            <img src={filePath} alt="Profile avatar" />
            <button
              className={styles.editPhoto}
              type="button"
              onClick={handleEdit}
            >
              Edit photo
            </button>
            {showEditModal && (
              <ul>
                <li>
                  <form encType="multipart/form-data">
                    <input
                      id="actual-btn"
                      className={styles.uploadInput}
                      ref={inputRef}
                      type="file"
                      onChange={uploadProfilePicture}
                    />
                    <label className={styles.labelUpload} htmlFor="actual-btn">
                      Upload a photo
                    </label>
                  </form>
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
                <button type="button" onClick={handleUpdateProfile}>
                  Update profile
                </button>
              </>
            )}
          </aside>
        </div>
        <hr />
        <div className={styles.bottomSide}>
          <h1>Another information</h1>
        </div>
      </section>
    </main>
  );
}
