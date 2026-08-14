// app/order-confirmation/page.js
export default function OrderConfirmationPage({ searchParams }) {
  const orderNumber = searchParams?.order || null;

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: '3rem 1rem', textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
      <h1>Request received</h1>

      {orderNumber ? (
        <>
          <p style={{ fontSize: '1.1rem' }}>
            Your order number is <strong>{orderNumber}</strong>.
          </p>
          <p style={{ color: '#666' }}>
            We&apos;ll contact you on WhatsApp or phone shortly to confirm availability,
            payment, and delivery.
          </p>
        </>
      ) : (
        <p style={{ color: '#666' }}>
          Your booking request has been received. We&apos;ll be in touch shortly.
        </p>
      )}

      <a href="/collection" style={{ display: 'inline-block', marginTop: 24 }}>
        &larr; Back to the collection
      </a>
    </main>
  );
}