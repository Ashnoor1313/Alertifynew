import React, { useState } from "react";
import axios from "axios";
import jsQR from "jsqr";
import toast, { Toaster } from "react-hot-toast";

export default function QrScanner() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  // ✅ Check if uploaded image contains a QR code
  const validateQrImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0, img.width, img.height);
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);
          resolve(!!code); // true if QR detected
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a QR image first!");
      return;
    }

    setLoading(true);
    const isQr = await validateQrImage(file);
    if (!isQr) {
      setLoading(false);
      toast.error("❌ Invalid image! Please upload a valid QR code.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/qr/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      toast.success("✅ QR code successfully analyzed!");
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Error uploading QR code!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-green-900 flex items-center justify-center px-4 relative">
      {/* Toast notification container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-black/40 backdrop-blur-lg text-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-emerald-600">
        <h2 className="text-2xl font-bold text-center text-emerald-400 mb-2">
          🔍 QR Code Spam Detection
        </h2>
        <p className="text-gray-300 text-sm text-center mb-6">
          Upload a QR code image to detect if it’s{" "}
          <span className="text-emerald-300 font-semibold">safe or malicious</span>.
        </p>

        <div className="flex flex-col items-center gap-3">
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            Choose QR Image
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {file && (
            <p className="text-sm text-gray-400">
              Selected: <span className="text-white">{file.name}</span>
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`mt-4 px-6 py-2 rounded-full font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-black/40 rounded-2xl p-5 text-left shadow-inner border border-emerald-700">
            <h3 className="text-lg font-semibold text-emerald-300 mb-2">
              🧠 ML Model Result
            </h3>
            <p className="text-gray-300 text-sm">
              <b>File:</b> {result.filename}
            </p>
            <p className="text-gray-300 text-sm mt-1">
              <b>Prediction:</b>{" "}
              <span
                className={
                  result.prediction === "Malicious"
                    ? "text-red-500 font-semibold"
                    : "text-emerald-400 font-semibold"
                }
              >
                {result.prediction}
              </span>
            </p>
            <p className="text-gray-300 text-sm mt-1">
              <b>Confidence:</b> {(result.confidence * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
