// lib/priceInWords.js

const ONES = [
  'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen',
];

const TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety',
];

// Words for 0-99.
function twoDigits(n) {
  if (n < 20) return ONES[n];
  const tens = Math.floor(n / 10);
  const rest = n % 10;
  return rest ? `${TENS[tens]}-${ONES[rest]}` : TENS[tens];
}

// Words for 0-999 (used for the leading hundred-group only).
function threeDigits(n) {
  const hundred = Math.floor(n / 100);
  const rest = n % 100;
  const parts = [];
  if (hundred) parts.push(`${ONES[hundred]} Hundred`);
  if (rest) parts.push(twoDigits(rest));
  return parts.join(' ');
}

/**
 * Converts a whole-number price into words using the Pakistani/Indian
 * numbering system (Thousand, Lakh, Crore) — matches how prices in PKR
 * are naturally spoken, e.g. 100000 -> "One Lakh", not "One Hundred
 * Thousand".
 *
 * Returns just the number in words, e.g. "One Lakh Fifteen Thousand".
 * Caller appends the currency word (see priceInWords below).
 */
export function numberToWords(value) {
  let n = Math.round(Number(value));
  if (!Number.isFinite(n) || n < 0) return '';
  if (n === 0) return 'Zero';

  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;
  const rest = n;

  const parts = [];
  if (crore) parts.push(`${twoDigits(crore)} Crore`);
  if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));

  return parts.join(' ');
}

/**
 * Full price-in-words string for display under a price, e.g.:
 *   priceInWords(15000) -> "Fifteen Thousand Rupees"
 *   priceInWords(100000) -> "One Lakh Rupees"
 * currency param only affects the trailing word; defaults to Rupees
 * since PKR is the only currency in use today.
 */
export function priceInWords(value, currency = 'PKR') {
  const words = numberToWords(value);
  if (!words) return '';
  const currencyWord = currency === 'PKR' ? 'Rupees' : currency;
  return `${words} ${currencyWord}`;
}

export default priceInWords;