// app/components/PriceTag.jsx
import React from 'react';
import { formatPrice, discountPercent } from '../../lib/format';

const currentClasses = {
  card: 'text-sm text-ink',
  detail: 'font-display text-2xl text-ink sm:text-3xl',
  compact: 'text-sm text-ink',
};

const wasClasses = {
  card: 'text-sm',
  detail: 'text-base sm:text-lg',
  compact: 'text-xs',
};

/**
 * Shows a painting's price, and — only when a genuine discount applies —
 * the struck-through old price plus a "% off" tag.
 *
 * price: current asking price (always required)
 * oldPrice: value of the `old_price` column from Supabase. Discount UI
 *   only renders when old_price is present AND old_price > price.
 *   If old_price is null, or old_price === price, this renders as a
 *   plain price with no discount treatment at all.
 * size: 'card' | 'detail' | 'compact' — controls type scale
 */
export function PriceTag({ price, oldPrice, size = 'card', className = '' }) {
  const percent = discountPercent(price, oldPrice);

  if (percent === null) {
    return (
      <p className={[currentClasses[size], className].join(' ')}>
        {formatPrice(price)}
      </p>
    );
  }

  return (
    <p className={['flex flex-wrap items-baseline gap-x-3 gap-y-1', className].join(' ')}>
      <span className={currentClasses[size]}>{formatPrice(price)}</span>
      <span className={[wasClasses[size], 'text-ink-faint line-through'].join(' ')}>
        {formatPrice(oldPrice)}
      </span>
      <span className="inline-flex translate-y-[-1px] items-center border border-clay/40 px-1.5 py-0.5 text-[10px] uppercase tracking-widest2 text-clay">
        {percent}% off
      </span>
    </p>
  );
}

export default PriceTag;