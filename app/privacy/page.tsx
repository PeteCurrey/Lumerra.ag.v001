export default function PrivacyPage() {
  return (
    <div className="pt-40 pb-24">
      <div className="container-lumerra max-w-3xl">
        <p className="text-caption mb-4">Compliance</p>
        <h1 className="display-64 mb-12">Privacy Policy</h1>
        
        <div className="prose prose-ink max-w-none space-y-8 text-[var(--color-ink-soft)] leading-relaxed">
           <section>
              <h2 className="font-display text-2xl text-[var(--color-ink)]">1. Introduction</h2>
              <p>
                Lumerra (referred to as "we", "us", or "our") is committed to protecting your personal data. 
                This privacy policy informs you about how we look after your personal data when you visit 
                our website and tells you about your privacy rights.
              </p>
           </section>

           <section>
              <h2 className="font-display text-2xl text-[var(--color-ink)]">2. Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data including: 
                Identity Data (name, username), Contact Data (email, phone), Financial Data (payment cards), 
                and Technical Data (IP address, browser type).
              </p>
           </section>

           <section>
              <h2 className="font-display text-2xl text-[var(--color-ink)]">3. Third-Party Processors</h2>
              <p>
                We use reputable third-party processors to provide our services, including: 
                Stripe (Payments), Cloudinary (Images), Mux (Video), and Supabase (Infrastructure). 
                Your data is processed in accordance with UK GDPR.
              </p>
           </section>
        </div>
      </div>
    </div>
  );
}
