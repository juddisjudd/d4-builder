'use client';

import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';
import { cn } from '@/lib/utils';
import Footer from '@/components/footer';
import Header from "@/components/header";
import BuilderTabs from "@/components/builderTabs";
import { BuildProvider } from '@/contexts/BuildContext';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, 'flex h-full flex-col bg-background')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <BuildProvider>
            <Header />
            <BuilderTabs />
            <main className="flex-grow pt-20">{children}</main>
            <Toaster />
            <Footer />
          </BuildProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}