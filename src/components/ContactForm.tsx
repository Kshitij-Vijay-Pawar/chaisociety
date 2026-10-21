'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { stores } from '@/lib/stores';

const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORM_KEY ||
  '9405734f-01a1-45e1-9876-041a85216df6';

const topics = [
  { value: 'general', label: 'General Enquiry & Feedback' },
  { value: 'table', label: 'Table & Private Gathering Reservation' },
  { value: 'franchise', label: 'Franchise & Society Expansion' },
  { value: 'catering', label: 'Event Catering & Pop-ups' },
  { value: 'press', label: 'Press & Collaborations' },
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setResultMessage('Sending your message to Chai Society...');

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', ACCESS_KEY);
    formData.append('from_name', 'Chai Society Website');
    formData.append('subject', `New Message from ${formData.get('name') || 'Guest'}`);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setResultMessage('Thank you! Your message has reached our team. We will get back to you shortly.');
        form.reset();
      } else {
        setStatus('error');
        setResultMessage(data.message || 'Something went wrong while submitting. Please try again or email us directly.');
      }
    } catch {
      setStatus('error');
      setResultMessage('Unable to submit at the moment. Please check your connection or contact us via email.');
    }
  };

  return (
    <div className="relative rounded-2xl border border-cream-warm/40 bg-cream-light/80 p-8 shadow-xl backdrop-blur-md lg:p-12">
      <div className="mb-8">
        <span className="eyebrow text-chai-DEFAULT">Write to us</span>
        <h2 className="mt-2 font-display text-3xl font-light text-forest-900 sm:text-4xl">
          Start a conversation
        </h2>
        <p className="mt-2 text-sm text-forest-800/80">
          Whether you want to enquire about reservations, private tea tastings, or franchise partnerships, drop us a note below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anti-spam honeypot */}
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

        {/* Name & Email Row */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs uppercase tracking-widest-2 font-semibold text-forest-900">
              Full Name <span className="text-chai-DEFAULT">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              placeholder="e.g. Maya Rao"
              className="w-full rounded-lg border border-forest-900/15 bg-white/70 px-4 py-3.5 text-sm text-forest-900 placeholder:text-forest-900/40 transition-all duration-200 focus:border-chai-DEFAULT focus:bg-white focus:outline-none focus:ring-2 focus:ring-chai-DEFAULT/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs uppercase tracking-widest-2 font-semibold text-forest-900">
              Email Address <span className="text-chai-DEFAULT">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="e.g. maya@example.com"
              className="w-full rounded-lg border border-forest-900/15 bg-white/70 px-4 py-3.5 text-sm text-forest-900 placeholder:text-forest-900/40 transition-all duration-200 focus:border-chai-DEFAULT focus:bg-white focus:outline-none focus:ring-2 focus:ring-chai-DEFAULT/20"
            />
          </div>
        </div>

        {/* Phone & Location Selection */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-xs uppercase tracking-widest-2 font-semibold text-forest-900">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+91 98765 43210"
              className="w-full rounded-lg border border-forest-900/15 bg-white/70 px-4 py-3.5 text-sm text-forest-900 placeholder:text-forest-900/40 transition-all duration-200 focus:border-chai-DEFAULT focus:bg-white focus:outline-none focus:ring-2 focus:ring-chai-DEFAULT/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="preferred_store" className="text-xs uppercase tracking-widest-2 font-semibold text-forest-900">
              Nearest Café
            </label>
            <div className="relative">
              <select
                id="preferred_store"
                name="preferred_store"
                defaultValue=""
                className="w-full appearance-none rounded-lg border border-forest-900/15 bg-white/70 px-4 py-3.5 text-sm text-forest-900 transition-all duration-200 focus:border-chai-DEFAULT focus:bg-white focus:outline-none focus:ring-2 focus:ring-chai-DEFAULT/20"
              >
                <option value="" disabled>Select a location</option>
                {stores.map((s) => (
                  <option key={s.id} value={`${s.name} (${s.city})`}>
                    {s.city} — {s.name}
                  </option>
                ))}
                <option value="General/Other">Other / Not store specific</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-forest-900/60">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Topic of Inquiry */}
        <div className="space-y-2">
          <label htmlFor="topic" className="text-xs uppercase tracking-widest-2 font-semibold text-forest-900">
            Topic of Enquiry <span className="text-chai-DEFAULT">*</span>
          </label>
          <div className="relative">
            <select
              id="topic"
              name="topic"
              required
              defaultValue="general"
              className="w-full appearance-none rounded-lg border border-forest-900/15 bg-white/70 px-4 py-3.5 text-sm text-forest-900 transition-all duration-200 focus:border-chai-DEFAULT focus:bg-white focus:outline-none focus:ring-2 focus:ring-chai-DEFAULT/20"
            >
              {topics.map((t) => (
                <option key={t.value} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-forest-900/60">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message area */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-xs uppercase tracking-widest-2 font-semibold text-forest-900">
            Your Message <span className="text-chai-DEFAULT">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us what brings you to Chai Society today..."
            className="w-full rounded-lg border border-forest-900/15 bg-white/70 px-4 py-3.5 text-sm text-forest-900 placeholder:text-forest-900/40 transition-all duration-200 focus:border-chai-DEFAULT focus:bg-white focus:outline-none focus:ring-2 focus:ring-chai-DEFAULT/20 resize-y"
          ></textarea>
        </div>

        {/* Status notification */}
        {status !== 'idle' && (
          <div
            className={`flex items-start gap-3 rounded-lg p-4 text-sm transition-all duration-300 ${
              status === 'loading'
                ? 'bg-chai-subtle/50 text-chai-dark border border-chai-light/30'
                : status === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {status === 'loading' && <Loader2 className="h-5 w-5 shrink-0 animate-spin mt-0.5" />}
            {status === 'success' && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />}
            {status === 'error' && <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />}
            <p className="flex-1 leading-relaxed">{resultMessage}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-forest-900 px-8 py-4 text-xs uppercase tracking-widest-2 font-semibold text-cream-light shadow-md transition-all duration-300 hover:bg-chai-DEFAULT hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
