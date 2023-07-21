import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleUserDataInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const { login } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      axios
        .post(`${BACKEND_URL}/login`, userData, { withCredentials: true })
        .then(({ data: user }) => {
          login(user);
          navigate("/courses");
        })
        .catch((error) => {
          console.error(error);
          navigate("/");
        });
    } else {
      console.error("Unvalid format");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            color: "secondary",
            outlined: "secondary",
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ width: "100%", textAlign: "center" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleUserDataInput}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleUserDataInput}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSignIn}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#064E3B",
                ":hover": { backgroundColor: "#064E3B" },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
