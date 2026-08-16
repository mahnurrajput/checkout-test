// app/NavBar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/collection', label: 'Collection' },
  { href: '/about', label: 'About & Contact' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.85rem 1rem',
        background: '#fff',
        borderBottom: '1px solid #e5e0d8',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        flexWrap: 'wrap',
      }}
    >
      <Link
        href="/"
        style={{
          fontWeight: 700,
          fontSize: '0.95rem',
          color: '#333',
          textDecoration: 'none',
          marginRight: '1rem',
          whiteSpace: 'nowrap',
        }}
      >
        Bint-e-Khalil Art
      </Link>

      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
        {LINKS.map((link) => {
          const isActive =
            link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 6,
                fontSize: '0.85rem',
                textDecoration: 'none',
                color: isActive ? '#fff' : '#555',
                background: isActive ? '#333' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                whiteSpace: 'nowrap',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}