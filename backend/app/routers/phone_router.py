# phone_router.py
from fastapi import APIRouter
from pydantic import BaseModel
import pandas as pd
import re
import os
import joblib
import warnings
from app.utils.features import NumericFeatureExtractor
import sys

# Ensure Jupyter-trained transformer class is found
sys.modules['__main__'].NumericFeatureExtractor = NumericFeatureExtractor

# ---------------------------
# FastAPI router
# ---------------------------
router = APIRouter()

class PhoneInput(BaseModel):
    phone_number: str

# ---------------------------
# Lazy model loader
# ---------------------------
_model = None

def get_model():
    global _model
    if _model is None:
        model_path = os.path.join(
            os.path.dirname(__file__), "..", "..", "ml_models", "phone_spam_pipeline.joblib"
        )
        try:
            _model = joblib.load(model_path)
            if not hasattr(_model, "predict"):
                warnings.warn("⚠️ Loaded model may not have predict method!")
            else:
                print("✅ Phone model loaded successfully.")
        except Exception as e:
            print(f"❌ Could not load phone model: {e}")
            _model = None
    return _model

# ---------------------------
# Prediction endpoint
# ---------------------------
@router.post("/predict")
def predict_phone(data: PhoneInput):
    model = get_model()

    if model is None:
        return {"error": "Model not loaded. Check server logs."}

    try:
        # 1️⃣ Clean phone number
        num_str = re.sub(r"\D", "", str(data.phone_number))
        if not num_str:
            return {"error": "Invalid phone number input."}

        # 2️⃣ Create DataFrame with 'num_str' column (pipeline expects this)
        df_input = pd.DataFrame({"num_str": [num_str]})

        # 3️⃣ Run prediction
        prediction = model.predict(df_input)
        label = str(prediction[0])

        # 4️⃣ Get probability/confidence if available
        confidence = None
        if hasattr(model, "predict_proba"):
            try:
                proba = model.predict_proba(df_input)[0]
                class_index = list(model.classes_).index(label)
                confidence = float(proba[class_index])
            except Exception:
                confidence = None

        # 5️⃣ Return structured result
        return {
            "phone_number": data.phone_number,
            "result": label,
            "confidence": confidence,
        }

    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return {"error": f"Prediction failed: {str(e)}"}
