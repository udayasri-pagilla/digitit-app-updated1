import React from "react";

// Header component
// This component displays the application title and a logout button
// It receives an onLogout function as a prop from the parent component
export default function Header({ onLogout }) {

  return (

    // Main header container with padding for spacing
    <header style={{ padding: "18px 20px" }}>

      {/* Wrapper div to align title and logout button in one row */}
      <div
        style={{
          display: "flex", // Align items horizontally
          justifyContent: "space-between", // Push title left and button right
          alignItems: "center", // Vertically center items
          maxWidth: 1200, // Limit width for better layout
          margin: "0 auto" // Center the header content
        }}
      >

        {/* Application title / branding */}
        <div style={{ fontWeight: 800, fontSize: 20 }}>
          DigitIt Task Manager
        </div>

        {/* Logout button that triggers the onLogout function when clicked */}
        <button onClick={onLogout}>
          Logout
        </button>

      </div>

    </header>

  );
}