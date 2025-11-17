
import React, { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a title.");

    const payload = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    };

    onSubmit(payload);
    setTitle("");
    setDescription("");
    setDueDate("");
  }

  return (
    <form className="task-form-grid" onSubmit={handleSubmit} aria-label="Create task form">
      <div className="field">
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          className="input task-input"
          type="text"
          placeholder="e.g. Build weather widget"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="field field-grow">
        <label htmlFor="task-desc">Description</label>
        <input
          id="task-desc"
          className="input task-input"
          type="text"
          placeholder="Short description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="task-date">Due date</label>
        <input
          id="task-date"
          className="input task-input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="field field-action" style={{ alignSelf: "end" }}>
        <button className="btn btn-primary create-task-btn" type="submit">
          Create Task
        </button>
      </div>
    </form>
  );
}

