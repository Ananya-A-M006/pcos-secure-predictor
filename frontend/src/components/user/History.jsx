import React from "react";
import Button from "../common/Button";

const History = () => {
  // later connect to backend history API
  return (
    <div className="history-container">
      <h2>Prediction History</h2>

      <p>No previous records available.</p>

      <Button text="Back to Dashboard" onClick={() => window.history.back()} />
    </div>
  );
};

export default History;
