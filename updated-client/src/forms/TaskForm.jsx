import React, { useState } from "react";

// TaskForm component
// This form allows users to create a new task
// It collects title, description, and due date
// The onSubmit function is passed from the parent component
export default function TaskForm({ onSubmit }) {

  // State variables to store form input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Handles form submission
  function handleSubmit(e) {

    // Prevent page reload when form is submitted
    e.preventDefault();

    // Do not allow empty titles
    if (!title.trim()) return;

    // Prepare the task data to send to the parent or backend
    const payload = {
      // Remove extra spaces from title
      title: title.trim(),

      // Remove extra spaces from description
      description: description.trim(),

      // Convert due date to ISO format if provided, otherwise set null
      dueDate: dueDate
        ? new Date(dueDate).toISOString()
        : null
    };

    // Send the task data to the parent component
    onSubmit(payload);

    // Clear the form fields after submission
    setTitle("");
    setDescription("");
    setDueDate("");

  }

  return (

    // Form element that triggers handleSubmit on submit
    <form onSubmit={handleSubmit}>

      <div>

        {/* Input field for task title */}
        <label>Title</label>

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          // Update title state when user types
          onChange={(e) => setTitle(e.target.value)}
        />

      </div>


      <div>

        {/* Input field for task description */}
        <label>Description</label>

        <input
          type="text"
          placeholder="Task description"
          value={description}
          // Update description state when user types
          onChange={(e) => setDescription(e.target.value)}
        />

      </div>


      <div>

        {/* Input field for selecting due date */}
        <label>Due Date</label>

        <input
          type="date"
          value={dueDate}
          // Update due date state when user selects a date
          onChange={(e) => setDueDate(e.target.value)}
        />

      </div>


      {/* Button to submit the form and create a new task */}
      <button type="submit">
        Create Task
      </button>

    </form>

  );
}