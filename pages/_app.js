import '../styles/globals.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Intextify - Smart AI Tools</title>
        <meta name="description" content="AI-powered tools for paraphrasing, summarizing, and plagiarism checking." />
        <meta property="og:title" content="Intextify" />
        <meta property="og:description" content="Paraphrasing, summarizing, plagiarism checking with AI." />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="font-bold text-xl text-blue-600">Intextify</h1>
          <div className="space-x-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/paraphrasing" className="hover:underline">Paraphrasing</a>
            <a href="/summarizing" className="hover:underline">Summarizing</a>
            <a href="/plagiarism" className="hover:underline">Plagiarism</a>
            <a href="/chat" className="hover:underline">ChatGPT</a>
          </div>
        </nav>
        <main className="flex-1 p-6 container mx-auto">
          <Component {...pageProps} />
        </main>
        <footer className="bg-gray-100 text-center p-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Intextify. Built with AI.</p>
        </footer>
      </div>
    </>
  );
}
