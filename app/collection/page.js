// app/collection/page.js
import { supabase } from '../../lib/supabase';
import { adaptPaintings } from '../../lib/adaptPainting';
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

  if (error) {
    console.error('[collection/page.js] Supabase error (collection):', error);
  }

  const adapted = adaptPaintings(paintings);

  return <CollectionClient paintings={adapted} />;
}