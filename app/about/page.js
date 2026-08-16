// app/about/page.js
import InquiryForm from './InquiryForm';

export const metadata = {
  title: 'About & Contact — Bint-e-Khalil Art',
  description: 'The story behind Bint-e-Khalil Art, and how to get in touch.',
};

const WHATSAPP_NUMBER = '923347970556'; // wa.me format: no +, no spaces
const CONTACT_EMAIL = 'bintekhalil.art@gmail.com';

export default function AboutPage() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi! I have a question about a painting from Bint-e-Khalil Art.'
  )}`;

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <h1 style={{ marginBottom: '0.25rem' }}>About Bint-e-Khalil Art</h1>
      <p style={{ color: '#555', lineHeight: 1.6 }}>
        Bint-e-Khalil Art creates original, one-of-a-kind paintings — calligraphy,
        miniatures, and related work — each piece made by hand, not reproduced.
        Every painting on this site is a single physical original: once it's sold,
        it's gone.
      </p>

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e0d8' }} />

      <h2 style={{ fontSize: '1.1rem' }}>Get in touch</h2>
      <p style={{ color: '#555' }}>
        Have a question about a painting, sizing, or availability? Reach out directly,
        or send a message below.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0 2rem' }}>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '0.6rem 1.1rem',
            background: '#25D366',
            color: '#fff',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          WhatsApp: +92 334 7970556
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          style={{
            padding: '0.6rem 1.1rem',
            background: '#fff',
            border: '1px solid #ccc',
            color: '#333',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          {CONTACT_EMAIL}
        </a>
      </div>

      <h2 style={{ fontSize: '1.1rem' }}>Send a message</h2>
      <InquiryForm />
    </main>
  );
}