import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import InputField from "../common/InputField";

const Report = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [passkey, setPasskey] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyPasskey = () => {
    if (passkey.length >= 4) {
      setVerified(true);
    } else {
      alert("Invalid passkey");
    }
  };

  if (!state) return <p>No report available</p>;

  return (
    <div className="report-container">
      <h2>Prediction Report</h2>

      {!verified ? (
        <>
          <InputField
            label="Enter Passkey to View Report"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
          />
          <Button text="Verify" onClick={verifyPasskey} />
        </>
      ) : (
        <>
          <p>
            <strong>PCOS Probability:</strong> {(state.probability * 100).toFixed(2)}%
          </p>

          <Button text="Consult Doctor" onClick={() => navigate("/user/consult")} />
          <Button text="Download Report" onClick={() => window.print()} />
        </>
      )}
    </div>
  );
};

export default Report;
