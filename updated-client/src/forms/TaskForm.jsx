import React, { useState } from "react";

export default function TaskForm({ onSubmit }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {

    e.preventDefault();

    if (!title.trim()) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate
        ? new Date(dueDate).toISOString()
        : null
    };

    onSubmit(payload);

    setTitle("");
    setDescription("");
    setDueDate("");

  }

  return (

    <form onSubmit={handleSubmit}>

      <div>

        <label>Title</label>

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      </div>


      <div>

        <label>Description</label>

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

      </div>


      <div>

        <label>Due Date</label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

      </div>


      <button type="submit">
        Create Task
      </button>

    </form>

  );
}