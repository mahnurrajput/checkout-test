// app/api/orders/route.js
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { slug, name, phone, email, address, city, notes } = body || {};

  // --- Basic required-field validation ---
  if (!slug || !name || !phone) {
    return NextResponse.json(
      { error: 'Missing required fields: name and phone are required.' },
      { status: 400 }
    );
  }

  // --- Server-side re-fetch of painting: NEVER trust price/availability from the client ---
  const { data: painting, error: paintingError } = await supabase
    .from('paintings')
    .select('id, name, price, status')
    .eq('slug', slug)
    .single();

  if (paintingError || !painting) {
    return NextResponse.json({ error: 'Painting not found.' }, { status: 404 });
  }

  if (painting.status !== 'AVAILABLE') {
    return NextResponse.json(
      { error: `This painting is currently ${painting.status.toLowerCase()} and cannot be booked.` },
      { status: 409 }
    );
  }

  // --- Insert the order (order_number assigned after we have the id) ---
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: `PENDING-${Date.now()}`, // placeholder, replaced below
      customer_name: name,
      phone,
      email: email || null,
      address: address || null,
      city: city || null,
      notes: notes || null,
      status: 'PENDING_CONFIRMATION',
    })
    .select()
    .single();

  if (orderError || !order) {
    console.error('Order insert error:', orderError);
    return NextResponse.json({ error: 'Could not create order. Please try again.' }, { status: 500 });
  }

  const year = new Date().getFullYear();
  const orderNumber = `BK-${year}-${String(order.id).padStart(4, '0')}`;

  const { error: updateError } = await supabase
    .from('orders')
    .update({ order_number: orderNumber })
    .eq('id', order.id);

  if (updateError) {
    console.error('Order number update error:', updateError);
    return NextResponse.json({ error: 'Could not finalize order. Please try again.' }, { status: 500 });
  }

  // --- Snapshot price from DB (not client) into order_items ---
  const { error: itemError } = await supabase.from('order_items').insert({
    order_id: order.id,
    painting_id: painting.id,
    quantity: 1,
    unit_price: painting.price,
  });

  if (itemError) {
    console.error('Order item insert error:', itemError);
    return NextResponse.json({ error: 'Could not save order details. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ orderNumber }, { status: 201 });
}