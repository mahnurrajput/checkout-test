// app/collection/page.js
import { supabase } from '../../lib/supabase';
import CollectionClient from './CollectionClient';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata = {
  title: 'Collection — Bint-e-Khalil Art',
  description: 'Browse original paintings by Bint-e-Khalil Art — calligraphy, miniatures, and more.',
};

export default async function CollectionPage() {
  const { data: paintings, error } = await supabase
    .from('paintings')
    .select('*')
    .neq('status', 'HIDDEN')
    .order('created_at', { ascending: false });

  // --- DEBUG LOGGING (server-side, visible in your terminal / Vercel logs) ---
  console.log('[collection/page.js] Supabase query complete');
  console.log('[collection/page.js] error:', error);
  console.log('[collection/page.js] paintings returned:', paintings ? paintings.length : 0);
  if (paintings && paintings.length > 0) {
    console.log(
      '[collection/page.js] statuses:',
      paintings.map((p) => `${p.slug}:${p.status}`)
    );
  }
  // ---------------------------------------------------------------------------

  if (error) {
    console.error('[collection/page.js] Supabase error (collection):', error);
  }

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 1rem' }}>
      <h1 style={{ marginBottom: '0.25rem' }}>Collection</h1>
      <p style={{ color: '#666', marginTop: 0 }}>
        Original paintings — calligraphy, miniatures, and more.
      </p>
      <CollectionClient paintings={paintings || []} />
    </main>
  );
}