const isProd = import.meta.env.MODE === "production";

export const FASTAPI_URL = isProd
  ? "https://alertifynew.onrender.com"
  : "http://127.0.0.1:8001";

export const EXPRESS_URL = isProd
  ? "https://your-express-service.onrender.com"  // ← update after deploying Express
  : "http://127.0.0.1:5000";
