// app/collection/CollectionClient.js
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const STATUS_LABEL = {
  AVAILABLE: null,
  RESERVED: 'Reserved',
  SOLD: 'Sold',
};

const PRICE_BUCKETS = [
  { label: 'Any price', min: null, max: null },
  { label: 'Under Rs 50,000', min: null, max: 50000 },
  { label: 'Rs 50,000 – 100,000', min: 50000, max: 100000 },
  { label: 'Rs 100,000 – 200,000', min: 100000, max: 200000 },
  { label: 'Over Rs 200,000', min: 200000, max: null },
];

export default function CollectionClient({ paintings }) {
  const [priceBucketIndex, setPriceBucketIndex] = useState(0);
  const [showSold, setShowSold] = useState(true);

  // --- DEBUG LOGGING (client-side, visible in browser console) ---
  useEffect(() => {
    console.log('[CollectionClient] mounted with paintings prop:', paintings);
    console.log('[CollectionClient] paintings count:', paintings.length);
  }, [paintings]);
  // -----------------------------------------------------------------

  const filtered = useMemo(() => {
    const bucket = PRICE_BUCKETS[priceBucketIndex];
    const result = paintings.filter((p) => {
      if (!showSold && p.status === 'SOLD') return false;
      const price = Number(p.price);
      if (bucket.min != null && price < bucket.min) return false;
      if (bucket.max != null && price >= bucket.max) return false;
      return true;
    });

    // --- DEBUG LOGGING ---
    console.log('[CollectionClient] filter recomputed', {
      priceBucket: bucket.label,
      showSold,
      resultCount: result.length,
    });
    // ----------------------

    return result;
  }, [paintings, priceBucketIndex, showSold]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          alignItems: 'center',
          margin: '1rem 0 1.5rem',
          padding: '0.75rem',
          background: '#f5f2eb',
          borderRadius: 8,
        }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '0.8rem', gap: 4 }}>
          Price range
          <select
            value={priceBucketIndex}
            onChange={(e) => setPriceBucketIndex(Number(e.target.value))}
            style={{ padding: '0.4rem 0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
          >
            {PRICE_BUCKETS.map((b, i) => (
              <option key={b.label} value={i}>
                {b.label}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', marginTop: '1.1rem' }}>
          <input
            type="checkbox"
            checked={showSold}
            onChange={(e) => setShowSold(e.target.checked)}
          />
          Show sold paintings
        </label>

        <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#777', marginTop: '1.1rem' }}>
          {filtered.length} of {paintings.length} paintings
        </span>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: '#777' }}>No paintings match these filters.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {filtered.map((p) => {
            const statusLabel = STATUS_LABEL[p.status] ?? null;
            return (
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
                <div style={{ position: 'relative', aspectRatio: '1 / 1', background: '#f0ede6' }}>
                  {p.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image_url}
                      alt={p.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                  {statusLabel && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'rgba(0,0,0,0.75)',
                        color: '#fff',
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: 4,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                      }}
                    >
                      {statusLabel}
                    </span>
                  )}
                </div>
                <div style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{p.name}</div>
                  {p.medium && (
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{p.medium}</div>
                  )}
                  <div style={{ fontSize: '0.95rem', marginTop: 4 }}>
                    {p.currency} {Number(p.price).toLocaleString()}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}