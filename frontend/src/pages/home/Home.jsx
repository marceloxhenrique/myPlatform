import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, React } from "react";
import SignIn from "../../components/Signin";
import SignUp from "../../components/Signup";
import styles from "./Home.module.css";
// import { Box } from "@mui/material";

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
    setShowSignIn(true);
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
              }}
            >
              <Button
                onClick={goBackFromSignIn}
                variant="contained"
                sx={{ m: 3, backgroundColor: "green" }}
              >
                X
              </Button>
            </Box>
            <SignIn />
          </div>
        )}
        {/* it will show the Sign Up modal if the button Sign Up is clicked */}
        {showSignUp && (
          <div>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
              }}
            >
              <Button
                onClick={goBackFromSignUp}
                variant="contained"
                sx={{ m: 3, backgroundColor: "green" }}
              >
                X
              </Button>
            </Box>
            <SignUp />
          </div>
        )}
      </section>
    </main>
  );
}
