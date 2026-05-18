import React, { useState } from "react";
import { FASTAPI_URL } from "../utils/config";

export default function PhonePage() {
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!phone.trim()) return alert("Please enter a valid phone number");
    try {
      setLoading(true);
      const response = await fetch(`${FASTAPI_URL}/phone/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phone }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error connecting to API");
    } finally {
      setLoading(false);
    }
  };

  const getLabelColor = (label) => {
    if (!label) return "text-gray-300";
    return label.toLowerCase() === "spam"
      ? "text-red-500 font-semibold"
      : "text-emerald-400 font-semibold";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-green-900 flex items-center justify-center px-4">
      <div className="bg-black/40 backdrop-blur-lg border border-emerald-700 p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-emerald-400 mb-2">📞 Phone Spam Detection</h1>
        <p className="text-gray-300 text-sm mb-6">
          Enter a phone number to check if it's{" "}
          <span className="text-emerald-300 font-semibold">safe or spam</span>.
        </p>
        <div className="flex flex-col items-center gap-3">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone Number (e.g. +91XXXXXXXXXX)"
            className="w-full px-4 py-2 bg-black/50 border border-emerald-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            onClick={handlePredict}
            disabled={loading}
            className={`mt-3 px-6 py-2 rounded-full font-semibold transition-all shadow-md ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {loading ? "Analyzing..." : "Check Number"}
          </button>
        </div>
        {result && !result.error && (
          <div className="mt-8 bg-black/40 rounded-2xl p-5 text-left shadow-inner border border-emerald-700">
            <h3 className="text-lg font-semibold text-emerald-300 mb-2">🧠 ML Model Result</h3>
            <p className="text-gray-300 text-sm mt-1"><b>Phone Number:</b> {result.phone_number}</p>
            <p className="text-gray-300 text-sm mt-1">
              <b>Prediction:</b>{" "}
              <span className={getLabelColor(result.result)}>
                {result.result === "Spam" ? "🚫 Spam / Unsafe" : "✅ Genuine / Safe"}
              </span>
            </p>
            {result.confidence !== null && (
              <p className="text-gray-300 text-sm mt-1">
                <b>Confidence:</b> {(result.confidence * 100).toFixed(2)}%
              </p>
            )}
          </div>
        )}
        {result?.error && (
          <div className="mt-8 text-red-500 font-semibold">❌ {result.error}</div>
        )}
      </div>
    </div>
  );
}
