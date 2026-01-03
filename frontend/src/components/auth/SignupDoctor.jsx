import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupDoctor } from "../../services/api";
import InputField from "../common/InputField";
import Button from "../common/Button";

const SignupDoctor = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signupDoctor(username, password);
    navigate("/login/doctor");
  };

  return (
    <div className="auth-container">
      <h2>Doctor Registration</h2>

      <form onSubmit={handleSignup}>
        <InputField label="Doctor ID" value={username} onChange={e => setUsername(e.target.value)} />
        <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

        <Button text="Register Doctor" type="submit" />
      </form>
    </div>
  );
};

export default SignupDoctor;
