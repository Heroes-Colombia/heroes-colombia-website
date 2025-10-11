"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SiteHeaderProps {
  variant?: "user" | "business"
}

export function SiteHeader({ variant = "user" }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks =
    variant === "user"
      ? [
          { href: "/#beneficios", label: "Beneficios" },
          { href: "/#como-funciona", label: "Cómo Funciona" },
          { href: "/negocios", label: "Para Negocios" },
        ]
      : [
          { href: "/negocios#beneficios", label: "Beneficios" },
          { href: "/negocios#planes", label: "Planes" },
          { href: "/", label: "Para Usuarios" },
        ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href={variant === "user" ? "/" : "/negocios"} className="flex items-center gap-2">
          <Image
            src="/images/heroes-logotipo.png"
            alt="Héroes Colombia"
            width={180}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {variant === "business" && (
            <Button variant="ghost" asChild>
              <Link href="https://app.heroescolombia.com">Acceder al Dashboard</Link>
            </Button>
          )}
          <Button asChild>
            <Link href={variant === "user" ? "/#descargar" : "/solicitar-demo"}>
              {variant === "user" ? "Descargar App" : "Solicitar Demo"}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[200px]">
            <nav className="flex flex-col gap-4 mt-8 mx-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                {variant === "business" && (
                  <Button variant="outline" asChild>
                    <Link href="https://app.heroescolombia.com/">Acceder al Dashboard</Link>
                  </Button>
                )}
                <Button asChild>
                  <Link href={variant === "user" ? "/#descargar" : "/solicitar-demo"}>
                    {variant === "user" ? "Descargar App" : "Solicitar Demo"}
                  </Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
