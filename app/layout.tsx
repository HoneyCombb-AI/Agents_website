import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Adamina, DM_Mono, Inter } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { SiteProvider } from "@/components/site-state"
import { cn } from "@/lib/utils"

import "./globals.css"

const adamina = Adamina({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-adamina",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Honeycomb AI — Agents for Indian manufacturers",
    template: "%s · Honeycomb AI",
  },
  description:
    "Honeycomb AI builds agents for Indian manufacturers and distributors. Prospecting, quoting, order entry, scheduling, customer service, and AP/AR, inside the ERP you already run.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(adamina.variable, inter.variable, dmMono.variable)}
    >
      <body>
        <SiteProvider>
          <SiteHeader />
          {children}
        </SiteProvider>
      </body>
    </html>
  )
}
