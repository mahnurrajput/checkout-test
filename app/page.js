export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Bint-e-Khalil Art</h1>
      <p>
        This is a test deployment. The checkout endpoint Meta will use is at{" "}
        <code>/checkout</code>.
      </p>
      <p>
        Try it manually, e.g. <code>/checkout?products=ABC123:1&coupon=TEST10</code>
      </p>
    </main>
  );
}
