// app/order-confirmation/page.js
import Link from 'next/link';
import { CheckIcon } from 'lucide-react';
import { contact } from '../../lib/contact';

export const metadata = {
  title: 'Request received — Bint-e-Khalil Art',
};

export default function OrderConfirmationPage({ searchParams }) {
  const orderNumber = searchParams?.order || null;

  return (
    <main className="mx-auto max-w-2xl px-5 py-20 lg:px-10 lg:py-28">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h1 className="mt-8 font-display text-3xl font-light leading-tight text-ink sm:text-4xl">
          Your request has been received
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
          Our team has received your details and will contact you on WhatsApp or by phone to 
          confirm the painting, the total with delivery, and payment. Expect a reply within a day.
        </p>
      </div>

      {orderNumber && (
        <div className="mt-12 border border-line bg-paper-deep px-6 py-7 text-center">
          <p className="text-[11px] uppercase tracking-widest2 text-ink-faint">
            Your reference number
          </p>
          <p className="mt-3 font-display text-3xl tracking-wide text-ink">{orderNumber}</p>
          <p className="mt-3 text-xs text-ink-soft">
            Keep this — quote it in any message about your request.
          </p>
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/collection"
          className="inline-flex w-full items-center justify-center rounded-sm bg-ink px-8 py-4 text-[12px] uppercase tracking-widest2 text-paper transition-all duration-200 ease-gallery hover:bg-ink-soft hover:shadow-lg hover:-translate-y-0.5 sm:w-auto"
        >
          Continue browsing
        </Link>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-sm border border-ink px-8 py-4 text-[12px] uppercase tracking-widest2 text-ink transition-all duration-200 ease-gallery hover:bg-ink hover:text-paper hover:shadow-lg hover:-translate-y-0.5 sm:w-auto"
        >
          Message the studio
        </a>
      </div>
    </main>
  );
}