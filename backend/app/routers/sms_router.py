# app/routers/sms_router.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import warnings
import re

warnings.filterwarnings("ignore", category=FutureWarning)
router = APIRouter()

MODEL_NAME = "mrm8488/bert-tiny-finetuned-sms-spam-detection"

try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    print("✅ SMS Spam Detection model loaded successfully.")
    print("Model label mapping:", model.config.id2label)
except Exception as e:
    print(f"❌ Error loading SMS model: {e}")
    tokenizer = None
    model = None

class SMSRequest(BaseModel):
    text: str

# --- small helpers (kept conservative) ---
def looks_like_otp(text: str) -> bool:
    t = text.lower()
    if re.search(r'\b(otp|one-time password|one time password|pin|code)\b', t):
        return True
    if re.search(r'\b\d{4,6}\b', t) and re.search(r'\b(your|is|code|otp|pin)\b', t):
        return True
    return False

def looks_like_meeting(text: str) -> bool:
    """
    Return True for benign scheduling/meeting messages so they are not marked spam.
    Conservative: requires presence of a time/day/meeting keyword and absence of spam keywords.
    """
    t = text.lower()

    # meeting/time keywords
    meeting_kw = ["meeting", "meet", "appointment", "schedule", "call", "pm", "am", "tomorrow", "today", "tonight"]
    if not any(k in t for k in meeting_kw):
        return False

    # spam-indicating keywords — if present, do NOT mark as meeting
    spam_kw = ["free", "win", "won", "claim", "prize", "congratulations", "earn", "offer", "cash", "voucher", "click", "apply now"]
    if any(k in t for k in spam_kw):
        return False

    # also check for suspicious URL or money patterns — if found, don't mark as meeting
    if re.search(r"http\S+|www\.\S+|https\S+", t):
        return False
    if re.search(r"\b(₹|inr|rs\b|rupee|rupees|lakh|crore|dollars|usd|money)\b", t):
        return False

    # looks like meeting/time + not spammy => treat as meeting
    return True

# --- endpoint ---
@router.post("/predict")
async def predict_sms(request: SMSRequest):
    if model is None or tokenizer is None:
        raise HTTPException(status_code=500, detail="Model or tokenizer not loaded.")
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    try:
        raw = request.text
        inputs = tokenizer(raw, return_tensors="pt", truncation=True, padding=True)
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            probs = torch.softmax(logits, dim=1)[0]
            predicted_class = torch.argmax(probs).item()
            confidence = probs[predicted_class].item()

        # Your model mapping: LABEL_0 = Spam, LABEL_1 = Ham
        label = "Ham" if predicted_class == 1 else "Spam"

        # OTP heuristic override (conservative)
        if looks_like_otp(raw):
            label = "Ham"

        # Meeting/schedule heuristic override (conservative)
        if looks_like_meeting(raw):
            label = "Ham"

        return {
            "text": raw,
            "prediction": label,
            "confidence": round(confidence * 100, 2)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")






