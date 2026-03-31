import type { Metadata } from 'next';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import SectionHeading from '@/components/ui/SectionHeading';
import LocationCard from '@/components/contact/LocationCard';
import HoursDisplay from '@/components/contact/HoursDisplay';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Jubilee Juice & Grill',
  description:
    "Get in touch with Jubilee Juice & Grill. Find our hours, location in Chicago's West Loop, and send us a message.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimateOnScroll animation="fade-up">
            <SectionHeading
              title="Get In Touch"
              subtitle="Questions, feedback, or catering inquiries — we'd love to hear from you. Stop by, call us, or send a message below."
            />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Location + Hours */}
            <AnimateOnScroll animation="slide-left">
              <div className="space-y-6">
                <LocationCard />
                <HoursDisplay />
              </div>
            </AnimateOnScroll>

            {/* Right: Contact Form */}
            <AnimateOnScroll animation="slide-right">
              <ContactForm />
            </AnimateOnScroll>
          </div>

          {/* Google Maps Embed */}
          <AnimateOnScroll animation="fade-up">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-sand">
              <iframe
                title="Jubilee Juice & Grill location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.7617534657393!2d-87.6521!3d41.8848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2ce82f5b72f3%3A0x2a6c6b7e2f4f8b2a!2s167%20N%20Morgan%20St%2C%20Chicago%2C%20IL%2060607!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
