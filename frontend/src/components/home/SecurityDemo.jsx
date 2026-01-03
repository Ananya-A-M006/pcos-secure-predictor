import React from "react";
import { useNavigate } from "react-router-dom";

const SecurityDemo = () => {
  const navigate = useNavigate();

  return (
    <section className="security-demo">
      <h3>🔐 Security Demonstration</h3>
      <p>
        This project demonstrates real Computer Network Security concepts such as:
      </p>
      <ul style={{ textAlign: "left", margin: "10px auto", maxWidth: "500px" }}>
        <li>Password hashing using PBKDF2</li>
        <li>AES encryption for ML communication</li>
        <li>HMAC integrity protection</li>
        <li>Data minimization & zero-trust design</li>
      </ul>
      <button onClick={() => navigate("/security")}>
        View Security Flow
      </button>
    </section>
  );
};

export default SecurityDemo;
