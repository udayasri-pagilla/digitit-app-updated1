// import React, { useState } from "react";
// import { loginUser } from "../services/authService";

// export default function Login({ onSuccess, switchToSignup }) {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function submit(e) {

//     e.preventDefault();

//     setError(null);
//     setLoading(true);

//     try {

//       const data = await loginUser(email, password);

//       onSuccess({ user: data.user });

//     } catch (err) {

//       setError(err.message || "Login failed");

//     } finally {

//       setLoading(false);

//     }

//   }

//   return (

//     <div className="auth-center-page fade-in">

//       <h1 className="auth-main-title">
//         DigitIt Task Manager
//       </h1>

//       <div className="auth-center-card panel">

//         <h2 className="auth-welcome">
//           Welcome back
//         </h2>

//         <p className="auth-subtitle">
//           Sign in to access your dashboard.
//         </p>

//         <form onSubmit={submit} className="auth-form-grid">

//           <label>Email</label>

//           <input
//             type="email"
//             value={email}
//             onChange={(e) =>
//               setEmail(e.target.value)
//             }
//             required
//           />

//           <label>Password</label>

//           <input
//             type="password"
//             value={password}
//             onChange={(e) =>
//               setPassword(e.target.value)
//             }
//             required
//           />

//           <button type="submit" disabled={loading}>

//             {loading ? "Signing in..." : "Sign in"}

//           </button>

//         </form>

//         {error && (
//           <div className="error">{error}</div>
//         )}

//         <div className="auth-footer">

//           <span>
//             Don’t have an account?
//           </span>

//           <button onClick={switchToSignup}>
//             Create account
//           </button>

//         </div>

//       </div>

//     </div>

//   );
// }
import React, { useState, useCallback } from "react";
import { loginUser } from "../services/authService";

export default function Login({ onSuccess, switchToSignup }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  };

  const submit = useCallback(async (e) => {

    e.preventDefault();
    setError(null);

    /* Frontend validation */

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {

      const data = await loginUser(email.trim(), password);

      onSuccess({ user: data.user });

    } catch (err) {

      setError(err.message || "Invalid email or password");

    } finally {

      setLoading(false);

    }

  }, [email, password, onSuccess]);



  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value);
  }, []);



  return (

    <div className="auth-center-page fade-in">

      <h1 className="auth-main-title">
        DigitIt Task Manager
      </h1>

      <div className="auth-center-card panel">

        <h2 className="auth-welcome">
          Welcome back
        </h2>

        <p className="auth-subtitle">
          Sign in to access your dashboard.
        </p>

        <form onSubmit={submit} className="auth-form-grid">

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />

          <button type="submit" disabled={loading}>

            {loading ? "Signing in..." : "Sign in"}

          </button>

        </form>

        {error && (
          <div className="error">{error}</div>
        )}

        <div className="auth-footer">

          <span>
            Don’t have an account?
          </span>

          <button onClick={switchToSignup}>
            Create account
          </button>

        </div>

      </div>

    </div>

  );
}