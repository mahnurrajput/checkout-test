// app/page.js
import Link from 'next/link';
import { supabase } from '../lib/supabase';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata = {
  title: 'Bint-e-Khalil Art',
  description: 'Original paintings — calligraphy, miniatures, and more, by Bint-e-Khalil Art.',
};

export default async function HomePage() {
  const { data: paintings, error } = await supabase
    .from('paintings')
    .select('*')
    .eq('status', 'AVAILABLE')
    .order('created_at', { ascending: false })
    .limit(3);

  // --- DEBUG LOGGING ---
  console.log('[home/page.js] Supabase query complete');
  console.log('[home/page.js] error:', error);
  console.log('[home/page.js] featured paintings returned:', paintings ? paintings.length : 0);
  // ----------------------

  if (error) {
    console.error('[home/page.js] Supabase error (home):', error);
  }

  const featured = paintings || [];

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <section style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Bint-e-Khalil Art</h1>
        <p style={{ color: '#666', maxWidth: 520, margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          Original, one-of-a-kind paintings — calligraphy, miniatures, and related work.
          Each piece is hand-made and unique; once sold, it's gone.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/collection"
            style={{
              padding: '0.7rem 1.4rem',
              background: '#333',
              color: '#fff',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            View Collection
          </Link>
          <Link
            href="/about"
            style={{
              padding: '0.7rem 1.4rem',
              background: '#fff',
              border: '1px solid #ccc',
              color: '#333',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            About & Contact
          </Link>
        </div>
      </section>

      {featured.length > 0 && (
        <section style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Featured Paintings</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/painting/${p.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  border: '1px solid #e5e0d8',
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#fff',
                  display: 'block',
                }}
              >
                <div style={{ aspectRatio: '1 / 1', background: '#f0ede6' }}>
                  {p.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image_url}
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.95rem', marginTop: 4 }}>
                    {p.currency} {Number(p.price).toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}