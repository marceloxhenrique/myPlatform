import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import styles from "./Navbar1.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import photo from "../../assets/profilePhoto.jpg";

export default function Navbar1() {
  const { currentUser, logout } = useContext(AuthContext);
  const [adminview, setAdminview] = useState(false);
  const [menuToggle, setMenuToggle] = useState(true);
  useEffect(() => {
    if (currentUser.admin) setAdminview(true);
  }, [currentUser]);

  const handleToogle = () => {
    setMenuToggle(!menuToggle);
  };
  return (
    <header className={styles.navbar}>
      <h2>MyPlatform</h2>
      <button
        onClick={handleToogle}
        type="button"
        className={styles.toggleMenu}
      >
        <span>menu</span>
      </button>
      <div
        className={
          menuToggle ? styles.menuContainer : styles.menuContainerHiden
        }
      >
        <div className={styles.menu}>
          <img src={photo} alt="Profile" />
          <p>
            {currentUser.firstname} {currentUser.lastname}
          </p>
          <ul>
            <li>
              <NavLink to="/courses">Dashboard</NavLink>
            </li>
            <li>
              <BiHome className={styles.icon} />
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Reviews</NavLink>
            </li>
            {adminview && (
              <li>
                <NavLink to="/create">Create</NavLink>
              </li>
            )}
            <li>
              <NavLink
                onClick={() => {
                  logout();
                }}
                to="/logout"
              >
                Log out
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
