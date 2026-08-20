// lib/adaptPainting.js

/**
 * Maps a raw `paintings` row from Supabase into the shape the ported
 * Magic Patterns UI components expect (PaintingCard, PriceTag,
 * StatusBadge, and the page-level components coming in Step 5).
 *
 * This is the ONLY place that should know both:
 *   (a) Supabase's column names (status, image_url, old_price, paint_type)
 *   (b) the UI components' prop names (availability, image, oldPrice, paintType)
 *
 * Every page/component past this point uses the adapted shape below,
 * never the raw Supabase row directly — keeps the two naming schemes
 * from leaking into each other.
 *
 * Raw Supabase row (from `paintings` table):
 *   id, slug, name, description, price, currency, medium, size,
 *   paint_type, material, year, image_url, status, old_price,
 *   created_at, updated_at
 *
 * Adapted shape (consumed by UI components):
 *   id, slug, name, description, price, currency, medium, size,
 *   paintType, material, year, image, availability, oldPrice
 */
export function adaptPainting(row) {
  if (!row) return null;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? '',
    price: row.price,
    currency: row.currency || 'PKR',
    medium: row.medium ?? null,
    paintType: row.paint_type ?? null,
    material: row.material ?? null,
    size: row.size ?? null,
    year: row.year ?? null,
    image: row.image_url ?? null,
    // Supabase uses AVAILABLE | RESERVED | SOLD | HIDDEN.
    // HIDDEN rows should already be filtered out by the query itself
    // (see collection/page.js's .neq('status', 'HIDDEN')) — this adapter
    // doesn't re-filter, it just passes status through renamed.
    availability: row.status,
    // null when no discount column value exists, or when old_price was
    // never set — PriceTag already treats null/undefined as "no discount".
    oldPrice: row.old_price ?? null,
  };
}

/**
 * Convenience helper for adapting a list of rows at once, e.g. the
 * Collection page's full paintings array.
 */
export function adaptPaintings(rows) {
  return (rows || []).map(adaptPainting);
}

export default adaptPainting;