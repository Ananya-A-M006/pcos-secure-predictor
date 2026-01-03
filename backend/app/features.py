def derive_features(raw: dict) -> dict:
    """
    Data minimization layer.
    Converts raw health data into derived, non-reversible features.
    """

    height_m = raw["height"] / 100
    bmi = raw["weight"] / (height_m ** 2)

    whr = raw["waist"] / raw["hip"]

    cycle_encoded = 1 if raw["cycle"] == "irregular" else 0

    return {
        "bmi": round(bmi, 2),
        "whr": round(whr, 2),
        "cycle_encoded": cycle_encoded
    }
