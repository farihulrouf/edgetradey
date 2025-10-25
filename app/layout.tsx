// app/layout.tsx
'use client';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Example: set theme based on localStorage or OS preference
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  return (
    <html lang="en" className={theme}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
