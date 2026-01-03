import joblib
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

model = joblib.load("models/pcos_model.pkl")
scaler = joblib.load("models/pcos_scaler.pkl")

# Load test data (CSV you used while training)
df = pd.read_csv("pcos_test.csv")

X = df[["bmi", "whr", "cycle_encoded"]]
y = df["label"]

X_scaled = scaler.transform(X)
y_pred = model.predict(X_scaled)

print("Accuracy:", accuracy_score(y, y_pred))
print("Precision:", precision_score(y, y_pred))
print("Recall:", recall_score(y, y_pred))
print("F1:", f1_score(y, y_pred))
