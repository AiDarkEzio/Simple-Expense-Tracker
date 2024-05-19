import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A Simple Expense Tracker",
  description: "Track Your Expences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="flex flex-col justify-between min-h-screen bg-gray-900 text-gray-100">
          <header className="fixed top-0 left-0 w-full bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl font-bold">Expense Tracker</h1>
            </div>
          </header>
          <main className="flex-grow mt-20 mb-16 container mx-auto px-4">
            {children}
          </main>
          <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 shadow-md">
            <div className="container mx-auto px-4 text-center">
              &copy; {new Date().getFullYear()} Subhadra Poshita
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
