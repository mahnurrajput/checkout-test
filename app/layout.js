// app/layout.js
import NavBar from './NavBar';

export const metadata = {
  title: "Bint-e-Khalil Art",
  description: "Original paintings — calligraphy, miniatures, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, background: "#faf7f2" }}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}