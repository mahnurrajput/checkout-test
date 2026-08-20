// app/painting/[slug]/page.js
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon, MessageCircleIcon } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';
import { adaptPainting, adaptPaintings } from '../../../lib/adaptPainting';
import { discountPercent } from '../../../lib/format';
import { contact } from '../../../lib/contact';
import { PriceTag } from '../../components/PriceTag';
import { priceInWords } from '../../../lib/priceInWords';
import { PaintingCard } from '../../components/PaintingCard';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function generateMetadata({ params }) {
  const { data } = await supabase
    .from('paintings')
    .select('name, description, image_url')
    .eq('slug', params.slug)
    .single();

  if (!data) return {};

  return {
    title: `${data.name} — Bint-e-Khalil Art`,
    description: data.description || 'An original painting by Bint-e-Khalil Art.',
    openGraph: {
      title: data.name,
      description: data.description || undefined,
      images: data.image_url ? [data.image_url] : undefined,
    },
  };
}

export default async function PaintingPage({ params }) {
  const { slug } = params;

  const { data: row, error } = await supabase
    .from('paintings')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !row) {
    notFound();
  }

  const painting = adaptPainting(row);
  const available = painting.availability === 'AVAILABLE';
  const percentOff = discountPercent(painting.price, painting.oldPrice);
  const priceWords = priceInWords(painting.price, painting.currency);

  const details = [
    ['Medium', painting.medium],
    ['Paint', painting.paintType],
    ['Material', painting.material],
    ['Size', painting.size],
  ].filter(([, value]) => Boolean(value));

  // "Also in the studio" — a few other paintings, excluding this one and
  // any HIDDEN pieces. Small catalog (20+), so fetching all and slicing
  // client-side-ish here is fine — same approach as the Collection page.
  const { data: otherRows } = await supabase
    .from('paintings')
    .select('*')
    .neq('slug', slug)
    .neq('status', 'HIDDEN')
    .order('created_at', { ascending: false })
    .limit(3);

  const others = adaptPaintings(otherRows);

  return (
    <main className="mx-auto max-w-page px-5 pt-4 lg:px-10 lg:pt-6">
      <Link
        href="/collection"
        className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-ink-faint transition-colors duration-200 hover:text-ink"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-gallery group-hover:-translate-x-1" />
        Collection
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-10 lg:mt-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <figure className="bg-paper-deep p-4 sm:p-8 lg:p-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={painting.image}
              alt={painting.name}
              className="mx-auto w-full max-h-[70vh] object-contain"
            />
          </figure>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            {!available && (
              <div
                className={[
                  'mb-6 flex items-center gap-3 px-4 py-3',
                  painting.availability === 'SOLD' ? 'bg-ink text-paper' : 'bg-clay text-paper',
                ].join(' ')}
              >
                <span className="text-[11px] uppercase tracking-widest2">
                  {painting.availability === 'SOLD' ? 'Sold' : 'Reserved'}
                </span>
                <span className="h-3 w-px bg-paper/40" aria-hidden="true" />
                <span className="text-[13px]">
                  {painting.availability === 'SOLD'
                    ? 'This original has found its home.'
                    : 'Held for another collector this week.'}
                </span>
              </div>
            )}

            <h1 className="font-display text-3xl font-light leading-[1.15] text-ink sm:text-5xl">
              {painting.name}
            </h1>
            <PriceTag
              price={painting.price}
              oldPrice={painting.oldPrice}
              size="detail"
              className="mt-5"
            />
            {percentOff !== null && (
              <p className="mt-2 text-xs text-ink-faint">
                Studio price this month — {percentOff}% below the original asking price.
              </p>
            )}
            {priceWords && (
              <p className="mt-2 text-xs italic text-ink-faint">{priceWords} only</p>
            )}

            <div className="mt-8">
              {available ? (
                <Link
                  href={`/book/${painting.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ink px-8 py-4 text-[12px] uppercase tracking-widest2 text-paper transition-all duration-200 ease-gallery hover:bg-ink-soft hover:shadow-lg hover:-translate-y-0.5 sm:w-auto"
                >
                  Book this painting
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex w-full cursor-not-allowed items-center justify-center border border-line bg-paper-deep px-8 py-4 text-[12px] uppercase tracking-widest2 text-ink-faint sm:w-auto"
                >
                  {painting.availability === 'SOLD' ? 'Sold' : 'Reserved'}
                </span>
              )}
              <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                {available
                  ? 'A request, not an instant purchase — the artist confirms availability and delivery with you personally.'
                  : 'Ask about commissioning something similar, or see what is currently available.'}
              </p>
              {!available && (
                <a
                  href={contact.buildWhatsappHref(
                    `Hi! I'm interested in a piece similar to "${painting.name}" from Bint-e-Khalil Art.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[12px] uppercase tracking-widest2 text-ink underline decoration-gold underline-offset-4 transition-colors duration-200 hover:text-gold"
                >
                  <MessageCircleIcon className="h-4 w-4" />
                  Ask about a similar piece
                </a>
              )}
            </div>

            {details.length > 0 && (
              <dl className="mt-10 border-t border-line">
                {details.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-3"
                  >
                    <dt className="text-[11px] uppercase tracking-widest2 text-ink-faint">
                      {label}
                    </dt>
                    <dd className="text-right text-sm text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {painting.description && (
              <div className="mt-10">
                <h2 className="text-[11px] uppercase tracking-widest2 text-ink-faint">
                  About this piece
                </h2>
                <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.85] text-ink-soft">
                  {painting.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {others.length > 0 && (
        <section className="mt-24">
          <div className="flex items-baseline justify-between border-b border-line pb-5">
            <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">
              Also in the studio
            </h2>
            <Link
              href="/collection"
              className="text-[12px] uppercase tracking-widest2 text-ink-soft transition-colors duration-200 hover:text-ink"
            >
              See all
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <PaintingCard key={p.slug} painting={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}