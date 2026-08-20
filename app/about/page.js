// app/about/page.js
export const metadata = {
  title: 'About — Bint-e-Khalil Art',
  description: 'The story behind Bint-e-Khalil Art.',
};

// TODO: swap for a real photo of the artist at work once available.
const ARTIST_IMAGE = null;

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-page grid-cols-1 gap-10 px-5 pt-12 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:pt-20">
        <div className="lg:col-span-7">
          <h1 className="font-display text-4xl font-light leading-[1.1] text-ink sm:text-5xl">
            About
          </h1>
          {/* TODO: replace with real studio write-up. Placeholder text below
              kept from the initial design draft until real copy is supplied. */}
          <div className="mt-7 max-w-3xl space-y-5 text-[15px] leading-[1.85] text-ink-soft">
            <p>
              Bint-e-Khalil Art represents the fine art practice of{' '}
              <strong className="font-medium text-ink">Irfana Nosheen</strong>, a
              Lahore-based artist specializing in{' '}
              <strong className="font-medium text-ink">Islamic calligraphy</strong>,
              textured architecture, and fine canvas paintings. Every piece carries a
              fluid rhythm—from the precise geometry of classical scripts to rich,
              multidimensional textures built up layer by layer.
            </p>
            <p>
              With over <strong className="font-medium text-ink">15 years</strong> of
              experience in the art world, she has mastered a wide range of artistic
              mediums and styles, from delicate canvas paintings to intricate,
              script-focused works. Her journey includes formal training under
              renowned calligraphy masters, where she specialized in the rigorous
              discipline of <strong className="font-medium text-ink">Suls calligraphy</strong>{' '}
              alongside various classical and modern scripts like{' '}
              <strong className="font-medium text-ink">Kufi, Diwani, and Nastaliq</strong>.
              Her masterly execution has earned her multiple national-level awards,
              including securing{' '}
              <strong className="font-medium text-ink">2nd Position</strong> at the
              Calligraphy Exhibition organized by the{' '}
              <strong className="font-medium text-ink">
                Ali Hamza Calligraphy Foundation
              </strong>{' '}
              & Alkhidmat Foundation Pakistan and{' '}
              <strong className="font-medium text-ink">14th Position</strong> at the
              10th Ashraf ul Qalam National Calligraphy Competition. Beyond accolades,
              her work has gained national recognition through television
              appearances, notably being featured on{' '}
              <strong className="font-medium text-ink">PTV</strong> for a live
              calligraphy performance on the morning show hosted by{' '}
              <strong className="font-medium text-ink">Juggan Kazmi</strong>.
            </p>
            <p>
              While works in the collection are available for acquisition, custom
              compositions and bespoke calligraphy can also be created upon request.
              To inquire about available paintings or discuss a personal piece,
              please reach out through our inquiry form or contact us directly via{' '}
              <strong className="font-medium text-ink">WhatsApp</strong>—all inquiries
              are welcome, and we will get back to you as soon as possible.
            </p>
          </div>
        </div>
        {ARTIST_IMAGE && (
          <div className="lg:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ARTIST_IMAGE}
              alt="The artist's hands painting gold calligraphy detail onto canvas"
              className="h-64 w-full object-cover sm:h-80 lg:h-full lg:max-h-[26rem]"
            />
          </div>
        )}
      </section>
    </main>
  );
}