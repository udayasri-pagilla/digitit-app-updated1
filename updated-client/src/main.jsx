import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './style.css';

// Entry point of the React application
// This file mounts the main App component to the DOM

// Create the root container using React 18's createRoot API
ReactDOM.createRoot(document.getElementById("root")).render(

  // React.StrictMode helps detect potential problems in development
  // It does not affect production behavior
  <React.StrictMode>

    {/* Main application component */}
    <App />

  </React.StrictMode>

);