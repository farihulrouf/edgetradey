'use client'

import { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {children}
    </div>
  );
}
