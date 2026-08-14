// app/book/[slug]/BookingForm.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const inputStyle = {
  width: '100%',
  padding: '0.6rem',
  marginTop: 4,
  marginBottom: 14,
  border: '1px solid #ccc',
  borderRadius: 6,
  fontSize: '1rem',
  boxSizing: 'border-box',
};

const labelStyle = { fontSize: 14, fontWeight: 600 };

export default function BookingForm({ slug }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return; // duplicate-submission guard

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, ...form }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }

      router.push(`/order-confirmation?order=${encodeURIComponent(data.orderNumber)}`);
    } catch (err) {
      console.error(err);
      setError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={labelStyle}>
        Name *
        <input style={inputStyle} required value={form.name} onChange={update('name')} />
      </label>

      <label style={labelStyle}>
        Phone *
        <input style={inputStyle} required value={form.phone} onChange={update('phone')} />
      </label>

      <label style={labelStyle}>
        Email
        <input style={inputStyle} type="email" value={form.email} onChange={update('email')} />
      </label>

      <label style={labelStyle}>
        Address
        <input style={inputStyle} value={form.address} onChange={update('address')} />
      </label>

      <label style={labelStyle}>
        City
        <input style={inputStyle} value={form.city} onChange={update('city')} />
      </label>

      <label style={labelStyle}>
        Notes or questions
        <textarea
          style={{ ...inputStyle, minHeight: 80, fontFamily: 'inherit' }}
          value={form.notes}
          onChange={update('notes')}
          placeholder="e.g. still available? can you customize size? interested in another painting too?"
        />
      </label>

      {error && (
        <p style={{ color: '#b33', fontSize: 14, marginTop: -6, marginBottom: 14 }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          width: '100%',
          background: submitting ? '#999' : '#222',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: submitting ? 'not-allowed' : 'pointer',
        }}
      >
        {submitting ? 'Submitting…' : 'Book This Painting'}
      </button>
    </form>
  );
}