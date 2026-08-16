// app/api/inquiries/route.js
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    console.error('[api/inquiries] Failed to parse JSON body:', err);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { email, phone, message } = body;

  console.log('[api/inquiries] Incoming submission:', { email, phone, message });

  if (!email || !isValidEmail(email)) {
    console.warn('[api/inquiries] Rejected: missing/invalid email');
    return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
  }

  if (!message || !message.trim()) {
    console.warn('[api/inquiries] Rejected: missing message');
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('inquiries')
    .insert({
      email: email.trim(),
      phone: phone && phone.trim() ? phone.trim() : null,
      message: message.trim(),
    })
    .select()
    .single();

  if (error) {
    console.error('[api/inquiries] Supabase insert error:', error);
    return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
  }

  console.log('[api/inquiries] Inquiry saved successfully, id:', data.id);

  return NextResponse.json({ success: true, id: data.id }, { status: 201 });
}