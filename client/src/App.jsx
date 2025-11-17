import React from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  const [userRaw, setUserRaw] = React.useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = React.useState(() => localStorage.getItem('token') || null);
  const [page, setPage] = React.useState(userRaw ? 'dashboard' : 'login');

  function handleLogin({ user, token }) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setUserRaw(user);
    setToken(token);
    setPage('dashboard');
  }

  function handleLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserRaw(null);
    setToken(null);
    setPage('login');
  }

  // show auth pages if not logged in
  if (!userRaw) {
    return (
      <div>
        {page === 'login' && <Login onSuccess={handleLogin} switchToSignup={() => setPage('signup')} />}
        {page === 'signup' && <Signup switchToLogin={() => setPage('login')} />}
      </div>
    );
  }

  // logged in -> dashboard layout
  return (
    <div className="app-shell">
      {/* header area - moved inside app so it's styled consistently */}
      <header style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontWeight: 800, fontSize: 20 }}>DigitIt Task Manager</div>
          <div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: '18px auto', padding: '0 16px' }}>
        <Dashboard user={userRaw} token={token} />
      </main>
    </div>
  );
}
