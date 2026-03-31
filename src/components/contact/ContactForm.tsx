'use client';

import { useState, type FormEvent } from 'react';
import Button from '@/components/ui/Button';

const SUBJECTS = [
  'General Inquiry',
  'Catering & Large Orders',
  'Feedback',
  'Employment',
  'Other',
] as const;

const INPUT_BASE =
  'w-full rounded-xl border border-sand bg-cream px-4 py-3 text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-orange/50 focus:border-orange transition-colors text-base';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-sand p-8 text-center">
        <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
          ✓
        </div>
        <h3
          className="font-black text-2xl text-charcoal mb-3"
          style={{ fontFamily: "'Satoshi', sans-serif" }}
        >
          Message Sent!
        </h3>
        <p className="text-charcoal/60 leading-relaxed mb-6">
          Thanks for reaching out. We&apos;ll get back to you within one business day. For faster help, give us a call at{' '}
          <a href="tel:+13122432255" className="text-orange font-semibold hover:underline">
            (312) 243-2255
          </a>.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-sand p-7">
      <h3
        className="font-black text-2xl text-charcoal mb-6"
        style={{ fontFamily: "'Satoshi', sans-serif" }}
      >
        Send a Message
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-1.5">
              Name <span className="text-orange">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className={INPUT_BASE}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-1.5">
              Email <span className="text-orange">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={INPUT_BASE}
            />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-charcoal mb-1.5">
            Subject
          </label>
          <select id="subject" name="subject" className={INPUT_BASE}>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-1.5">
            Message <span className="text-orange">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="How can we help you?"
            className={`${INPUT_BASE} resize-none`}
          />
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Sending…' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}
