import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Cookie } from "lucide-react"

export default function CookiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Cookie className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Política de Cookies</h1>
              <p className="text-muted-foreground">Última actualización: {new Date().toLocaleDateString("es-CO")}</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>¿Qué son las Cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro
                sitio web. Nos ayudan a mejorar tu experiencia, recordar tus preferencias y entender cómo usas nuestra
                plataforma.
              </p>

              <h2>Tipos de Cookies que Usamos</h2>

              <h3>1. Cookies Esenciales (Necesarias)</h3>
              <p>Estas cookies son necesarias para que el sitio funcione correctamente:</p>
              <ul>
                <li>
                  <strong>Autenticación:</strong> Mantienen tu sesión activa cuando inicias sesión
                </li>
                <li>
                  <strong>Seguridad:</strong> Protegen contra ataques y fraudes
                </li>
                <li>
                  <strong>Preferencias:</strong> Recuerdan tu idioma y configuración regional
                </li>
              </ul>
              <p>
                <em>No puedes desactivar estas cookies sin afectar el funcionamiento del sitio.</em>
              </p>

              <h3>2. Cookies de Rendimiento</h3>
              <p>Nos ayudan a entender cómo los usuarios interactúan con el sitio:</p>
              <ul>
                <li>Páginas más visitadas</li>
                <li>Tiempo de permanencia en el sitio</li>
                <li>Errores técnicos que encuentran los usuarios</li>
                <li>Flujo de navegación</li>
              </ul>
              <p>
                <em>Usamos Google Analytics para esto. Puedes desactivarlas en la configuración.</em>
              </p>

              <h3>3. Cookies de Funcionalidad</h3>
              <p>Mejoran tu experiencia recordando tus elecciones:</p>
              <ul>
                <li>Negocios favoritos guardados</li>
                <li>Ubicación preferida para búsquedas</li>
                <li>Categorías de interés</li>
                <li>Configuración de notificaciones</li>
              </ul>

              <h3>4. Cookies de Marketing (Opcional)</h3>
              <p>Nos permiten mostrarte contenido relevante:</p>
              <ul>
                <li>Promociones basadas en tus intereses</li>
                <li>Anuncios personalizados en redes sociales</li>
                <li>Seguimiento de campañas publicitarias</li>
              </ul>
              <p>
                <em>Puedes desactivar estas cookies sin afectar la funcionalidad principal.</em>
              </p>

              <h2>Cookies de Terceros</h2>
              <p>Algunos servicios que usamos también establecen cookies:</p>
              <ul>
                <li>
                  <strong>Google Analytics:</strong> Para análisis de tráfico y comportamiento
                </li>
                <li>
                  <strong>Facebook Pixel:</strong> Para medir efectividad de anuncios
                </li>
                <li>
                  <strong>Google Maps:</strong> Para mostrar ubicaciones de negocios
                </li>
              </ul>

              <h2>Duración de las Cookies</h2>
              <ul>
                <li>
                  <strong>Cookies de Sesión:</strong> Se eliminan cuando cierras el navegador
                </li>
                <li>
                  <strong>Cookies Persistentes:</strong> Permanecen hasta 12 meses o hasta que las elimines
                </li>
              </ul>

              <h2>Cómo Controlar las Cookies</h2>

              <h3>En Nuestro Sitio</h3>
              <p>
                Puedes gestionar tus preferencias de cookies en cualquier momento desde la configuración de tu cuenta o
                haciendo clic en el banner de cookies en la parte inferior del sitio.
              </p>

              <h3>En tu Navegador</h3>
              <p>Todos los navegadores te permiten controlar cookies:</p>
              <ul>
                <li>
                  <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies
                </li>
                <li>
                  <strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies
                </li>
                <li>
                  <strong>Safari:</strong> Preferencias → Privacidad → Cookies
                </li>
                <li>
                  <strong>Edge:</strong> Configuración → Privacidad → Cookies
                </li>
              </ul>

              <h3>Herramientas de Terceros</h3>
              <ul>
                <li>
                  <strong>Google Analytics Opt-out:</strong>{" "}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                    Descargar extensión
                  </a>
                </li>
                <li>
                  <strong>Your Online Choices:</strong>{" "}
                  <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">
                    Gestionar cookies publicitarias
                  </a>
                </li>
              </ul>

              <h2>Impacto de Desactivar Cookies</h2>
              <p>Si desactivas ciertas cookies:</p>
              <ul>
                <li>Es posible que no puedas iniciar sesión</li>
                <li>Algunas funciones pueden no estar disponibles</li>
                <li>Tendrás que reconfigurar preferencias cada vez</li>
                <li>La experiencia puede ser menos personalizada</li>
              </ul>

              <h2>Actualizaciones de esta Política</h2>
              <p>
                Podemos actualizar esta política ocasionalmente para reflejar cambios en nuestras prácticas o por
                razones legales. Te notificaremos de cambios importantes.
              </p>

              <h2>Contacto</h2>
              <p>
                Si tienes preguntas sobre nuestra política de cookies:
                <br />
                <strong>Email:</strong> privacidad@heroescolombia.com
                <br />
                <strong>Teléfono:</strong> +57 (1) 234-5678
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
