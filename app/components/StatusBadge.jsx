// app/components/StatusBadge.jsx
import React from 'react';

/**
 * Small pill shown over a painting's image / next to its title.
 * Renders nothing for AVAILABLE — the badge only exists to flag
 * RESERVED or SOLD, matching your paintings.status values.
 *
 * status: 'AVAILABLE' | 'RESERVED' | 'SOLD'
 */
export function StatusBadge({ status, className = '' }) {
  if (status === 'AVAILABLE') return null;

  const isSold = status === 'SOLD';

  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1.5 text-[10px] uppercase tracking-widest2',
        isSold ? 'bg-ink text-paper' : 'bg-clay text-paper',
        className,
      ].join(' ')}
    >
      {isSold ? 'Sold' : 'Reserved'}
    </span>
  );
}

export default StatusBadge;