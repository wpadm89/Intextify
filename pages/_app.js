import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/paraphrasing', label: 'Paraphrasing' },
    { href: '/summarizing', label: 'Summarizing' },
    { href: '/plagiarism', label: 'Plagiarism' },
    { href: '/chat', label: 'ChatGPT' },
  ];

  return (
    <>
      <Head>
        <title>Intextify - Smart AI Tools</title>
        <meta
          name="description"
          content="AI-powered tools for paraphrasing, summarizing, plagiarism checking, and ChatGPT assistant."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="font-bold text-xl text-blue-600">Intextify</h1>
          <div className="space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${
                  router.pathname === link.href
                    ? 'text-blue-600 font-semibold'
                    : 'hover:underline'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
        <main className="flex-1 p-6 container mx-auto">
          <Component {...pageProps} />
        </main>
        <footer className="bg-gray-100 text-center p-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Intextify. Built with AI.
          </p>
        </footer>
      </div>
    </>
  );
}
