import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Music2 } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/heroes-logotipo.png"
                  alt="Héroes Colombia"
                  width={180}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                Conectando a nuestros héroes con los mejores beneficios y promociones exclusivas en a nivel nacional.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Link
                  href="https://www.instagram.com/heroescolombiaoficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=61556662423161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="https://www.tiktok.com/@heroescolombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Music2 className="h-5 w-5" />
                  <span className="sr-only">TikTok</span>
                </Link>
              </div>
            </div>

            {/* Para Usuarios */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Para Usuarios</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/#beneficios"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Beneficios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#como-funciona"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cómo Funciona
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#testimonios"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Que dicen de Héroes Colombia
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#descargar"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Descargar App
                  </Link>
                </li>
              </ul>
            </div>

            {/* Para Negocios */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Para Negocios</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/negocios#beneficios"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Beneficios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/negocios#planes"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Planes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solicitar-demo"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Solicitar Demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://app.heroescolombia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Héroes Colombia. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/privacidad" className="hover:text-foreground transition-colors">
                Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-foreground transition-colors">
                Términos
              </Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
