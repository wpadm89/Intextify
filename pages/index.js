export default function Home() {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">Smart AI Tools</h2>
      <p className="text-lg mb-6">
        Paraphrase, Summarize, and Check Plagiarism with the power of AI.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <a href="/paraphrasing" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Paraphrasing</h3>
          <p>Rephrase text with AI precision.</p>
        </a>
        <a href="/summarizing" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Summarizing</h3>
          <p>Get concise summaries instantly.</p>
        </a>
        <a href="/plagiarism" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">Plagiarism</h3>
          <p>Ensure originality in your writing.</p>
        </a>
      </div>
    </div>
  );
}
