import { useState } from "react";

export default function Paraphrasing() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  async function handleParaphrase() {
    const res = await fetch("/api/paraphrase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setResult(data.output);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Paraphrasing Tool</h2>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="5"
        placeholder="Enter text to paraphrase..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleParaphrase}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Paraphrase
      </button>
      {result && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
