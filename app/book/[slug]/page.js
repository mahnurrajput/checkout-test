// app/book/[slug]/page.js
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';
import { adaptPainting } from '../../../lib/adaptPainting';
import { PriceTag } from '../../components/PriceTag';
import BookingForm from './BookingForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export const metadata = {
  title: 'Book a painting — Bint-e-Khalil Art',
};

function Unavailable({ title, body }) {
  return (
    <main className="mx-auto max-w-xl px-5 py-24 text-center lg:px-10">
      <p className="text-[11px] uppercase tracking-widest2 text-clay">Not available</p>
      <h1 className="mt-4 font-display text-3xl font-light text-ink">{title}</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{body}</p>
      <Link
        href="/collection"
        className="mt-9 inline-block border border-ink px-7 py-3 text-[12px] uppercase tracking-widest2 text-ink transition-colors duration-200 ease-gallery hover:bg-ink hover:text-paper"
      >
        Browse the collection
      </Link>
    </main>
  );
}

export default async function BookPage({ params }) {
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

  if (painting.availability !== 'AVAILABLE') {
    return (
      <Unavailable
        title="No longer available"
        body={`"${painting.name}" is now marked ${painting.availability.toLowerCase()}, so it can't be booked. The rest of the collection is still open.`}
      />
    );
  }

  return (
    <main className="mx-auto max-w-page px-5 pt-4 lg:px-10 lg:pt-6">
      <Link
        href={`/painting/${painting.slug}`}
        className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-widest2 text-ink-faint transition-colors duration-200 hover:text-ink"
      >
        <ArrowLeftIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-gallery group-hover:-translate-x-1" />
        Back to painting
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-12 lg:mt-8 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <h1 className="font-display text-3xl font-light leading-tight text-ink sm:text-4xl">
            Request this piece
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            There is no cart and no card payment here. Send your details and the artist
            will reply personally on WhatsApp or by phone to confirm the piece, the total
            with delivery, and how you would like to pay.
          </p>

          <BookingForm slug={painting.slug} />
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-line bg-paper-deep p-6 lg:sticky lg:top-28">
            <p className="text-[11px] uppercase tracking-widest2 text-ink-faint">
              You are requesting
            </p>
            <div className="mt-5 flex gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={painting.image}
                alt={painting.name}
                className="h-24 w-24 flex-none object-cover"
              />
              <div>
                <h2 className="font-display text-xl leading-snug text-ink">
                  {painting.name}
                </h2>
                {painting.medium && (
                  <p className="mt-1 text-xs uppercase tracking-widest2 text-ink-faint">
                    {painting.medium}
                    {painting.size ? ` · ${painting.size}` : ''}
                  </p>
                )}
                <PriceTag
                  price={painting.price}
                  oldPrice={painting.oldPrice}
                  size="compact"
                  className="mt-3"
                />
              </div>
            </div>
            <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-ink-soft">
              Sending a request does not complete a sale. The piece stays listed until the
              artist confirms with you.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}