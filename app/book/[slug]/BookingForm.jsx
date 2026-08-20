// app/book/[slug]/BookingForm.jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LockIcon } from 'lucide-react';
import { Field } from '../../components/Field';

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

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return; // duplicate-submission guard, unchanged

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
    <form onSubmit={handleSubmit} className="mt-10 max-w-xl space-y-8">
      <Field id="name" label="Your name" required value={form.name} onChange={set('name')} />
      <Field
        id="phone"
        label="Phone / WhatsApp"
        type="tel"
        required
        placeholder="03xx xxxxxxx"
        value={form.phone}
        onChange={set('phone')}
      />
      <Field
        id="email"
        label="Email"
        type="email"
        hint="Optional — only if you would prefer written confirmation."
        value={form.email}
        onChange={set('email')}
      />
      <Field
        id="address"
        label="Delivery address"
        required
        value={form.address}
        onChange={set('address')}
      />
      <Field id="city" label="City" required value={form.city} onChange={set('city')} />
      <Field
        id="notes"
        label="Notes or questions"
        rows={4}
        placeholder="Anything the artist should know — a delivery date, framing, or a question about the piece."
        value={form.notes}
        onChange={set('notes')}
      />

      {error && <p className="text-sm text-clay">{error}</p>}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-sm bg-ink px-8 py-4 text-[12px] uppercase tracking-widest2 text-paper transition-all duration-200 ease-gallery hover:bg-ink-soft hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-ink-faint disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto"
        >
          {submitting ? 'Sending…' : 'Send booking request'}
        </button>
        <p className="mt-4 flex items-center gap-2 text-xs text-ink-faint">
          <LockIcon className="h-3.5 w-3.5" />
          No payment is taken on this site.
        </p>
      </div>
    </form>
  );
}