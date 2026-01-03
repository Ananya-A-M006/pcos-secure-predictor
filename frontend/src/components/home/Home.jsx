import React from "react";
import { useNavigate } from "react-router-dom";

import AboutPCOS from "./AboutPCOS";
import Disclaimer from "./Disclaimer";
import SecurityDemo from "./SecurityDemo";

import "./Home.css"; // keep your CSS here

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* HEADER */}
      <header className="home-header">
        <h1>🩺 PCOS Secure Predictor</h1>
        <p className="subtitle">
          Secure • Private • Academic PCOS Risk Assessment
        </p>
      </header>

      {/* CONTENT */}
      <AboutPCOS />
      <Disclaimer />

      {/* LOGIN BLOCKS */}
      <div className="login-blocks">

        {/* USER */}
        <div className="card user-card">
          <h3>👩 User Portal</h3>
          <p>PCOS screening & secure consultation</p>
          <button onClick={() => navigate("/user/login")}>
            User Login
          </button>
          <span onClick={() => navigate("/user/signup")}>
            New user? Sign up
          </span>
        </div>

        {/* DOCTOR */}
        <div className="card doctor-card">
          <h3>👨‍⚕️ Doctor Portal</h3>
          <p>Appointments & report verification</p>
          <button onClick={() => navigate("/doctor/login")}>
            Doctor Login
          </button>
          <span onClick={() => navigate("/doctor/signup")}>
            New doctor? Register
          </span>
        </div>

      </div>

      <SecurityDemo />

      {/* FOOTER */}
      <footer className="home-footer">
        <p>Computer Network Security Academic Project</p>
      </footer>

    </div>
  );
};

export default Home;
