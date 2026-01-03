import React from "react";
import Button from "../common/Button";

const DoctorProfile = () => {
  const doctorName = localStorage.getItem("username");

  return (
    <div className="profile">
      <h2>Doctor Profile</h2>

      <p><strong>Name:</strong> Dr. {doctorName}</p>
      <p><strong>Specialization:</strong> Gynecology</p>
      <p><strong>Hospital:</strong> SecureCare Clinic</p>
      <p><strong>Availability:</strong> 10:00 AM – 6:00 PM</p>

      <Button text="Back" onClick={() => window.history.back()} />
    </div>
  );
};

export default DoctorProfile;
