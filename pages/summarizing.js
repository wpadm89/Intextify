import { useState } from "react";
import QuotaBar from "../components/QuotaBar";

export default function Summarizing() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSummarize() {
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
      const res = await fetch("/api/summarize", {
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
      setResult(data.output);
    } catch (err) {
      setError("❌ Something went wrong, try again.");
    }
    setLoading(false);
  }

  function copyResult() {
    navigator.clipboard.writeText(result);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Summarizing Tool</h2>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="5"
        placeholder="Enter text to summarize..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSummarize}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Summarize"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Summary:</h3>
          <QuotaBar quota={quota} />
          <button
            onClick={copyResult}
            className="mt-2 bg-gray-300 px-2 py-1 rounded text-sm"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
