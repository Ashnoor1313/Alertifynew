from fastapi import APIRouter
from pydantic import BaseModel
import pickle
import os
import traceback

router = APIRouter()

class UPIInput(BaseModel):
    upi: str

# ---------------------------
# Lazy model loader
# ---------------------------
_model = None
_vectorizer = None

def get_model():
    global _model, _vectorizer
    if _model is None or _vectorizer is None:
        model_path = os.path.join(os.path.dirname(__file__), "..", "..", "ml_models", "upi_model.pkl")
        vectorizer_path = os.path.join(os.path.dirname(__file__), "..", "..", "ml_models", "vectorizer.pkl")
        try:
            with open(model_path, "rb") as f:
                _model = pickle.load(f)
            print("✅ UPI model loaded successfully.")
        except Exception as e:
            print(f"⚠️ Could not load UPI model: {e}")
            _model = None
        try:
            with open(vectorizer_path, "rb") as f:
                _vectorizer = pickle.load(f)
            print("✅ Vectorizer loaded successfully.")
        except Exception as e:
            print(f"⚠️ Could not load vectorizer: {e}")
            _vectorizer = None
    return _model, _vectorizer

@router.post("/predict")
def predict_upi(data: UPIInput):
    model, vectorizer = get_model()

    if model is None or vectorizer is None:
        return {"error": "Model or vectorizer not loaded. Check server logs."}

    try:
        features = vectorizer.transform([data.upi])
        prediction = int(model.predict(features)[0])

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
