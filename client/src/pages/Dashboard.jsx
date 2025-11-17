// import React, { useEffect, useState } from 'react';
// import { request } from '../api';
// import TaskForm from '../shared/TaskForm';

// export default function Dashboard({ user, token }) {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState('all');

//   async function load() {
//     setLoading(true); setError(null);
//     try {
//       const qs = filter === 'all' ? '' : `?progress=${encodeURIComponent(filter)}`;
//       const data = await request(`/tasks${qs}`, { token });
//       setTasks(data.tasks || []);
//     } catch (err) {
//       setError(err.message || 'Failed to load');
//     } finally { setLoading(false); }
//   }

//   useEffect(() => { load(); }, [filter]);

//   async function createTask(payload) {
//     try {
//       const data = await request('/tasks', { method: 'POST', token, body: payload });
//       setTasks(prev => [data.task, ...prev]);
//     } catch (err) { alert(err.message || 'Create failed'); }
//   }

//   async function updateTask(id, payload) {
//     try {
//       const data = await request(`/tasks/${id}`, { method: 'PUT', token, body: payload });
//       setTasks(prev => prev.map(t => t._id === id ? data.task : t));
//     } catch (err) { alert(err.message || 'Update failed'); }
//   }

//   async function deleteTask(id) {
//     if (!confirm('Delete this task?')) return;
//     try {
//       await request(`/tasks/${id}`, { method: 'DELETE', token });
//       setTasks(prev => prev.filter(t => t._id !== id));
//     } catch (err) { alert(err.message || 'Delete failed'); }
//   }

//   function formatDate(d) {
//     if (!d) return '—';
//     return new Date(d).toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
//   }

//   function progressLabel(progress) {
//     if (progress === 'completed') return 'Completed';
//     if (progress === 'in-progress') return 'In Progress';
//     return 'Not started';
//   }

//   return (
//     <div className="dashboard-wrap">
//       <div className="dashboard-top">
//         <div>
//           <h1 className="title">DigitIt — Tasks</h1>
//           <div className="subtitle">
//             Logged in as <strong>{user.email}</strong> • <span className="muted">{user.role}</span>
//             {user.role === 'student' && user.teacher ? <span className="muted"> • Teacher: {user.teacher.email}</span> : null}
//           </div>
//         </div>

//         <div className="controls">
//           <div className="filter">
//             <label className="label">Filter</label>
//             <select aria-label="Filter tasks" value={filter} onChange={e => setFilter(e.target.value)}>
//               <option value="all">All</option>
//               <option value="not-started">Not started</option>
//               <option value="in-progress">In progress</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="grid">
//         <main className="main">
//           <section className="panel">
//             <div className="panel-header">
//               <h2 className="section-title">Tasks</h2>
//               <div className="panel-sub">Create tasks and control progress — everything is role-protected at the server.</div>
//             </div>

//             <div className="create-row">
//               <TaskForm onSubmit={createTask} />
//             </div>

//             {loading && <div className="notice">Loading tasks…</div>}
//             {error && <div className="error">{error}</div>}

//             <div className="cards">
//               {tasks.length === 0 && !loading ? (
//                 <div className="empty panel">
//                   <strong>No tasks yet</strong>
//                   <div className="muted">Create a new task using the form above.</div>
//                 </div>
//               ) : tasks.map(t => {
//                 const ownerId = t.userId?._id ? String(t.userId._id) : null;
//                 const meId = String(user.id);
//                 const amOwner = ownerId === meId;

//                 // safe fields
//                 const progress = t.progress || 'not-started';
//                 const ownerEmail = t.userId?.email || 'Unknown';

//                 return (
//                   <article key={t._id} className={`card card-${progress}`}>
//                     <div className="card-left" aria-hidden />
//                     <div className="card-body">
//                       <div className="card-top">
//                         <div className="card-title">{t.title}</div>
//                         <div className="card-controls">
//                           <select value={progress} onChange={e => updateTask(t._1?._id ? t._1._id : t._id, { progress: e.target.value }) || updateTask(t._id, { progress: e.target.value })}>
//                             <option value="not-started">Not started</option>
//                             <option value="in-progress">In progress</option>
//                             <option value="completed">Completed</option>
//                           </select>
//                         </div>
//                       </div>

//                       <div className="card-desc">{t.description || <span className="muted">No description</span>}</div>

//                       <div className="card-meta">
//                         <div className="meta-item"><span className="muted">Due</span><div>{formatDate(t.dueDate)}</div></div>
//                         <div className="meta-item"><span className="muted">Owner</span><div>{ownerEmail}</div></div>
//                         <div className="meta-item"><span className="muted">Status</span><div className="badge">{progressLabel(progress)}</div></div>
//                       </div>

//                       {amOwner && (
//                         <div className="card-actions">
//                           <button className="btn btn-ghost" onClick={() => { const p = prompt('Edit title', t.title); if (p) updateTask(t._id, { title: p }); }}>Edit</button>
//                           <button className="btn btn-danger" onClick={() => deleteTask(t._id)}>Delete</button>
//                         </div>
//                       )}
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           </section>
//         </main>

//         <aside className="aside">
//           <div className="panel">
//             <h3 className="section-title">Profile</h3>
//             <div className="muted" style={{marginTop:8}}>{user.email}</div>
//             <div className="muted">Role: {user.role}</div>
//             {user.role === 'student' && user.teacher && <div className="muted">Teacher: {user.teacher.email}</div>}
//             <div style={{marginTop:12}}>
//               <h4 className="small-title">Stats</h4>
//               <div className="stat-row">
//                 <div className="stat-item">
//                   <div className="stat-num">{tasks.length}</div>
//                   <div className="muted tiny">Total tasks</div>
//                 </div>
//               </div>
//             </div>

//             <div style={{marginTop:14}}>
//               <h4 className="small-title">Quick Actions</h4>
//               <div className="quick-actions">
//                 <button className="btn btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Create Task</button>
//                 <button className="btn btn-secondary" onClick={() => setFilter('all')}>Show all</button>
//                 <button className="btn btn-secondary" onClick={() => setFilter('in-progress')}>In progress</button>
//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }
 
// import React, { useEffect, useState } from "react";
// import { request } from "../api";
// import TaskForm from "../shared/TaskForm";

// export default function Dashboard({ user, token }) {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState("all");

//   async function load() {
//     setLoading(true);
//     setError(null);
//     try {
//       const qs = filter === "all" ? "" : `?progress=${encodeURIComponent(filter)}`;
//       const data = await request(`/tasks${qs}`, { token });
//       setTasks(data.tasks || []);
//     } catch (err) {
//       setError(err.message || "Failed to load");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     load();
//   }, [filter]);

//   async function createTask(payload) {
//     try {
//       const data = await request("/tasks", {
//         method: "POST",
//         token,
//         body: payload,
//       });
//       setTasks((prev) => [data.task, ...prev]);
//     } catch (err) {
//       alert(err.message || "Create failed");
//     }
//   }

//   async function updateTask(id, payload) {
//     try {
//       const data = await request(`/tasks/${id}`, {
//         method: "PUT",
//         token,
//         body: payload,
//       });
//       setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
//     } catch (err) {
//       alert(err.message || "Update failed");
//     }
//   }

//   async function deleteTask(id) {
//     if (!confirm("Delete this task?")) return;
//     try {
//       await request(`/tasks/${id}`, { method: "DELETE", token });
//       setTasks((prev) => prev.filter((t) => t._id !== id));
//     } catch (err) {
//       alert(err.message || "Delete failed");
//     }
//   }

//   function formatDate(date) {
//     if (!date) return "—";
//     return new Date(date).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   }

//   return (
//     <div className="dashboard-container fade-in">

//       {/* Header */}
//       <div className="header-card">
//         <div>
//           <h1 className="app-title">DigitIt Task Manager</h1>
//           <p className="app-subtitle">
//             Welcome, <strong>{user.email}</strong> • {user.role}
//             {user.role === "student" && user.teacher ? (
//               <> • Teacher: {user.teacher.email}</>
//             ) : null}
//           </p>
//         </div>
//       </div>

//       {/* Create Task + Filter */}
//       <div className="top-actions">
//         <div className="task-create-box">
//           <TaskForm onSubmit={createTask} />
//         </div>

//         <div className="filter-box">
//           <label>Progress</label>
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="all">All</option>
//             <option value="not-started">Not started</option>
//             <option value="in-progress">In progress</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>
//       </div>

//       {/* Tasks Grid */}
//       <div className="tasks-grid">
//         {loading ? (
//           <div className="loading">Loading tasks...</div>
//         ) : tasks.length === 0 ? (
//           <div className="empty-box">No tasks yet</div>
//         ) : (
//           tasks.map((t) => {
//             const isOwner =
//               t.userId?._id && t.userId._id.toString() === user.id.toString();

//             return (
//               <div key={t._id} className="task-card fade-in">
//                 <div className="task-title">{t.title}</div>
//                 <div className="task-desc">
//                   {t.description || <span className="muted">No description</span>}
//                 </div>

//                 <div className="task-row">
//                   <span className="muted">Owner:</span>{" "}
//                   <strong>{t.userId?.email}</strong>
//                 </div>

//                 <div className="task-row">
//                   <span className="muted">Due:</span> {formatDate(t.dueDate)}
//                 </div>

//                 <div className="task-row">
//                   <span className="muted">Progress:</span>
//                   <select
//                     value={t.progress}
//                     onChange={(e) =>
//                       updateTask(t._id, { progress: e.target.value })
//                     }
//                   >
//                     <option value="not-started">Not started</option>
//                     <option value="in-progress">In progress</option>
//                     <option value="completed">Completed</option>
//                   </select>
//                 </div>

//                 {/* Only owner can delete/edit */}
//                 {isOwner && (
//                   <div className="task-actions">
//                     <button
//                       className="btn-edit"
//                       onClick={() => {
//                         const newTitle = prompt("New title", t.title);
//                         if (newTitle) updateTask(t._id, { title: newTitle });
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => deleteTask(t._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import { request } from "../api";
import TaskForm from "../shared/TaskForm";

/**
 * Dashboard
 * - user: { id, email, role, teacher? }
 * - token: auth token string
 */
export default function Dashboard({ user, token }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const qs = filter === "all" ? "" : `?progress=${encodeURIComponent(filter)}`;
      const data = await request(`/tasks${qs}`, { token });
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function createTask(payload) {
    try {
      const data = await request("/tasks", {
        method: "POST",
        token,
        body: payload,
      });
      // Insert new task at top
      setTasks((prev) => [data.task, ...prev]);
    } catch (err) {
      alert(err.message || "Create failed");
    }
  }

  async function updateTask(id, payload) {
    try {
      const data = await request(`/tasks/${id}`, {
        method: "PUT",
        token,
        body: payload,
      });
      setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
    } catch (err) {
      alert(err.message || "Update failed");
    }
  }

  async function deleteTask(id) {
    if (!confirm("Delete this task?")) return;
    try {
      await request(`/tasks/${id}`, { method: "DELETE", token });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  }

  function formatDate(date) {
    if (!date) return "—";
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return date;
    }
  }

  function isOwnerOfTask(t) {
    // server returns userId populated (object with _id or string)
    if (!t || !user) return false;
    const ownerId = t.userId?._id ?? t.userId; // support both shapes
    if (!ownerId) return false;
    return String(ownerId) === String(user.id || user._id || user._id);
  }

  return (
    <div className="dashboard-container fade-in">

      {/* Header */}
      <div className="header-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="app-title">DigitIt Task Manager</h1>
          <p className="app-subtitle">
            Welcome, <strong>{user.email}</strong> • <span className="muted">{user.role}</span>
            {user.role === "student" && user.teacher ? <> • Teacher: {user.teacher.email}</> : null}
          </p>
        </div>
        {/* optional quick stats in header */}
        <div style={{ textAlign: "right" }}>
          <div className="tiny muted">Total tasks</div>
          <div style={{ fontWeight: 800, fontSize: 20 }}>{tasks.length}</div>
        </div>
      </div>

      {/* Top actions: create form + filter */}
      <div className="top-actions" style={{ alignItems: "flex-start" }}>
        <div className="task-create-box">
          <TaskForm onSubmit={createTask} />
        </div>

        <div className="filter-box">
          <label className="label">Progress</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="not-started">Not started</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Tasks grid */}
      <div className="tasks-grid" style={{ marginTop: 18 }}>
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : tasks.length === 0 ? (
          <div className="empty-box">No tasks yet</div>
        ) : (
          tasks.map((t) => {
            const ownerEmail = t.userId?.email ?? (typeof t.userId === "string" ? t.userId : "Unknown");
            const progress = t.progress || "not-started";
            const owner = isOwnerOfTask(t);

            return (
              <article key={t._id} className={`task-card fade-in card-${progress}`}>
                <div className="task-title">{t.title}</div>

                <div className="task-desc">
                  {t.description || <span className="muted">No description</span>}
                </div>

                <div className="task-row" style={{ marginTop: 10 }}>
                  <span className="muted">Owner:</span>{" "}
                  <strong style={{ marginLeft: 6 }}>{ownerEmail}</strong>
                </div>

                <div className="task-row">
                  <span className="muted">Due:</span> <span style={{ marginLeft: 6 }}>{formatDate(t.dueDate)}</span>
                </div>

                <div className="task-row" style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
                  <span className="muted">Progress:</span>
                  <select
                    value={t.progress}
                    onChange={(e) => updateTask(t._id, { progress: e.target.value })}
                    style={{ minWidth: 160 }}
                  >
                    <option value="not-started">Not started</option>
                    <option value="in-progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {owner && (
                  <div className="task-actions" style={{ marginTop: 12 }}>
                    <button
                      className="btn btn-ghost small-btn"
                      onClick={() => {
                        const newTitle = prompt("Edit task title", t.title);
                        if (newTitle && newTitle.trim()) updateTask(t._id, { title: newTitle.trim() });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger small-btn"
                      onClick={() => deleteTask(t._1?._id ? t._1._id : t._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
