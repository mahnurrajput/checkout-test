// app/collection/CollectionClient.jsx
'use client';

import React, { useMemo, useState } from 'react';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { PaintingCard } from '../components/PaintingCard';

// Same buckets as your original CollectionClient.js, just reshaped to
// match the { id, label, min, max } shape Collection.tsx expects.
// max: Infinity instead of null so the `price < max` comparison below
// stays simple (no null-checks needed at each comparison site).
const PRICE_BANDS = [
  { id: 'any', label: 'Any price', min: 0, max: Infinity },
  { id: 'under-50', label: 'Under Rs 50,000', min: 0, max: 50000 },
  { id: '50-100', label: 'Rs 50,000 – 100,000', min: 50000, max: 100000 },
  { id: '100-200', label: 'Rs 100,000 – 200,000', min: 100000, max: 200000 },
  { id: 'over-200', label: 'Over Rs 200,000', min: 200000, max: Infinity },
];

export default function CollectionClient({ paintings }) {
  const [bandId, setBandId] = useState('any');
  const [showSold, setShowSold] = useState(true);

  const band = PRICE_BANDS.find((b) => b.id === bandId) ?? PRICE_BANDS[0];

  const results = useMemo(
    () =>
      paintings.filter((p) => {
        const price = Number(p.price);
        const inBand = price >= band.min && price < band.max;
        // "include" toggle: checked = show all statuses, unchecked = hide
        // SOLD only (RESERVED always stays visible) — same semantics as
        // your original showSold logic, just against `availability` now.
        const soldOk = showSold || p.availability !== 'SOLD';
        return inBand && soldOk;
      }),
    [paintings, band, showSold]
  );

  const reset = () => {
    setBandId('any');
    setShowSold(true);
  };

  return (
    <main className="mx-auto max-w-page px-5 pb-8 pt-12 lg:px-10 lg:pt-20">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
          Collection
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Discover fine calligraphy, textured art, and expressive landscapes.
        </p>
      </header>

      <section aria-label="Filters" className="mt-10 border-y border-line py-5 lg:mt-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
            <div className="flex items-center gap-3">
              <label
                htmlFor="price-band"
                className="text-[11px] uppercase tracking-widest2 text-ink-faint"
              >
                Price
              </label>
              <div className="relative">
                <select
                  id="price-band"
                  value={bandId}
                  onChange={(e) => setBandId(e.target.value)}
                  className="appearance-none border-b border-line bg-transparent py-2 pr-8 text-sm text-ink transition-colors duration-200 ease-gallery focus:border-gold focus:outline-none"
                >
                  {PRICE_BANDS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
                />
              </div>
            </div>

            <div>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={showSold}
                  onChange={(e) => setShowSold(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="flex h-[18px] w-[18px] items-center justify-center border border-ink-faint text-paper transition-colors duration-200 ease-gallery peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-gold/60 peer-focus-visible:ring-offset-2"
                >
                  {showSold && <CheckIcon className="h-3 w-3" />}
                </span>
                <span className="text-sm text-ink">Include paintings already sold</span>
              </label>
              <p className="mt-1.5 pl-[30px] text-xs text-ink-faint">
                Uncheck to hide sold pieces. Available and reserved works always stay
                visible.
              </p>
            </div>
          </div>

          <p
            aria-live="polite"
            className="whitespace-nowrap text-[11px] uppercase tracking-widest2 text-ink-soft"
          >
            {results.length} of {paintings.length} paintings
          </p>
        </div>
      </section>

      {results.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((painting) => (
            <PaintingCard key={painting.slug} painting={painting} />
          ))}
        </div>
      ) : (
        <div className="mt-16 border border-dashed border-line px-6 py-20 text-center">
          <h2 className="font-display text-2xl font-light text-ink">
            No paintings match these filters
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            Try a wider price range, or include sold works to see pieces from the archive.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 border border-ink px-7 py-3 text-[12px] uppercase tracking-widest2 text-ink transition-colors duration-200 ease-gallery hover:bg-ink hover:text-paper"
          >
            Clear filters
          </button>
        </div>
      )}
    </main>
  );
}