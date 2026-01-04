import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/api";
import InputField from "../common/InputField";
import Button from "../common/Button";

const SignupUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await signupUser({ username, password });
      alert(`Signup successful!\nPasskey (demo): ${res.passkey_demo}`);
      navigate("/user/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>User Signup</h2>

      <form onSubmit={handleSignup}>
        <InputField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Register Securely" type="submit" />
      </form>
    </div>
  );
};

export default SignupUser;
