from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)


from app.routers import upi_router, phone_router, qr_router, sms_router, url_router

app = FastAPI(title="Sakhi Fraud Detection API")

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(upi_router.router, prefix="/upi", tags=["UPI Fraud Detection"])
app.include_router(phone_router.router, prefix="/phone", tags=["Phone Spam Detection"])
app.include_router(qr_router.router, prefix="/qr", tags=["QR Spam Detection"])
app.include_router(sms_router.router, prefix="/sms", tags=["SMS Spam Detection"])
app.include_router(url_router.router, prefix="/url", tags=["URL Spam Detection"])

@app.get("/")
def root():
    return {"message": "Welcome to Sakhi Fraud Detection API"}
