import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginDoctor } from "../../services/api";
import InputField from "../common/InputField";
import Button from "../common/Button";

const LoginDoctor = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginDoctor(username, password);

      localStorage.setItem("loggedIn", true);
      localStorage.setItem("username", username);
      localStorage.setItem("role", "doctor");

      navigate("/doctor/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Doctor Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
        <InputField label="Doctor ID" value={username} onChange={e => setUsername(e.target.value)} />
        <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button text="Login" type="submit" />
      </form>

      <p>
        New doctor? <Link to="/signup/doctor">Register</Link>
      </p>
    </div>
  );
};

export default LoginDoctor;
