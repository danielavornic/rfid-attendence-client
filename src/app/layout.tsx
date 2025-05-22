'use client';

import './globals.css';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/lib/store/provider';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Professor Portal',
//   description: 'Professor Portal',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster closeButton richColors />
        <ProgressBar height="4px" color="#3066ff" options={{ showSpinner: false }} />
      </body>
    </html>
  );
}
