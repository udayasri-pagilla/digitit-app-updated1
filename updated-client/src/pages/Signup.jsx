import React, { useState } from "react";
import { signupUser } from "../services/authService";

export default function Signup({ switchToLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [teacherId, setTeacherId] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {

    e.preventDefault();

    setMsg(null);
    setLoading(true);

    try {

      const payload = {
        email,
        password,
        role
      };

      if (role === "student") {

        if (teacherId)
          payload.teacherId = teacherId;

        else if (teacherEmail)
          payload.teacherEmail = teacherEmail;

      }

      await signupUser(payload);

      setMsg({
        type: "success",
        text: "Signup successful — please login"
      });

      setEmail("");
      setPassword("");
      setTeacherEmail("");
      setTeacherId("");

    } catch (err) {

      setMsg({
        type: "error",
        text: err.message || "Signup failed"
      });

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="auth-center-page fade-in">

      <div className="auth-card panel auth-card-stacked">

        <div className="auth-stacked-header-plain">

          <h2 className="auth-title">
            Create account
          </h2>

          <p className="muted auth-subnote">
            Choose a role and sign up.
          </p>

        </div>

        <form onSubmit={submit} className="signup-form">

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

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

          {role === "student" && (

            <>
              <input
                placeholder="Teacher ID"
                value={teacherId}
                onChange={(e) =>
                  setTeacherId(e.target.value)
                }
              />

              <input
                placeholder="Teacher email"
                value={teacherEmail}
                onChange={(e) =>
                  setTeacherEmail(e.target.value)
                }
              />
            </>

          )}

          <button type="submit" disabled={loading}>

            {loading ? "Signing up..." : "Signup"}

          </button>

          <button
            type="button"
            onClick={switchToLogin}
          >
            Back to login
          </button>

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