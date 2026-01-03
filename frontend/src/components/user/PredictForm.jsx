import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictPCOS } from "../../services/api";
import Button from "../common/Button";
import InputField from "../common/InputField";

const PredictForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    waist: "",
    hip: "",
    cycle_regular: 0,
    cycle_length: "",
    blood_group: 1,
    pulse_rate: "",
    years_married: "",
    pregnant: 0,
    abortions: 0,
    beta_hcg_1: "",
    beta_hcg_2: "",
    rbs: "",
    weight_gain: 0,
    hair_growth: 0,
    skin_darkening: 0,
    hair_loss: 0,
    pimples: 0,
    fast_food: 0,
    exercise: 0
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitPrediction = async () => {
    setLoading(true);
    const res = await predictPCOS(form);
    navigate("/user/report", { state: res });
  };

  return (
    <div className="form-container">
      <h2>PCOS Screening</h2>

      {Object.keys(form).map((key) => (
        <InputField
          key={key}
          label={key.replace(/_/g, " ").toUpperCase()}
          name={key}
          value={form[key]}
          onChange={handleChange}
        />
      ))}

      <Button
        text={loading ? "Predicting..." : "Predict"}
        onClick={submitPrediction}
        disabled={loading}
      />
    </div>
  );
};

export default PredictForm;
