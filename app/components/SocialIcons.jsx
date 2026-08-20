// app/components/SocialIcons.jsx
//
// Real platform glyphs via react-icons (Font Awesome 6 brand set) instead of
// hand-drawn approximations. Requires the `react-icons` package:
//
//   npm install react-icons
//
// The circular ring that used to be baked into each SVG now lives on the
// <a> wrapper in Footer.jsx (see the `.social-ring` className there), so
// these are just the plain brand glyphs sized by the className prop.

export {
  FaInstagram as InstagramIcon,
  FaFacebookF as FacebookIcon,
  FaPinterestP as PinterestIcon,
  FaTiktok as TikTokIcon,
  FaYoutube as YoutubeIcon,
  FaWhatsapp as WhatsAppIcon,
  FaEnvelope as MailGlyphIcon,
} from 'react-icons/fa6';