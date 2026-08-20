// app/layout.js
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

// Self-hosted via next/font — replaces the Google Fonts @import url(...)
// from the Magic Patterns export. Weights match what was requested there.
const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sansFont = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Bint-e-Khalil Art',
  description: 'Original paintings — calligraphy, miniatures, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body className="flex min-h-screen w-full flex-col bg-paper font-sans">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}