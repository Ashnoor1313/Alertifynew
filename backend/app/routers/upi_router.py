from fastapi import APIRouter
from pydantic import BaseModel
import pickle
import os
import traceback

# ---------------------------
# Router
# ---------------------------
router = APIRouter()

# ---------------------------
# Input schema
# ---------------------------
class UPIInput(BaseModel):
    upi: str

# ---------------------------
# Load model and vectorizer
# ---------------------------
model_path = os.path.join(os.path.dirname(__file__), "..", "..", "ml_models", "upi_model.pkl")
vectorizer_path = os.path.join(os.path.dirname(__file__), "..", "..", "ml_models", "vectorizer.pkl")

model = None
vectorizer = None

try:
    with open(model_path, "rb") as f:
        model = pickle.load(f)
    print("✅ UPI model loaded successfully.")
except Exception as e:
    print(f"⚠️ Could not load UPI model: {e}")

try:
    with open(vectorizer_path, "rb") as f:
        vectorizer = pickle.load(f)
    print("✅ Vectorizer loaded successfully.")
except Exception as e:
    print(f"⚠️ Could not load vectorizer: {e}")

# ---------------------------
# Prediction endpoint
# ---------------------------
@router.post("/predict")
def predict_upi(data: UPIInput):
    if model is None or vectorizer is None:
        return {"error": "Model or vectorizer not loaded. Check server logs."}

    try:
        # Transform input
        features = vectorizer.transform([data.upi])

        # Predict
        prediction = int(model.predict(features)[0])

        # Probability if available
        probability = None
        if hasattr(model, "predict_proba"):
            probability = model.predict_proba(features)[0].tolist()

        return {
            "upi": data.upi,
            "prediction": prediction,
            "probability": probability
        }

    except Exception as e:
        print(traceback.format_exc())
        return {"error": f"Prediction failed: {str(e)}"}
