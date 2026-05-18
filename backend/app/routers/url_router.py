from fastapi import APIRouter
from pydantic import BaseModel
import os
import sys
import pandas as pd

router = APIRouter()

# ---------------------------
# Custom function used during training
# ---------------------------
def extract_numeric_features(urls):
    suspicious_tlds = ['xyz', 'top', 'online', 'win', 'club', 'site', 'info']
    suspicious_keywords = ['free', 'offer', 'login', 'secure', 'update', 'bonus', 'cash']
    features = []
    for url in urls:
        url_clean = url.lower().replace("http://", "").replace("https://", "").replace("www.", "").strip("/")
        num_hyphens = url_clean.count('-')
        num_digits = sum(c.isdigit() for c in url_clean)
        tld = url_clean.split('.')[-1]
        suspicious_tld = int(tld in suspicious_tlds)
        suspicious_keywords_count = sum(1 for kw in suspicious_keywords if kw in url_clean)
        features.append([num_hyphens, num_digits, suspicious_tld, suspicious_keywords_count])
    return pd.DataFrame(features, columns=['num_hyphens', 'num_digits', 'suspicious_tld', 'suspicious_keywords'])

sys.modules['__main__'].extract_numeric_features = extract_numeric_features

SAFE_DOMAINS = [
    "google.com", "github.com", "wikipedia.org", "stackoverflow.com",
    "microsoft.com", "apple.com", "linkedin.com", "amazon.com",
    "facebook.com", "twitter.com", "youtube.com", "reddit.com",
    "openai.com", "gitlab.com", "npmjs.com", "medium.com",
    "quora.com", "gmail.com", "icloud.com", "bing.com"
]

# ---------------------------
# Lazy model loader
# ---------------------------
_model = None

def get_model():
    global _model
    if _model is None:
        from joblib import load
        model_path = os.path.join(os.path.dirname(__file__), "..", "..", "ml_models", "urlspam.pkl")
        try:
            _model = load(model_path)
            print("✅ Pipeline model loaded successfully:", type(_model))
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            _model = None
    return _model

class URLInput(BaseModel):
    url: str

@router.post("/predict")
def predict(data: URLInput):
    model = get_model()

    if model is None:
        return {"error": "Model not loaded."}

    url = data.url.strip().lower().replace("http://", "").replace("https://", "").replace("www.", "")

    for safe_domain in SAFE_DOMAINS:
        if safe_domain in url:
            return {
                "url": data.url,
                "result": "Safe",
                "confidence": 1.0
            }

    try:
        probs = model.predict_proba([data.url])[0]
        classes = list(model.classes_)
        prob_spam = float(probs[classes.index(1)])
        result = "Malicious" if prob_spam >= 0.5 else "Safe"
        return {
            "url": data.url,
            "result": result,
            "confidence": round(prob_spam, 4)
        }
    except Exception as e:
        return {"error": f"Prediction failed: {e}"}
