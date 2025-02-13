import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./Provider";
import { Inter, Manrope } from "next/font/google";

// SEO-Optimized Metadata
export const metadata: Metadata = {
  title: "Flik - Immersive Architectural Visualization for Real Estate",
  description:
    "Flik offers high-quality architectural visualization services, creating stunning 3D renderings and immersive experiences for real estate developers and marketers.",
  keywords:
    "architectural visualization, real estate marketing, 3D rendering, property development, virtual tours, immersive real estate, CGI, interactive visualization",
  authors: [{ name: "Flik", url: "https://flik.in" }],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Flik - Immersive Architectural Visualization for Real Estate",
    description:
      "Transform your real estate projects with Flik's advanced 3D visualization services, helping you market properties effectively.",
    type: "website",
    locale: "en_US",
    url: "https://flik.in",
    siteName: "Flik",
    images: [
      {
        url: "https://i.pinimg.com/736x/3f/39/4d/3f394d5bb29fd1eac62c4e00ab6dc2ad.jpg",
        width: 1200,
        height: 630,
        alt: "Flik Architectural Visualization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flik - Immersive Architectural Visualization for Real Estate",
    description:
      "Flik provides high-end architectural rendering and immersive 3D experiences to elevate real estate marketing.",
    creator: "@flik_in",
    images: ["https://i.pinimg.com/736x/3f/39/4d/3f394d5bb29fd1eac62c4e00ab6dc2ad.jpg"],
  },
  other: {
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
    "X-UA-Compatible": "IE=edge",
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Flik",
              url: "https://flik.in",
              logo: "https://flik.in/logo.png",
              description:
                "Flik offers premium 3D architectural visualization services for real estate developers and marketers.",
              sameAs: [
                "https://twitter.com/FlikOfficial",
                "https://www.linkedin.com/company/flik-architecture",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
