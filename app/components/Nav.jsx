// app/components/Nav.jsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon, XIcon } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', exact: true },
  { href: '/collection', label: 'Collection', exact: false },
  { href: '/about', label: 'About', exact: false },
  { href: '/contact', label: 'Contact', exact: false },
];

function isLinkActive(pathname, href, exact) {
  return exact ? pathname === href : pathname.startsWith(href);
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on navigation, same behavior as the original
  // useEffect keyed on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-page items-center justify-between px-5 sm:h-20 lg:px-10"
      >
        <Link
          href="/"
          className="group flex flex-col leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        >
          <span className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
            Bint-e-Khalil{' '}
            <span className="text-2xl sm:text-2xl">Art</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => {
            const active = isLinkActive(pathname, l.href, l.exact);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={[
                    'relative whitespace-nowrap py-1 text-[13px] uppercase tracking-widest2 transition-colors duration-200 ease-gallery focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-4 focus-visible:ring-offset-paper',
                    active ? 'text-ink' : 'text-ink-faint hover:text-ink',
                  ].join(' ')}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute -bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-200 ease-gallery',
                      active ? 'scale-x-100' : 'scale-x-0',
                    ].join(' ')}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-paper md:hidden"
      >
        <ul className="mx-auto max-w-page px-5 py-2">
          {links.map((l) => {
            const active = isLinkActive(pathname, l.href, l.exact);
            return (
              <li key={l.href} className="border-b border-line/70 last:border-0">
                <Link
                  href={l.href}
                  className={[
                    'flex items-center justify-between py-4 text-sm uppercase tracking-widest2',
                    active ? 'text-ink' : 'text-ink-faint',
                  ].join(' ')}
                >
                  {l.label}
                  {active && (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}

export default Nav;