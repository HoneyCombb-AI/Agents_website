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
  title: "Honeycomb AI — Automate your quotes",
  description:
    "Honeycomb builds AI agents for Indian manufacturers and distributors. A customer drawing goes in and a priced quote comes out. Orders post into Tally and SAP Business One.",
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
