

 import React, { useState } from 'react'
import { request } from '../api'

export default function Login({ onSuccess, switchToSignup }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()

    setError(null)
    setLoading(true)

    try {

      const data = await request('/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      // cookie is already stored by browser
      onSuccess({ user: data.user })

    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-center-page fade-in">

      <h1 className="auth-main-title">DigitIt Task Manager</h1>

      <div className="auth-center-card panel">

        <h2 className="auth-welcome">Welcome back</h2>
        <p className="auth-subtitle">
          Sign in to access your DigitIt dashboard.
        </p>

        <form onSubmit={submit} className="auth-form-grid">

          <label>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
          />

          <label>Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        {error && <div className="error">{error}</div>}

        <div className="auth-footer">
          <span>Don’t have an account?</span>
          <button onClick={switchToSignup}>
            Create account
          </button>
        </div>

      </div>

    </div>
  )
}