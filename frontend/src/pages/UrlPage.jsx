import React, { useState } from "react";

export default function UrlPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!url.trim()) return alert("Please enter a valid URL");

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/url/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-green-900 flex items-center justify-center px-4">
      <div className="bg-black/40 backdrop-blur-lg border border-emerald-700 p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-emerald-400 mb-2">
          🌐 URL Spam Detection
        </h1>
        <p className="text-gray-300 text-sm mb-6">
          Enter a website link to check if it’s{" "}
          <span className="text-emerald-300 font-semibold">safe or suspicious</span>.
        </p>

        {/* Input Section */}
        <div className="flex flex-col items-center gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g. https://example.com)"
            className="w-full px-4 py-2 bg-black/50 border border-emerald-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <button
            onClick={handlePredict}
            disabled={loading}
            className={`mt-3 px-6 py-2 rounded-full font-semibold transition-all shadow-md ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {loading ? "Analyzing..." : "Check URL"}
          </button>
        </div>

        {/* Result Box */}
        {result && !result.error && (
          <div className="mt-8 bg-black/40 rounded-2xl p-5 text-left shadow-inner border border-emerald-700">
            <h3 className="text-lg font-semibold text-emerald-300 mb-2">
              🧠 ML Model Result
            </h3>
            <p className="text-gray-300 text-sm">
              <b>URL:</b> {result.url}
            </p>
            <p
              className={`text-sm mt-1 font-semibold ${
                result.result === "Malicious" ? "text-red-500" : "text-emerald-400"
              }`}
            >
              <b>Result:</b> {result.result}
            </p>
          </div>
        )}

        {result && result.error && (
          <div className="mt-8 text-red-500 font-semibold">
            ❌ {result.error}
          </div>
        )}
      </div>
    </div>
  );
}

