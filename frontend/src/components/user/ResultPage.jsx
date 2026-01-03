import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.css";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Passed from ScreeningForm
  const probability = location.state?.probability ?? null;

  let riskLabel = "Low Risk";
  let riskColor = "#2ecc71";

  if (probability !== null) {
    if (probability > 0.7) {
      riskLabel = "High Risk";
      riskColor = "#e74c3c";
    } else if (probability > 0.4) {
      riskLabel = "Moderate Risk";
      riskColor = "#f39c12";
    }
  }

  return (
    <div className="result-container">
      <h1>PCOS Screening Result</h1>

      {probability === null ? (
        <p>No prediction data available.</p>
      ) : (
        <>
          <div className="result-card">
            <h2>Prediction Outcome</h2>

            <div className="probability">
              {(probability * 100).toFixed(2)}%
            </div>

            <div
              className="risk-label"
              style={{ backgroundColor: riskColor }}
            >
              {riskLabel}
            </div>

            <p className="result-text">
              This result indicates the estimated probability of Polycystic
              Ovary Syndrome based on the medical parameters you provided.
            </p>
          </div>

          <div className="result-actions">
            <button onClick={() => navigate("/user/report")}>
              View Full Report
            </button>

            <button
              className="secondary"
              onClick={() => navigate("/user/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
}
