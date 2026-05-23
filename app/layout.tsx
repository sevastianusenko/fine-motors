import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fine Motors LLC | Used Cars in Newmanstown, Lebanon County PA",
    template: "%s | Fine Motors LLC",
  },
  description:
    "Fine Motors LLC is a family-owned used car dealership in Newmanstown, PA. Honest pricing, no hidden fees, 5.0 star Google rating. Serving Lebanon County and Central PA for 15+ years. Call (717) 644-5444.",
  keywords: [
    "used cars Newmanstown PA",
    "used car dealer Lebanon County PA",
    "Fine Motors LLC",
    "pre-owned vehicles Pennsylvania",
    "used cars Lebanon PA",
    "used cars Palmyra PA",
    "used cars Myerstown PA",
    "used cars Annville PA",
    "used trucks Pennsylvania",
    "used SUV Lebanon County",
    "no pressure car dealer PA",
    "honest used car dealer",
    "family owned car dealer Pennsylvania",
  ],
  metadataBase: new URL("https://finemotorsllc.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://finemotorsllc.com",
    siteName: "Fine Motors LLC",
    title: "Fine Motors LLC | Used Cars in Lebanon County, PA",
    description:
      "Family-owned used car dealership in Newmanstown, PA. Honest pricing, no hidden fees, 5.0★ Google rating. Serving Lebanon County for 15+ years.",
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "name": "Fine Motors LLC",
  "image": "https://finemotorsllc.com/logo.png",
  "url": "https://finemotorsllc.com",
  "telephone": "+17176445444",
  "email": "Finemotorsautosales@gmail.com",
  "description": "Family-owned used car dealership in Newmanstown, PA. Honest pricing, no hidden fees, 5-star rated on Google. Serving Lebanon County for 15+ years.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3910 Stiegel Pike",
    "addressLocality": "Newmanstown",
    "addressRegion": "PA",
    "postalCode": "17073",
    "addressCountry": "US",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.2764215,
    "longitude": -76.2955624,
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "09:00",
      "closes": "15:00",
    },
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "25",
    "bestRating": "5",
    "worstRating": "1",
  },
  "priceRange": "$$",
  "areaServed": [
    "Lebanon County, PA",
    "Dauphin County, PA",
    "Berks County, PA",
    "Lancaster County, PA",
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61589849182930",
    "https://www.google.com/maps/place/Fine+Motors+LLC/@40.2764215,-76.2955624,16z/data=!4m6!3m5!1s0x89c61b4e74139de9:0x446115ce8efa98c7!8m2!3d40.2764215!4d-76.2955624!16s%2Fg%2F11vbr72fvn",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-4QD7EM6XML" strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-4QD7EM6XML');
      `}</Script>
    </html>
  );
}
