import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api";
import "../../styles/main.css";

export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ username, password });

      if (res.message === "Login successful") {
        // 🔐 Store login session (frontend-side)
        localStorage.setItem(
          "user",
          JSON.stringify({
            username,
            role: res.role || "user"
          })
        );

        navigate("/user/dashboard");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <h2>User Login</h2>

      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <p className="auth-switch">
        Not registered? <Link to="/user/signup">Create an account</Link>
      </p>
    </div>
  );
}
