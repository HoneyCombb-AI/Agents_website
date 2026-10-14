"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, useSyncExternalStore } from "react"

import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { Cta } from "@/components/ui/button"
import { DEMO_MAIL } from "@/lib/content"
import { cn } from "@/lib/utils"

const links = [
  { href: "/product", label: "Product" },
  { href: "/#process", label: "How it works" },
  { href: "/#about", label: "About" },
]

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true })
  return () => window.removeEventListener("scroll", onChange)
}

export function SiteHeader() {
  const pathname = usePathname()
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 8,
    () => false
  )
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[72px] border-b transition-all duration-500",
        scrolled
          ? "border-sand/50 bg-cream/95 backdrop-blur-md"
          : "border-transparent bg-cream"
      )}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <Link href="/#top" className="shrink-0" aria-label="Honeycomb home">
          <Logo />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {links.map((link) => {
            const current = link.href === "/product" && pathname === "/product"
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "text-sm font-medium text-charcoal transition-colors hover:text-graphite",
                  current && "underline underline-offset-[6px]"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Cta
            href={DEMO_MAIL}
            tone="primary"
            size="nav"
            className="hidden sm:inline-flex"
          >
            Book a demo
          </Cta>
          <button
            type="button"
            className="relative flex size-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={cn(
                "block h-[1.5px] w-6 bg-charcoal transition duration-300",
                menuOpen && "translate-y-[6.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-6 bg-charcoal transition duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-6 bg-charcoal transition duration-300",
                menuOpen && "-translate-y-[6.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </Container>

      <div
        inert={menuOpen ? undefined : true}
        className={cn(
          "fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-ivory px-6 py-8 transition duration-300 lg:hidden",
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        )}
      >
        <div className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-lg text-charcoal"
              aria-current={
                link.href === "/product" && pathname === "/product"
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
          <Cta href={DEMO_MAIL} tone="primary" size="pill" className="mt-4">
            Book a demo
          </Cta>
        </div>
      </div>
    </header>
  )
}
