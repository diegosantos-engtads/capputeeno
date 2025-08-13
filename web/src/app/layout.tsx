import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: { template: '%s | Capputeeno', default: 'Capputeeno' },
  description: 'store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body
        className={`${roboto.className} min-h-dvh bg-[var(--bg-1)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
