import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);

  // const handleHide = () => {
  //   setHidden(!hidden), setCloseMenu(!closeMenu);
  // };

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
            <Link
              onClick={() => {
                setHidden(!hidden);
                setCloseMenu(!closeMenu);
              }}
              to="/courses"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setHidden(!hidden);
                setCloseMenu(!closeMenu);
              }}
              to="/profile"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setHidden(!hidden);
                setCloseMenu(!closeMenu);
              }}
              to="projects"
            >
              Log out
            </Link>
          </li>
          {/* <li>
            <Link
              onClick={() => {
                setHidden(!hidden), setCloseMenu(!closeMenu);
              }}
              to="about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setHidden(!hidden), setCloseMenu(!closeMenu);
              }}
              to="contact"
            >
              Contact
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
