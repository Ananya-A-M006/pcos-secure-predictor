import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const DashboardDoctor = () => {
  const navigate = useNavigate();
  const doctorName = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard">
      <h2>Welcome Dr. {doctorName}</h2>

      <div className="dashboard-actions">
        <Button
          text="View Appointments"
          onClick={() => navigate("/doctor/appointments")}
        />
        <Button
          text="My Profile"
          onClick={() => navigate("/doctor/profile")}
        />
        <Button text="Logout" onClick={logout} />
      </div>
    </div>
  );
};

export default DashboardDoctor;
