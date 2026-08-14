// app/book/[slug]/page.js
import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';
import BookingForm from './BookingForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function BookPage({ params }) {
  const { slug } = params;

  const { data: painting, error } = await supabase
    .from('paintings')
    .select('id, slug, name, price, currency, status, image_url')
    .eq('slug', slug)
    .single();

  if (error || !painting) {
    notFound();
  }

  if (painting.status !== 'AVAILABLE') {
    return (
      <main style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
        <h1>Not available</h1>
        <p>
          Sorry, &ldquo;{painting.name}&rdquo; is currently{' '}
          {painting.status === 'SOLD' ? 'sold' : 'reserved'} and can&apos;t be booked.
        </p>
        <a href={`/painting/${painting.slug}`}>&larr; Back to painting</a>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      <a href={`/painting/${painting.slug}`} style={{ fontSize: 14 }}>
        &larr; Back to painting
      </a>
      <h1 style={{ marginTop: 8 }}>Book &ldquo;{painting.name}&rdquo;</h1>
      <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
        {painting.currency} {Number(painting.price).toLocaleString()}
      </p>
      <p style={{ color: '#666', fontSize: 14 }}>
        Submitting this form sends a booking request — not a confirmed sale.
        We&apos;ll follow up by phone/WhatsApp to confirm availability, payment, and delivery.
      </p>

      <BookingForm slug={painting.slug} />
    </main>
  );
}