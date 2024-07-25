'use client';

import { useState } from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';
import { cn } from '@/lib/utils';
import Footer from '@/components/footer';
import Header from "@/components/header";
import BuilderTabs from "@/components/builderTabs";

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, 'flex h-full flex-col bg-background')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header selectedClass={selectedClass} setSelectedClass={setSelectedClass} />
          <BuilderTabs selectedClass={selectedClass} />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}