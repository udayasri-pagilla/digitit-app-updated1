// Previous implementation of Login component (kept for reference)
// import React, { useState } from "react";
// import { loginUser } from "../services/authService";
// ...

import React, { useState, useCallback } from "react";
import { loginUser } from "../services/authService";

// Login component
// Handles user authentication and login UI
// Props:
// onSuccess -> called when login is successful
// switchToSignup -> switches UI to signup page
export default function Login({ onSuccess, switchToSignup }) {

  // State to store email input
  const [email, setEmail] = useState("");

  // State to store password input
  const [password, setPassword] = useState("");

  // State to store error messages
  const [error, setError] = useState(null);

  // Loading state while login request is processing
  const [loading, setLoading] = useState(false);

  // Utility function to validate email format using regex
  const validateEmail = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  };

  // Handles login form submission
  const submit = useCallback(async (e) => {

    // Prevent page reload
    e.preventDefault();

    // Reset previous errors
    setError(null);

    /* Frontend validation */

    // Validate email format
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Ensure password length is at least 6 characters
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Show loading state while calling API
    setLoading(true);

    try {

      // Call authentication service to login user
      const data = await loginUser(email.trim(), password);

      // Notify parent component that login was successful
      onSuccess({ user: data.user });

    } catch (err) {

      // Display error if login fails
      setError(err.message || "Invalid email or password");

    } finally {

      // Stop loading state
      setLoading(false);

    }

  }, [email, password, onSuccess]);


  // Update email state when user types
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  // Update password state when user types
  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);


  return (

    // Main container for authentication page
    <div className="auth-center-page fade-in">

      {/* Application title */}
      <h1 className="auth-main-title">
        DigitIt Task Manager
      </h1>

      {/* Login card container */}
      <div className="auth-center-card panel">

        {/* Welcome heading */}
        <h2 className="auth-welcome">
          Welcome back
        </h2>

        {/* Subtitle message */}
        <p className="auth-subtitle">
          Sign in to access your dashboard.
        </p>

        {/* Login form */}
        <form onSubmit={submit} className="auth-form-grid">

          {/* Email input field */}
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          {/* Password input field */}
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          {/* Submit button with loading state */}
          <button type="submit" disabled={loading}>

            {loading ? "Signing in..." : "Sign in"}

          </button>

        </form>

        {/* Display error message if login fails */}
        {error && (
          <div className="error">{error}</div>
        )}

        {/* Footer section with signup option */}
        <div className="auth-footer">

          <span>
            Don’t have an account?
          </span>

          {/* Switch to signup page */}
          <button onClick={switchToSignup}>
            Create account
          </button>

        </div>

      </div>

    </div>

  );
}