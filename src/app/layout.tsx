import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: "Jubilee Juice & Grill — Healthy Fast Food in Chicago's West Loop",
    template: '%s | Jubilee Juice & Grill',
  },
  description:
    "Chicago's favorite healthy fast food — handcrafted burgers, smoothies, salads & more in the West Loop since 1999.",
  metadataBase: new URL('https://jubileejuice.com'),
  openGraph: {
    type: 'website',
    siteName: 'Jubilee Juice & Grill',
    locale: 'en_US',
  },
};

// Static structured data — no user input, safe for dangerouslySetInnerHTML
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Jubilee Juice & Grill',
  description:
    "Chicago's favorite healthy fast food — handcrafted burgers, smoothies, salads & more in the West Loop since 1999.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: '140 N Halsted St.',
    addressLocality: 'Chicago',
    addressRegion: 'IL',
    postalCode: '60661',
    addressCountry: 'US',
  },
  telephone: '(312) 491-8500',
  email: 'jubileejuiceandgrill@gmail.com',
  url: 'https://jubileejuice.com',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.88406,
    longitude: -87.64758,
  },
  sameAs: [
    'https://instagram.com/jubilee.juice.and.grill',
    'https://facebook.com/JubileeJuice',
    'https://twitter.com/JubileeJuice',
  ],
  servesCuisine: ['American', 'Healthy', 'Burgers', 'Smoothies'],
  priceRange: '$$',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '10:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '07:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '07:00', closes: '00:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '07:00', closes: '00:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '07:00', closes: '00:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '07:00', closes: '01:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '01:00' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Anti-FOUC: apply dark class before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('jubilee-theme');if(t!=='light'){document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Static JSON-LD — no user data, XSS not applicable */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
