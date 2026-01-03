import React from "react";

const Disclaimer = () => {
  return (
    <section className="disclaimer">
      <h3>⚠️ Medical Disclaimer</h3>
      <p>
        This application is developed as an academic decision-support system.
        Predictions are generated using machine learning models and are
        <strong> not a medical diagnosis</strong>.
      </p>
      <p>
        Always consult a certified healthcare professional for clinical decisions.
      </p>
    </section>
  );
};

export default Disclaimer;
