import os
import numpy as np
from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter()

# ---------------------------
# Lazy model loader
# ---------------------------
_model = None

def get_model():
    global _model
    if _model is None:
        from tensorflow.keras.models import load_model
        model_path = os.path.join(
            os.path.dirname(__file__), "..", "..", "ml_models", "best_qr_model.h5"
        )
        try:
            _model = load_model(model_path)
            print(f"✅ Loaded QR model from {model_path}")
        except Exception as e:
            print(f"❌ Warning: Could not load QR model: {e}")
            _model = None
    return _model

@router.post("/")
async def predict_qr(file: UploadFile = File(...)):
    from tensorflow.keras.preprocessing import image

    model = get_model()

    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded on server")

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    temp_path = "temp_qr.png"
    contents = await file.read()
    with open(temp_path, "wb") as f:
        f.write(contents)

    try:
        img = image.load_img(temp_path, target_size=(64, 64))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0

        prediction = model.predict(img_array)[0][0]
        label = "Malicious" if prediction > 0.5 else "Benign"
        confidence = float(prediction if label == "Malicious" else 1 - prediction)

        return {
            "filename": file.filename,
            "prediction": label,
            "confidence": confidence,
        }
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
