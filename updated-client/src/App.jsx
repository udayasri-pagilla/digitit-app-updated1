import React from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Header from "./components/Header";

export default function App() {

  const [userRaw, setUserRaw] = React.useState(() => {

    const raw = localStorage.getItem("user");

    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }

  });

  const [page, setPage] = React.useState(
    userRaw ? "dashboard" : "login"
  );

  function handleLogin({ user }) {

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setUserRaw(user);
    setPage("dashboard");

  }

  function handleLogout() {

    localStorage.removeItem("user");

    setUserRaw(null);
    setPage("login");

  }

  if (!userRaw) {

    return (

      <>
        {page === "login" && (
          <Login
            onSuccess={handleLogin}
            switchToSignup={() =>
              setPage("signup")
            }
          />
        )}

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

  return (

    <div className="app-shell">

      <Header onLogout={handleLogout} />

      <main
        style={{
          maxWidth: 1200,
          margin: "18px auto",
          padding: "0 16px"
        }}
      >

        <Dashboard user={userRaw} />

      </main>

    </div>

  );
}