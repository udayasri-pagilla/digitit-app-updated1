import React from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";

// Root application component
// Handles authentication state and page navigation
export default function App() {

  // State to store logged-in user from localStorage
  const [userRaw, setUserRaw] = React.useState(() => {

    // Get stored user from browser localStorage
    const raw = localStorage.getItem("user");

    try {
      // Parse user data if available
      return raw ? JSON.parse(raw) : null;
    } catch {
      // If parsing fails, remove corrupted data
      localStorage.removeItem("user");
      return null;
    }

  });

  // Page state to control which screen to show
  // (login, signup, or dashboard)
  const [page, setPage] = React.useState(
    userRaw ? "dashboard" : "login"
  );

  // Called when login is successful
  function handleLogin({ user }) {

    // Save user info to localStorage
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    // Update application state
    setUserRaw(user);
    setPage("dashboard");

  }

  // Handles user logout
  function handleLogout() {

    // Remove stored user session
    localStorage.removeItem("user");

    // Reset user state and redirect to login page
    setUserRaw(null);
    setPage("login");

  }

  // If no user is logged in, show authentication pages
  if (!userRaw) {

    return (

      <>
        {/* Render login page */}
        {page === "login" && (
          <Login
            onSuccess={handleLogin}
            switchToSignup={() =>
              setPage("signup")
            }
          />
        )}

        {/* Render signup page */}
        {page === "signup" && (
          <Signup
            switchToLogin={() =>
              setPage("login")
            }
          />
        )}
      </>

    );

  }

  // If user is logged in, show the main application
  return (

    <div className="app-shell">

      {/* Top navigation header */}
      <Header onLogout={handleLogout} />

      {/* Main content area */}
      <main
        style={{
          maxWidth: 1200,
          margin: "18px auto",
          padding: "0 16px"
        }}
      >

        {/* Dashboard page showing tasks */}
        <Dashboard user={userRaw} />

      </main>

    </div>

  );
}