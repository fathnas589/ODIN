import React from "react";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* Top-left brand */}
      <div style={styles.brand}>
        <div style={styles.logo}>O</div>
        <span style={styles.brandText}>ODIN Solutions</span>
      </div>

      {/* Main content */}
      <h1 style={styles.title}>AI-Powered Support Knowledge Base</h1>
      <p style={styles.subtitle}>
        Intelligent FAQ Management for Modern Busineses
      </p>
      <button style={styles.button} onClick={() => navigate("/dashboard")}>
        Go to FAQ Dashboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#beadc1ff",
    position: "relative" as const,
    textAlign: "center" as const,
  },

  /* Brand styles */
  brand: {
    position: "absolute" as const,
    top: "20px",
    left: "24px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logo: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    backgroundColor: "#4f46e5",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
  },
  brandText: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#2d2a32",
  },

  /* Main content styles */
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    fontWeight: 600,
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#555",
    maxWidth: "520px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "1rem",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Landing;
