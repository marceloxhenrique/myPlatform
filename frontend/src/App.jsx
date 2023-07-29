// import Home from "./pages/home/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import RoutesList from "./routes/RoutesList";
import "./App.css";

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

  return (
    <ThemeProvider theme={theme}>
      <RoutesList />
    </ThemeProvider>
  );
}

export default App;
