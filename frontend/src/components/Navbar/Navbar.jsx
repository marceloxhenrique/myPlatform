import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiHomeAlt, BiUser, BiEditAlt, BiLogOut } from "react-icons/bi";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../contexts/AuthContext";
import photo from "../../assets/profilePhoto.jpg";

export default function Navbar1() {
  const { currentUser, logout } = useContext(AuthContext);
  const [adminview, setAdminview] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
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
        <span
          className={styles.toggleMenuOpen}
          id={menuToggle ? styles.top : undefined}
        />
        <span
          className={styles.toggleMenuOpen}
          id={menuToggle ? styles.mid : undefined}
        />
        <span
          className={styles.toggleMenuOpen}
          id={menuToggle ? styles.bot : undefined}
        />
      </button>
      <div
        className={
          menuToggle ? styles.menuContainer : styles.menuContainerHiden
        }
      >
        <section className={styles.menu}>
          <div className={styles.userInfo}>
            <img src={photo} alt="Profile" />
            <p>
              {currentUser.firstname} {currentUser.lastname}
            </p>
          </div>
          <div className={styles.menuOptions}>
            <ul>
              <li>
                <NavLink to="/courses">
                  <BiHomeAlt className={styles.icon} />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <BiUser className={styles.icon} />
                  Profile
                </NavLink>
              </li>
              {adminview && (
                <li>
                  <NavLink to="/create">
                    <BiEditAlt className={styles.icon} />
                    Create
                  </NavLink>
                </li>
              )}
              {/* <li>
                <NavLink
                  onClick={() => {
                    logout();
                  }}
                  to="/logout"
                >
                  <BiLogOut className={styles.icon} />
                  Log out
                </NavLink>
              </li> */}
            </ul>
            <NavLink
              className={styles.logout}
              onClick={() => {
                logout();
              }}
              to="/logout"
            >
              <BiLogOut className={styles.icon} />
              Log out
            </NavLink>
            {/* <button className={styles.logoutButton} type="button">
              Log out
            </button> */}
          </div>
        </section>
      </div>
    </header>
  );
}
