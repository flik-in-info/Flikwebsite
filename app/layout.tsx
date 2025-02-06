import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./Provider";

export const metadata: Metadata = {
  title: "Flik - Immersive Architectural Visualization for Real Estate",
  description: "Transform your real estate projects with Flik's cutting-edge architectural visualization services. We create immersive 3D experiences that help developers market properties effectively.",
  keywords: "architectural visualization, real estate marketing, 3D visualization, property development, immersive experiences, architectural rendering",
  openGraph: {
    title: "Flik - Immersive Architectural Visualization for Real Estate",
    description: "Transform your real estate projects with Flik's cutting-edge architectural visualization services. We create immersive 3D experiences that help developers market properties effectively.",
    type: "website",
    locale: "en_US",
    siteName: "Flik"
  },
  twitter: {
    card: "summary_large_image",
    title: "Flik - Immersive Architectural Visualization for Real Estate",
    description: "Transform your real estate projects with Flik's cutting-edge architectural visualization services. We create immersive 3D experiences that help developers market properties effectively."
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head />
      <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
    </html>
  );
}
