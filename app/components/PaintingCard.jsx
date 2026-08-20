// app/components/PaintingCard.jsx
import React from 'react';
import Link from 'next/link';
import { StatusBadge } from './StatusBadge';
import { PriceTag } from './PriceTag';

/**
 * Grid card used on the Collection and Home pages.
 *
 * Expects the ADAPTED painting shape (from the Step 4 data adapter), not
 * the raw Supabase row — i.e. `availability` (not `status`), `image` (not
 * `image_url`), `oldPrice` (not `old_price`). Keeping this component's
 * prop names matched to the original Magic Patterns design means the
 * adapter is the only place that needs to know about Supabase's column
 * names.
 */
export function PaintingCard({ painting }) {
  const dimmed = painting.availability === 'SOLD';

  return (
    <Link
      href={`/painting/${painting.slug}`}
      className="group flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
    >
      <div className="relative overflow-hidden bg-paper-dark">
        <div className="aspect-square w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={painting.image}
            alt={painting.name}
            loading="lazy"
            className={[
              'h-full w-full object-cover transition-transform duration-500 ease-gallery group-hover:scale-[1.03]',
              dimmed ? 'opacity-75' : '',
            ].join(' ')}
          />
        </div>
        <StatusBadge status={painting.availability} className="absolute left-0 top-4" />
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="font-display text-lg leading-snug text-ink">{painting.name}</h3>
        {painting.medium && (
          <p className="mt-1 text-xs uppercase tracking-widest2 text-ink-faint">
            {painting.medium}
          </p>
        )}
        <PriceTag
          price={painting.price}
          oldPrice={painting.oldPrice}
          size="card"
          className="mt-auto pt-3"
        />
      </div>
    </Link>
  );
}

export default PaintingCard;