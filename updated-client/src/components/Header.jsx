import React from "react";

export default function Header({ onLogout }) {

  return (

    <header style={{ padding: "18px 20px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1200,
          margin: "0 auto"
        }}
      >

        <div style={{ fontWeight: 800, fontSize: 20 }}>
          DigitIt Task Manager
        </div>

        <button onClick={onLogout}>
          Logout
        </button>

      </div>

    </header>

  );
}