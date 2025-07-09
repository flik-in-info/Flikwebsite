import './globals.css';
import { JetBrains_Mono } from 'next/font/google';
import ClientLayout from './ClientLayout';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const metadata = {
  title: 'Flik - Architectural Visualization Studio',
  description: 'Professional architectural visualization studio specializing in architectural and interior design using Unreal Engine 5.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
