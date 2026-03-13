import React, { useState } from "react";
import { signupUser } from "../services/authService";

// Signup component
// Allows users to create an account as either a student or teacher
// Props:
// switchToLogin -> function to navigate back to login page
export default function Signup({ switchToLogin }) {

  // State to store form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Role selection (student or teacher)
  const [role, setRole] = useState("student");

  // Optional teacher identification fields (for students)
  const [teacherId, setTeacherId] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  // State for success or error message
  const [msg, setMsg] = useState(null);

  // Loading state during signup request
  const [loading, setLoading] = useState(false);

  // Handles form submission
  async function submit(e) {

    // Prevent default form reload
    e.preventDefault();

    // Reset previous messages
    setMsg(null);

    // Show loading state
    setLoading(true);

    try {

      // Create payload to send to backend
      const payload = {
        email,
        password,
        role
      };

      // If the user is a student, optionally attach teacher information
      if (role === "student") {

        // Prefer teacherId if provided
        if (teacherId)
          payload.teacherId = teacherId;

        // Otherwise allow teacherEmail
        else if (teacherEmail)
          payload.teacherEmail = teacherEmail;

      }

      // Call signup API service
      await signupUser(payload);

      // Show success message after successful signup
      setMsg({
        type: "success",
        text: "Signup successful — please login"
      });

      // Reset form fields
      setEmail("");
      setPassword("");
      setTeacherEmail("");
      setTeacherId("");

    } catch (err) {

      // Display error message if signup fails
      setMsg({
        type: "error",
        text: err.message || "Signup failed"
      });

    } finally {

      // Stop loading state
      setLoading(false);

    }

  }

  return (

    // Main container for signup page
    <div className="auth-center-page fade-in">

      {/* Card container for signup form */}
      <div className="auth-card panel auth-card-stacked">

        {/* Header section */}
        <div className="auth-stacked-header-plain">

          <h2 className="auth-title">
            Create account
          </h2>

          <p className="muted auth-subnote">
            Choose a role and sign up.
          </p>

        </div>

        {/* Signup form */}
        <form onSubmit={submit} className="signup-form">

          {/* Email input */}
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {/* Password input */}
          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* Role selection (Student or Teacher) */}
          <div>

            <label>

              <input
                type="radio"
                checked={role === "student"}
                onChange={() =>
                  setRole("student")
                }
              />

              Student

            </label>

            <label>

              <input
                type="radio"
                checked={role === "teacher"}
                onChange={() =>
                  setRole("teacher")
                }
              />

              Teacher

            </label>

          </div>

          {/* If student role is selected, show teacher linking fields */}
          {role === "student" && (

            <>
              {/* Teacher ID input */}
              <input
                placeholder="Teacher ID"
                value={teacherId}
                onChange={(e) =>
                  setTeacherId(e.target.value)
                }
              />

              {/* Teacher Email input */}
              <input
                placeholder="Teacher email"
                value={teacherEmail}
                onChange={(e) =>
                  setTeacherEmail(e.target.value)
                }
              />
            </>

          )}

          {/* Submit button */}
          <button type="submit" disabled={loading}>

            {loading ? "Signing up..." : "Signup"}

          </button>

          {/* Navigate back to login page */}
          <button
            type="button"
            onClick={switchToLogin}
          >
            Back to login
          </button>

          {/* Display success or error message */}
          {msg && (
            <div className={msg.type}>
              {msg.text}
            </div>
          )}

        </form>

      </div>

    </div>

  );
}