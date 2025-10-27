import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edgetrade Admin",
  description: "Admin Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}




