// import Home from "./pages/home/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import RoutesList from "./routes/RoutesList";
import "./App.css";
import { AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#2B4A3B",
      },
      secondary: {
        main: "#069668",
      },
    },
    spacing: 10,
    typography: {
      fontFamily: "Jost",
    },
  });
  const { currentUser } = useContext(AuthContext);
  const home = window.location.pathname === "/";
  return (
    <ThemeProvider theme={theme}>
      {!currentUser.id || home ? null : <Navbar />}
      <RoutesList />
    </ThemeProvider>
  );
}

export default App;
