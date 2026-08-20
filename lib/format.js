// lib/format.js

/**
 * Formats a price in PKR, e.g. formatPrice(185000) -> "Rs 185,000"
 * currency param lets this stay reusable if you ever add another currency,
 * but defaults to PKR since that's all paintings use today.
 */
export function formatPrice(value, currency = 'PKR') {
  const prefix = currency === 'PKR' ? 'Rs' : currency;
  return `${prefix} ${Number(value).toLocaleString('en-PK')}`;
}

/**
 * Discount percentage, or null if no genuine discount applies.
 *
 * Rules (per the new `old_price` column on `paintings`):
 *  - old_price is null/undefined  -> no discount (return null)
 *  - old_price === price          -> no discount (return null)
 *  - old_price > price            -> discount, return the rounded % off
 *  - old_price < price            -> not a real discount, return null
 *    (guards against bad data — a "discount" that's actually a markup
 *    should never render as one)
 */
export function discountPercent(price, oldPrice) {
  if (oldPrice == null) return null;
  const op = Number(oldPrice);
  const p = Number(price);
  if (!(op > p)) return null;
  const percent = Math.round(((op - p) / op) * 100);
  return percent > 0 ? percent : null;
}