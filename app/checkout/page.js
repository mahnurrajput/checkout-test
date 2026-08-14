// This is the endpoint you will register with Meta as your Checkout URL.
// Meta redirects customers here as: /checkout?products=ID:QTY,ID:QTY&coupon=CODE
//
// NOTE: unlike Meta's sample code (which returns raw JSON), this returns an
// actual visible page — because a real customer's browser lands here. JSON
// would just show them a blank-looking page of text, which is not a checkout
// experience and would likely fail Meta's review.

function parseProducts(raw) {
  if (!raw) return [];
  const items = [];
  for (const entry of raw.split(",")) {
    const [productId, qty] = entry.split(":");
    if (!productId) continue;
    const quantity = parseInt(qty, 10);
    items.push({
      productId: productId.trim(),
      quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    });
  }
  return items;
}

export default function CheckoutPage({ searchParams }) {
  const rawProducts = searchParams?.products || "";
  const coupon = searchParams?.coupon || null;
  const items = parseProducts(rawProducts);

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: 22, letterSpacing: 1, marginBottom: 4 }}>
        BINT-E-KHALIL ART
      </h1>
      <p style={{ color: "#777", marginTop: 0 }}>Checkout — diagnostic view</p>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e0d8",
          borderRadius: 8,
          padding: 20,
          marginTop: 24,
        }}
      >
        <h2 style={{ fontSize: 16, marginTop: 0 }}>What Meta sent this page</h2>

        <p style={{ marginBottom: 4 }}>
          <strong>Raw products param:</strong>{" "}
          <code>{rawProducts || "(none received)"}</code>
        </p>
        <p style={{ marginBottom: 16 }}>
          <strong>Coupon:</strong> <code>{coupon || "(none)"}</code>
        </p>

        {items.length === 0 ? (
          <p style={{ color: "#b33" }}>
            No products were parsed from the URL. If you reached this page
            from an actual Meta checkout click, this tells us Meta is not
            sending the expected <code>products</code> parameter, or is
            sending it in a different shape than documented.
          </p>
        ) : (
          <>
            <h3 style={{ fontSize: 14, textTransform: "uppercase", color: "#777" }}>
              Parsed items ({items.length})
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e0d8" }}>
                  <th style={{ padding: "6px 0" }}>Product ID (from Meta)</th>
                  <th style={{ padding: "6px 0" }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0ede6" }}>
                    <td style={{ padding: "6px 0" }}>
                      <code>{item.productId}</code>
                    </td>
                    <td style={{ padding: "6px 0" }}>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <p style={{ marginTop: 24, fontSize: 13, color: "#999" }}>
        This page intentionally shows raw diagnostic data instead of a
        polished checkout UI. Once we confirm the exact product ID Meta sends
        for a real painting, we will replace this with the actual artwork
        lookup, price display, and order form.
      </p>
    </main>
  );
}
