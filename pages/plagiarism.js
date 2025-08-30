import { useState } from "react";
import QuotaBar from "../components/QuotaBar";

export default function Plagiarism() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheck() {
    setError("");
    if (!text.trim()) {
      setError("⚠️ Please enter some text.");
      return;
    }
    if (text.length > 2000) {
      setError("⚠️ Max 2000 characters allowed.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/plagiarism", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.status === 429) {
        setError("⚠️ Too many requests, slow down.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("❌ Something went wrong, try again.");
    }
    setLoading(false);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Plagiarism Checker</h2>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="5"
        placeholder="Enter text to check for plagiarism..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleCheck}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Checking..." : "Check Plagiarism"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Result:</h3>
          {result.plagiarism ? (
            <p className="text-red-600">
              ⚠️ Possible plagiarism detected. Score:{" "}
              {result.similarityScore.toFixed(2)} <br />
              Matched Text: "{result.matchedText}"
            </p>
          ) : (
            <p className="text-green-600">✅ No plagiarism detected.</p>
          )}
        </div>
      )}
    </div>
  );
}
