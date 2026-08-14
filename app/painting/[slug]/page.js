// app/painting/[slug]/page.js
import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function PaintingPage({ params }) {
  const { slug } = params;

  const { data: painting, error } = await supabase
    .from('paintings')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Supabase error:', error);
  }
  if (error || !painting) {
    notFound();
  }

  const isAvailable = painting.status === 'AVAILABLE';

  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '1rem' }}>
      <img
        src={painting.image_url}
        alt={painting.name}
        style={{ width: '100%', height: 'auto', borderRadius: 8 }}
      />
      <h1>{painting.name}</h1>
      <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
        {painting.currency} {Number(painting.price).toLocaleString()}
      </p>
      <p>Status: {painting.status}</p>

      <ul>
        {painting.medium && <li>Medium: {painting.medium}</li>}
        {painting.paint_type && <li>Paint type: {painting.paint_type}</li>}
        {painting.material && <li>Material: {painting.material}</li>}
        {painting.size && <li>Size: {painting.size}</li>}
        {painting.year && <li>Year: {painting.year}</li>}
      </ul>

      {painting.description && <p>{painting.description}</p>}

      {isAvailable ? (
        <a
          href={`/book/${painting.slug}`}
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            background: '#222',
            color: '#fff',
            borderRadius: 6,
            textDecoration: 'none',
          }}
        >
          Book This Painting
        </a>
      ) : (
        <button disabled style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
          {painting.status === 'SOLD' ? 'Sold' : 'Reserved'}
        </button>
      )}
    </main>
  );
}