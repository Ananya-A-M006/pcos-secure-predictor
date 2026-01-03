import joblib
import pandas as pd

model = joblib.load("models/pcos_model.pkl")
scaler = joblib.load("models/pcos_scaler.pkl")

TRAINED_FEATURES = list(scaler.feature_names_in_)

FEATURE_MAP = {
    " Age (yrs)": "age",
    "Weight (Kg)": "weight",
    "Height(Cm) ": "height",
    "BMI": "bmi",
    "Blood Group": "blood_group",
    "Pulse rate(bpm) ": "pulse_rate",
    "Cycle(R/I)": "cycle_regular",
    "Cycle length(days)": "cycle_length",
    "Marraige Status (Yrs)": "years_married",
    "Pregnant(Y/N)": "pregnant",
    "No. of abortions": "abortions",
    "  I   beta-HCG(mIU/mL)": "beta_hcg_1",
    "II    beta-HCG(mIU/mL)": "beta_hcg_2",
    "Hip(inch)": "hip",
    "Waist(inch)": "waist",
    "Waist:Hip Ratio": "whr",
    "RBS(mg/dl)": "rbs",
    "Weight gain(Y/N)": "weight_gain",
    "hair growth(Y/N)": "hair_growth",
    "Skin darkening (Y/N)": "skin_darkening",
    "Hair loss(Y/N)": "hair_loss",
    "Pimples(Y/N)": "pimples",
    "Fast food (Y/N)": "fast_food",
    "Reg.Exercise(Y/N)": "exercise",
}

def predict(features: dict):
    row = []

    for trained_col in TRAINED_FEATURES:
        api_key = FEATURE_MAP[trained_col]
        row.append(features[api_key])

    df = pd.DataFrame([row], columns=TRAINED_FEATURES)

    scaled = scaler.transform(df)
    prob = model.predict_proba(scaled)[0][1]

    return float(prob)
