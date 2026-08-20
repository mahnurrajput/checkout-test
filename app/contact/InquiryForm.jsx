// app/contact/InquiryForm.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckIcon } from 'lucide-react';
import { Field } from '../components/Field';

export default function InquiryForm() {
  const [form, setForm] = useState({ email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { ok: true } | { ok: false, error: string }

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return; // duplicate-submission guard, unchanged

    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({ ok: false, error: data.error || 'Something went wrong. Please try again.' });
        setSubmitting(false);
        return;
      }

      setResult({ ok: true });
    } catch (err) {
      console.error('[InquiryForm] Network/unexpected error:', err);
      setResult({ ok: false, error: 'Network error. Please check your connection and try again.' });
      setSubmitting(false);
    }
  }

  if (result?.ok) {
    return (
      <div className="border border-line bg-paper-deep px-6 py-12 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold text-gold">
          <CheckIcon className="h-5 w-5" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-light text-ink">
          Thanks — your message has been received
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          The artist will reply to {form.email || 'your email'} shortly. For anything
          urgent, WhatsApp is faster.
        </p>
        <Link
          href="/collection"
          className="mt-8 inline-block border border-ink px-7 py-3 text-[12px] uppercase tracking-widest2 text-ink transition-colors duration-200 ease-gallery hover:bg-ink hover:text-paper"
        >
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Field
        id="contact-email"
        label="Email"
        type="email"
        required
        value={form.email}
        onChange={set('email')}
      />
      <Field
        id="contact-phone"
        label="Contact Number"
        type="tel"
        value={form.phone}
        onChange={set('phone')}
      />
      <Field
        id="contact-message"
        label="Message"
        required
        rows={5}
        value={form.message}
        onChange={set('message')}
      />

      {result?.ok === false && <p className="text-sm text-clay">{result.error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-sm bg-ink px-8 py-4 text-[12px] uppercase tracking-widest2 text-paper transition-all duration-200 ease-gallery hover:bg-ink-soft hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-ink-faint disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto"
      >
        {submitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}