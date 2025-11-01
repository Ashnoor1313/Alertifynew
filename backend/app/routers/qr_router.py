import os
import numpy as np
from fastapi import APIRouter, UploadFile, File, HTTPException
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

router = APIRouter()

# ===========================
# Load the trained QR model
# ===========================
model_path = os.path.join(
    os.path.dirname(__file__), "..", "..", "ml_models", "best_qr_model.h5"
)

try:
    model = load_model(model_path)
    print(f"✅ Loaded QR model from {model_path}")
except Exception as e:
    print(f"❌ Warning: Could not load QR model: {e}")
    model = None


@router.post("/")
async def predict_qr(file: UploadFile = File(...)):
    """
    Accepts a QR code image and predicts whether it is
    Malicious or Benign.
    """
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded on server")

    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # Save uploaded image temporarily
    temp_path = "temp_qr.png"
    contents = await file.read()
    with open(temp_path, "wb") as f:
        f.write(contents)

    # Preprocess image (must match training config)
    img = image.load_img(temp_path, target_size=(64, 64))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    # Run prediction
    prediction = model.predict(img_array)[0][0]
    label = "Malicious" if prediction > 0.5 else "Benign"
    confidence = float(prediction if label == "Malicious" else 1 - prediction)

    # Cleanup temp file
    os.remove(temp_path)

    return {
        "filename": file.filename,
        "prediction": label,
        "confidence": confidence,
    }
