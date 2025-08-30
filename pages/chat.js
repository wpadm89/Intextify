export default function Chat() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">ChatGPT Assistant</h2>
      <iframe
        src="https://chat.openai.com"
        className="w-full h-[600px] border rounded"
        title="ChatGPT"
      />
    </div>
  );
}
