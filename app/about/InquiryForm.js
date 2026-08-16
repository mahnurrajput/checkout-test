// app/about/InquiryForm.js
'use client';

import { useState } from 'react';

export default function InquiryForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { ok: true } | { ok: false, error: string }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return; // duplicate-submission guard, same pattern as BookingForm

    setSubmitting(true);
    setResult(null);

    const payload = { email, phone, message };
    console.log('[InquiryForm] Submitting:', payload);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('[InquiryForm] Response:', res.status, data);

      if (!res.ok) {
        setResult({ ok: false, error: data.error || 'Something went wrong. Please try again.' });
        setSubmitting(false);
        return;
      }

      setResult({ ok: true });
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error('[InquiryForm] Network/unexpected error:', err);
      setResult({ ok: false, error: 'Network error. Please check your connection and try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.ok) {
    return (
      <div
        style={{
          padding: '1rem',
          background: '#eef8ee',
          border: '1px solid #bfe3bf',
          borderRadius: 8,
          color: '#2a5a2a',
        }}
      >
        Thanks — your message has been received. We'll get back to you soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', maxWidth: 480 }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.9rem' }}>
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ padding: '0.55rem 0.7rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '0.95rem' }}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.9rem' }}>
        Contact Number
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+92 3XX XXXXXXX"
          style={{ padding: '0.55rem 0.7rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '0.95rem' }}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.9rem' }}>
        Message
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What would you like to ask?"
          style={{ padding: '0.55rem 0.7rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '0.95rem', resize: 'vertical' }}
        />
      </label>

      {result?.ok === false && (
        <div style={{ color: '#b33', fontSize: '0.85rem' }}>{result.error}</div>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: '0.7rem 1rem',
          borderRadius: 6,
          border: 'none',
          background: submitting ? '#999' : '#333',
          color: '#fff',
          fontWeight: 600,
          cursor: submitting ? 'not-allowed' : 'pointer',
        }}
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}