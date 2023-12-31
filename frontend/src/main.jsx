import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./contexts/AuthContext";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ToastContainer />
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
