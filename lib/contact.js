// lib/contact.js

// Single source of truth for contact details — was previously hardcoded
// separately in about/page.js and as fake data in Magic Patterns' export.
// wa.me format: number only, no +, no spaces.
const WHATSAPP_NUMBER = '923347970556';
const WHATSAPP_DISPLAY = '+92 334 7970556';
const EMAIL = 'bintekhalil.art@gmail.com';

function buildWhatsappHref(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const contact = {
  whatsapp: WHATSAPP_DISPLAY,
  email: EMAIL,
  // Default prefilled message for general "message the studio" links
  // (Footer, generic contact CTAs).
  whatsappHref: buildWhatsappHref(
    'Hi! I have a question about a painting from Bint-e-Khalil Art.'
  ),
  // For painting-specific WhatsApp links (e.g. on a painting detail page),
  // callers can build their own message and href with this helper.
  buildWhatsappHref,
};

export default contact;