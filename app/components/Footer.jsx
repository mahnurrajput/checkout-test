// app/components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { contact } from '../../lib/contact';
import {
  InstagramIcon,
  FacebookIcon,
  PinterestIcon,
  TikTokIcon,
  YoutubeIcon,
  WhatsAppIcon,
  MailGlyphIcon,
} from './SocialIcons';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/bintekhalil.art/', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/bintekhalil.art19', Icon: FacebookIcon },
  { label: 'Pinterest', href: 'https://www.pinterest.com/nosheenirfana4/', Icon: PinterestIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/@bintekhalil.art', Icon: TikTokIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/@binekhalil.art19', Icon: YoutubeIcon },
];

const ICON_RING =
  'flex h-9 w-9 items-center justify-center rounded-full border border-current text-ink-soft transition-colors duration-200 hover:text-ink';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-paper-deep">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-5 py-12 sm:flex-row sm:items-start sm:justify-between lg:px-10">
        <div className="max-w-xs">
          <p className="font-display text-xl text-ink">Bint-e-Khalil Art</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Hand-crafted paintings for considered spaces.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <p className="text-[11px] uppercase tracking-widest2 text-ink-faint">Visit</p>
          <Link href="/collection" className="text-ink-soft transition-colors duration-200 hover:text-ink">
            Collection
          </Link>
          <Link href="/about" className="text-ink-soft transition-colors duration-200 hover:text-ink">
            About
          </Link>
          <Link href="/contact" className="text-ink-soft transition-colors duration-200 hover:text-ink">
            Contact
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[11px] uppercase tracking-widest2 text-ink-faint">Reach the studio</p>
          <div className="flex items-center gap-4">
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={ICON_RING}
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={ICON_RING}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href={`mailto:${contact.email}`}
              aria-label="Email"
              className={ICON_RING}
            >
              <MailGlyphIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-page px-5 py-5 text-xs text-ink-faint lg:px-10">
          © 2026 Bint-e-Khalil Art. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;