// app/contact/page.js
import { MailIcon } from 'lucide-react';
import { contact } from '../../lib/contact';
import { WhatsAppIcon } from '../components/SocialIcons';
import InquiryForm from './InquiryForm';

export const metadata = {
  title: 'Contact — Bint-e-Khalil Art',
  description: 'Get in touch with Bint-e-Khalil Art.',
};

export default function ContactPage() {
  return (
    <main>
      <section className="mx-auto max-w-page px-5 pt-12 lg:px-10 lg:pt-20">
        <h1 className="font-display text-4xl font-light leading-[1.1] text-ink sm:text-5xl">
          Get in touch
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border border-line bg-paper-deep px-6 py-5 text-ink transition-colors duration-200 ease-gallery hover:border-ink"
          >
            <WhatsAppIcon className="h-6 w-6 flex-none text-ink-soft" />
            <span>
              <span className="block text-[12px] uppercase tracking-widest2">WhatsApp</span>
              <span className="mt-1 block text-sm text-ink-soft">{contact.whatsapp}</span>
            </span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="group flex items-center gap-4 border border-line bg-paper-deep px-6 py-5 text-ink transition-colors duration-200 ease-gallery hover:border-ink"
          >
            <MailIcon className="h-6 w-6 flex-none text-ink-soft" />
            <span>
              <span className="block text-[12px] uppercase tracking-widest2">Email</span>
              <span className="mt-1 block text-sm text-ink-soft">{contact.email}</span>
            </span>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-page px-5 pt-16 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">
              Send a message
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">
              Questions about a piece, a commission, or delivery — write here and our team 
              will get back to you directly.
            </p>
          </div>

          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}