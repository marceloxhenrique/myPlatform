import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiBookOpen, BiUser, BiEditAlt, BiLogOut } from "react-icons/bi";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar1() {
  const { currentUser, logout, getCurrentUser } = useContext(AuthContext);
  const [adminview, setAdminview] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  useEffect(() => {
    if (currentUser && currentUser.admin) {
      setAdminview(true);
    }
  }, []);

  const handleToogle = () => {
    setMenuToggle(!menuToggle);
  };
  if (currentUser === undefined) {
    getCurrentUser();
    return null;
  }
  return (
    <header className={styles.navbar}>
      <div className={styles.title1}>
        <h2>MyPlatform</h2>
      </div>
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
          <div className={styles.title2}>
            <h2>MyPlatform</h2>
          </div>
          <div className={styles.menuOptions}>
            <ul>
              <li>
                <NavLink to="/courses">
                  <BiBookOpen className={styles.icon} />
                  Courses
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
          </div>
        </section>
      </div>
    </header>
  );
}
