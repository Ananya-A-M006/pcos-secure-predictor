import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const DashboardUser = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {username}</h2>

      <div className="dashboard-actions">
        <Button text="Start Screening" onClick={() => navigate("/user/predict")} />
        <Button text="View History" onClick={() => navigate("/user/history")} />
        <Button text="Logout" onClick={logout} />
      </div>
    </div>
  );
};

export default DashboardUser;
