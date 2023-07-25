import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../contexts/AuthContext";

export default function Navbar() {
  const activeLink = ({ isActive }) => {
    if (isActive)
      return {
        // webkitTextStroke: "2px #E8D162",
        color: "#064E3B",
      };
    return {};
  };
  const [hidden, setHidden] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);

  const { currentUser, logout } = useContext(AuthContext);
  // const handleHide = () => {
  //   setHidden(!hidden), setCloseMenu(!closeMenu);
  // };
  useEffect(() => {
    if (currentUser.admin) {
      setAdminMenu(true);
    } else {
      setAdminMenu(false);
    }
  }, [currentUser]);
  return (
    <header>
      <p>My Platform</p>
      <nav className={styles.rightSide}>
        <div
          className={styles.menuBurger}
          role="button"
          tabIndex={0}
          onClick={() => {
            setHidden(!hidden);
            setCloseMenu(!closeMenu);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setHidden(!hidden);
              setCloseMenu(!closeMenu);
            }
          }}
        >
          <span
            className={styles.icon1}
            id={closeMenu ? styles.close1 : undefined}
          />
          <span
            className={styles.icon2}
            id={closeMenu ? styles.close2 : undefined}
          />
          <span
            className={styles.icon3}
            id={closeMenu ? styles.close3 : undefined}
          />
        </div>
        <ul
          className={styles.ulContainer}
          id={hidden ? styles.hidden : undefined}
          role="menu"
        >
          <li>
            <NavLink
              style={activeLink}
              onClick={() => {
                setHidden(!hidden);
                setCloseMenu(!closeMenu);
              }}
              to="/courses"
            >
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink
              style={activeLink}
              onClick={() => {
                setHidden(!hidden);
                setCloseMenu(!closeMenu);
              }}
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
          {adminMenu && (
            <li>
              <NavLink
                style={activeLink}
                onClick={() => {
                  setHidden(!hidden);
                  setCloseMenu(!closeMenu);
                }}
                to="/create"
              >
                Create
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              style={activeLink}
              onClick={() => {
                logout();
              }}
              to="/"
            >
              Log out
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
