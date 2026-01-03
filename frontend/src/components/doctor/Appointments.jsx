import React, { useState } from "react";
import Button from "../common/Button";
import InputField from "../common/InputField";

const Appointments = () => {
  const [passkey, setPasskey] = useState("");
  const [verifiedId, setVerifiedId] = useState(null);

  // Demo data (replace later with backend API)
  const appointments = [
    {
      id: 1,
      user: "Ananya",
      time: "2026-01-03 17:45",
      probability: "72%",
    },
    {
      id: 2,
      user: "Sneha",
      time: "2026-01-03 18:10",
      probability: "65%",
    },
  ];

  const verifyAppointment = (id) => {
    if (passkey.length >= 4) {
      setVerifiedId(id);
    } else {
      alert("Invalid passkey");
    }
  };

  return (
    <div className="appointments">
      <h2>Appointment Requests</h2>

      {appointments.map((appt) => (
        <div key={appt.id} className="appointment-card">
          <p><strong>User:</strong> {appt.user}</p>
          <p><strong>Requested At:</strong> {appt.time}</p>
          <p><strong>PCOS Probability:</strong> {appt.probability}</p>

          {verifiedId !== appt.id ? (
            <>
              <InputField
                label="Enter Passkey to Confirm"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
              />
              <Button
                text="Confirm Appointment"
                onClick={() => verifyAppointment(appt.id)}
              />
            </>
          ) : (
            <p style={{ color: "green" }}>
              ✔ Appointment Confirmed
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Appointments;
