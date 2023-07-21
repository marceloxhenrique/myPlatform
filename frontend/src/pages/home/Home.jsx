import { useState, React } from "react";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import SignIn from "../../components/Signin";
import SignUp from "../../components/Signup";
import styles from "./Home.module.css";

export default function Home() {
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const goBackFromSignUp = () => {
    setShowFirstPage(true);
    setShowSignUp(false);
  };
  const goBackFromSignIn = () => {
    setShowFirstPage(true);
    setShowSignIn(false);
  };

  const handleSignInCLick = () => {
    setShowFirstPage(false);
    setShowSignIn(true);
  };
  const handleSignUpCLick = () => {
    setShowFirstPage(false);
    setShowSignUp(true);
  };

  return (
    <main className={styles.homeContainer}>
      <section className={styles.leftSide}>z</section>
      <section className={styles.rightSide}>
        {showFirstPage && (
          <div className={styles.showFirstPage}>
            <h1>MyPlatform</h1>
            <button
              className={styles.firstPagebutton}
              type="button"
              onClick={handleSignInCLick}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleSignUpCLick}
              className={styles.buttonGoToSignUp}
            >
              Doens't have an account? <br /> SignUp
            </button>
          </div>
        )}
        {/* it will show the Sign In modal if the button Sign In is clicked */}
        {showSignIn && (
          <div>
            <SignIn />
            <Grid container justifyContent="flex-end">
              <Grid item sx={{ m: 3, textAlign: "center", width: "100%" }}>
                <Link to="/" variant="body2" onClick={goBackFromSignIn}>
                  Doens't have an account? <br /> SignUp
                </Link>
              </Grid>
            </Grid>
          </div>
        )}
        {/* it will show the Sign Up modal if the button Sign Up is clicked */}
        {showSignUp && (
          <div>
            <SignUp />
            <Grid container justifyContent="flex-end">
              <Grid item sx={{ m: 3, textAlign: "center", width: "100%" }}>
                <Link to="/" variant="body2" onClick={goBackFromSignUp}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </div>
        )}
      </section>
    </main>
  );
}
