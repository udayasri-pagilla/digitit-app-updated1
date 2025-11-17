import React, { useState } from 'react';
import { request } from '../api';

export default function Signup({ switchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [teacherId, setTeacherId] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const body = { email, password, role };
      if (role === 'student') {
        if (teacherId) body.teacherId = teacherId;
        else if (teacherEmail) body.teacherEmail = teacherEmail;
      }
      await request('/auth/signup', { method: 'POST', body });
      setMsg({ type: 'success', text: 'Signup successful — please login' });
      setEmail(''); setPassword(''); setTeacherEmail(''); setTeacherId('');
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Signup failed' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-center-page fade-in">
      <div className="auth-card panel auth-card-stacked">

        {/* SIMPLE STACKED HEADER - guaranteed to be on top */}
        <div className="auth-stacked-header-plain">
          <h2 className="auth-title">Create account</h2>
          <p className="muted auth-subnote">Choose a role and sign up. Students should link to a teacher.</p>
        </div>

        <form onSubmit={submit} className="signup-form" aria-label="Signup form">
          <label className="field">
            <span className="field-label">Email</span>
            <input
              className="input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@domain.com"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Choose a strong password"
              required
            />
          </label>

          <div className="field">
            <span className="field-label">Role</span>
            <div className="radio-row">
              <label className={`radio ${role === 'student' ? 'radio-selected' : ''}`}>
                <input type="radio" name="role" checked={role === 'student'} onChange={() => setRole('student')} />
                <span>Student</span>
              </label>
              <label className={`radio ${role === 'teacher' ? 'radio-selected' : ''}`}>
                <input type="radio" name="role" checked={role === 'teacher'} onChange={() => setRole('teacher')} />
                <span>Teacher</span>
              </label>
            </div>
          </div>

          {role === 'student' && (
            <>
              <label className="field">
                <span className="field-label">Teacher ID (optional)</span>
                <input
                  className="input"
                  placeholder="Paste teacher _id here"
                  value={teacherId}
                  onChange={e => setTeacherId(e.target.value)}
                />
              </label>

              <label className="field">
                <span className="field-label">Or teacher email (optional)</span>
                <input
                  className="input"
                  placeholder="teacher@example.com"
                  value={teacherEmail}
                  onChange={e => setTeacherEmail(e.target.value)}
                />
              </label>
            </>
          )}

          <div className="form-actions form-actions-space">
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Signing up…' : 'Signup'}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={switchToLogin}
            >
              Back to login
            </button>
          </div>

          {msg && (
            <div className={`form-msg ${msg.type === 'error' ? 'error' : 'success'}`} role="status" style={{ marginTop: 12 }}>
              {msg.text}
            </div>
          )}

          <div className="muted" style={{ marginTop: 12, fontSize: 13 }}>
            Already have an account? <button className="link-btn" type="button" onClick={switchToLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
