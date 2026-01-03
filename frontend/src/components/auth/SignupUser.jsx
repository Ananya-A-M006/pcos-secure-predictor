import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../services/api";
import InputField from "../common/InputField";
import Button from "../common/Button";

const SignupUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passkey, setPasskey] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await signupUser({
        username,
        password,
      });

      // ✅ STORE passkey in state
      setPasskey(res.passkey_demo);
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>User Signup</h2>

      {!passkey ? (
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
      ) : (
        <>
          <h3>🔐 Your Secure Passkey</h3>
          <p className="passkey">{passkey}</p>

          <p style={{ marginBottom: "20px" }}>
            ⚠ Save this passkey. It is required for:
            <br />• Downloading reports  
            <br />• Doctor appointment confirmation
          </p>

          <Button
            text="Proceed to Login"
            onClick={() => navigate("/user/login")}
          />
        </>
      )}
    </div>
  );
};

export default SignupUser;
