// app/components/Field.jsx
import React from 'react';

const baseInput =
  'w-full border-b border-line bg-transparent px-0 py-3 font-sans text-[15px] text-ink placeholder:text-ink-faint/70 transition-colors duration-200 ease-gallery focus:border-gold focus:outline-none';

/**
 * Shared text/textarea input used across the booking and inquiry forms.
 *
 * Props:
 *  - id, label: required — label text and the id/name/htmlFor linking them
 *  - hint: optional small helper line under the field
 *  - required: optional, shows a gold asterisk next to the label
 *  - type: input type, defaults to 'text' (ignored if `rows` is set)
 *  - placeholder, value, onChange(value): standard controlled-input plumbing
 *  - rows: if set, renders a <textarea> instead of an <input>
 */
export function Field({
  id,
  label,
  hint,
  required,
  type = 'text',
  placeholder,
  rows,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12px] uppercase tracking-widest2 text-ink-faint"
      >
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseInput} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseInput}
        />
      )}
      {hint && <p className="mt-2 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

export default Field;