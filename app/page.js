// app/page.js
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { adaptPaintings } from '../lib/adaptPainting';
import { PaintingCard } from './components/PaintingCard';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata = {
  title: 'Bint-e-Khalil Art',
  description: 'Original paintings — calligraphy, miniatures, and more, by Bint-e-Khalil Art.',
};


// Supabase Storage (web_images bucket).
const HERO_IMAGE =
  'https://ghixlcqpapfousnmewkg.supabase.co/storage/v1/object/public/web_images/home%20image.png';

export default async function HomePage() {
  const { data: rows, error } = await supabase
    .from('paintings')
    .select('*')
    .eq('status', 'AVAILABLE')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('[home/page.js] Supabase error (home):', error);
  }

  const featured = adaptPaintings(rows);

  return (
    <main>
      <section className="relative">
        <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden bg-ink sm:h-[70vh] lg:h-[78vh]">
          {HERO_IMAGE && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={HERO_IMAGE}
              alt="A calligraphy painting resting on an easel in the artist's studio"
              className="h-full w-full object-cover"
            />
          )}
          <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-page px-5 pb-12 lg:px-10 lg:pb-20">
              <p className="text-[11px] uppercase tracking-widest2 text-paper/70">
                FINE ART & CALLIGRAPHY
              </p>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-light leading-[1.05] text-paper sm:text-6xl lg:text-7xl">
                Bint-e-Khalil Art
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-paper/85 sm:text-lg">
                A collection of calligraphy and paintings — shaped by patience, tradition, and a quiet devotion to detail.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Link
                  href="/collection"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-paper px-8 py-4 text-[12px] uppercase tracking-widest2 text-ink transition-all duration-200 ease-gallery hover:bg-paper-deep hover:shadow-lg hover:-translate-y-0.5"
                >
                  View Collection
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-page px-5 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
            <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">
              Featured paintings
            </h2>
            <Link
              href="/collection"
              className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-widest2 text-ink-soft transition-colors duration-200 hover:text-ink"
            >
              See all works
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-gallery group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((painting) => (
              <PaintingCard key={painting.slug} painting={painting} />
            ))}
          </div>
        </section>
      )}

      <section className="border-y border-line bg-paper-deep">
        <div className="mx-auto max-w-page px-5 py-16 lg:px-10 lg:py-20">
          <p className="max-w-3xl font-display text-2xl font-light italic leading-relaxed text-ink sm:text-3xl">
            “Through every stroke, I try to preserve the beauty of tradition while giving it a 
            voice of its own. For me, art is where heritage, faith, and imagination come together.”
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-widest2 text-ink-faint">
            — Bint-e-Khalil, Artist
          </p>
        </div>
      </section>
    </main>
  );
}