import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';
import { stores } from '@/lib/stores';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact & Reservations — Chai Society',
  description: 'Reach out to Chai Society. Table reservations, private events, feedback, or franchise queries.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream-light text-forest-900">
      <SiteHeader />

      {/* Hero header */}
      <section className="relative overflow-hidden bg-forest-900 text-cream-light px-6 pt-36 pb-20 lg:px-10 lg:pt-44 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(#d47029_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[60vh] w-[60vh] rounded-full bg-chai-DEFAULT/15 blur-[120px]" />
        
        <div className="relative mx-auto max-w-[1400px]">
          <span className="eyebrow text-chai-light">Get in Touch</span>
          <h1 className="mt-6 font-display text-5xl font-light leading-tight sm:text-6xl lg:text-7xl">
            Pull up a chair. We’d love to hear from you.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-light/75">
            Whether you want to book a table for your team, inquire about private tea tastings, explore franchise societies, or just say hello — drop us a line below.
          </p>
        </div>
      </section>

      {/* Main Content: Info Cards & Form */}
      <section className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Left Column: Contact Details & Quick Links */}
          <div className="space-y-12 lg:col-span-5">
            <div>
              <span className="eyebrow text-chai-DEFAULT">Direct Contact</span>
              <h2 className="mt-2 font-display text-3xl font-light sm:text-4xl">
                Always brewing, always welcoming
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-forest-800/80">
                Prefer direct communication? Reach our central support desk or drop by any of our society lounges across the country.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-xl border border-forest-900/10 bg-white/60 p-5 backdrop-blur-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-chai-DEFAULT/10 text-chai-DEFAULT">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest-2 font-semibold text-forest-900/60">Email Desk</p>
                  <a href={`mailto:${site.email}`} className="mt-1 block font-medium hover:text-chai-DEFAULT transition-colors">
                    {site.email}
                  </a>
                  <p className="text-xs text-forest-700/60 mt-0.5">Average reply time: under 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-forest-900/10 bg-white/60 p-5 backdrop-blur-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-chai-DEFAULT/10 text-chai-DEFAULT">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest-2 font-semibold text-forest-900/60">Phone & WhatsApp</p>
                  <a href={`tel:${site.phone}`} className="mt-1 block font-medium hover:text-chai-DEFAULT transition-colors">
                    {site.phone}
                  </a>
                  <p className="text-xs text-forest-700/60 mt-0.5">Mon – Sun: 8:00 AM – 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-forest-900/10 bg-white/60 p-5 backdrop-blur-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-chai-DEFAULT/10 text-chai-DEFAULT">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest-2 font-semibold text-forest-900/60">Operating Hours</p>
                  <p className="mt-1 font-medium">8:00 AM – 11:30 PM</p>
                  <p className="text-xs text-forest-700/60 mt-0.5">Fresh bakes & warm brews all day</p>
                </div>
              </div>
            </div>

            {/* Our Lounges preview */}
            <div className="rounded-xl border border-forest-900/10 bg-forest-900 p-6 text-cream-light">
              <span className="eyebrow text-chai-light">Society Lounges</span>
              <h3 className="mt-2 font-display text-2xl font-light">Find us across cities</h3>
              <ul className="mt-4 space-y-3 divide-y divide-cream-light/10 text-sm">
                {stores.map((s) => (
                  <li key={s.id} className="pt-3 first:pt-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-cream-light">{s.name}</span>
                      <span className="text-xs text-chai-light">{s.city}</span>
                    </div>
                    <p className="text-xs text-cream-light/65 mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3 inline text-chai-DEFAULT" /> {s.address}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Detailed Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
