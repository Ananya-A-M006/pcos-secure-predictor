from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from security import verify_hmac, decrypt_payload
from inference import predict
from inference import FEATURE_MAP

app = FastAPI(title="Secure ML Service")


class EncryptedRequest(BaseModel):
    data: str
    hmac: str


@app.post("/infer")
def infer(req: EncryptedRequest):
    """
    Secure ML inference endpoint.
    """

    ciphertext = req.data.encode()

    # STEP 1: Integrity check
    if not verify_hmac(ciphertext, req.hmac):
        raise HTTPException(status_code=403, detail="Integrity check failed")

    # STEP 2: Decrypt payload
    features = decrypt_payload(ciphertext)

    # STEP 3: ML prediction
    probability = predict(features)

    # STEP 4: Return minimal output
    return {
        "probability": probability
    }

@app.post("/sanity-check")
def sanity_check(features: dict):
    required_api_features = set(FEATURE_MAP.values())
    received_features = set(features.keys())

    missing = list(required_api_features - received_features)
    extra = list(received_features - required_api_features)

    if missing:
        return {
            "status": "FAIL",
            "missing_features": missing
        }

    return {
        "status": "PASS",
        "feature_count_received": len(received_features),
        "expected_feature_count": len(required_api_features),
        "extra_features_ignored": extra
    }

