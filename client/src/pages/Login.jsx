import React, { useState } from 'react';
import { request } from '../api';

export default function Login({ onSuccess, switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await request('/auth/login', { method: 'POST', body: { email, password } });
      onSuccess({ user: data.user, token: data.token });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-center-page fade-in">

      {/* Title */}
      <h1 className="auth-main-title">DigitIt Task Manager</h1>

      <div className="auth-center-card panel">
        <h2 className="auth-welcome">Welcome back</h2>
        <p className="auth-subtitle">Sign in to access your DigitIt dashboard.</p>

        <form onSubmit={submit} className="auth-form-grid">
          <label className="label">Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="you@domain.com"
            required
          />

          <label className="label">Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Your password"
            required
          />

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {error && <div className="error" style={{ marginTop: 10 }}>{error}</div>}

        <div className="auth-footer">
          <span className="muted">Don’t have an account?</span>
          <button className="btn link-btn" onClick={switchToSignup}>Create account</button>
        </div>

        <div className="demo-box">
          <strong>Demo accounts</strong>
          <div className="tiny muted">Teacher: teacherA@example.com / Pass1234</div>
          <div className="tiny muted">Student: studentX@example.com / Pass1234</div>
        </div>

      </div>
    </div>
  );
}

