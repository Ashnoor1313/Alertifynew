import React, { useState } from "react";

export default function SmsPage() {
  const [sms, setSms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!sms.trim()) return alert("Please enter an SMS message");

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/sms/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: sms }), // ✅ match backend key
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        alert(data.detail || "Prediction failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error connecting to the backend API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-green-900 flex items-center justify-center px-4">
      <div className="bg-black/40 backdrop-blur-lg border border-emerald-700 p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-emerald-400 mb-2">
          💬 SMS Spam Detection
        </h1>
        <p className="text-gray-300 text-sm mb-6">
          Enter an SMS message below to check if it’s{" "}
          <span className="text-emerald-300 font-semibold">Spam or Safe</span>.
        </p>

        {/* Input Section */}
        <textarea
          value={sms}
          onChange={(e) => setSms(e.target.value)}
          placeholder="Type your SMS message here..."
          className="w-full px-4 py-3 bg-black/50 border border-emerald-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none h-32"
        />

        <button
          onClick={handlePredict}
          disabled={loading}
          className={`mt-4 px-6 py-2 rounded-full font-semibold transition-all shadow-md ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600"
          }`}
        >
          {loading ? "Analyzing..." : "Check SMS"}
        </button>

        {/* Result Section */}
        {result && (
          <div className="mt-8 bg-black/40 rounded-2xl p-5 text-left shadow-inner border border-emerald-700">
            <h3 className="text-lg font-semibold text-emerald-300 mb-2">
              🧠 ML Model Result
            </h3>
            <p className="text-gray-300 text-sm">
              <b>SMS:</b> {result.text}
            </p>
            <p className="text-gray-300 text-sm mt-2">
              <b>Prediction:</b>{" "}
              <span
                className={
                  result.prediction === "Spam"
                    ? "text-red-500 font-semibold"
                    : "text-emerald-400 font-semibold"
                }
              >
                {result.prediction === "Spam"
                  ? "Spam / Unsafe"
                  : "Safe / Trusted"}
              </span>
            </p>
            <p className="text-gray-300 text-sm mt-1">
              <b>Confidence:</b> {result.confidence?.toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

