import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ContextProvider>
      <ProfileProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ProfileProvider>
    </ContextProvider>
  </BrowserRouter>
);
