import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <FileText className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Términos y Condiciones</h1>
              <p className="text-muted-foreground">Última actualización: {new Date().toLocaleDateString("es-CO")}</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>1. Aceptación de los Términos</h2>
              <p>
                Al acceder y usar Héroes Colombia, aceptas estar sujeto a estos Términos y Condiciones. Si no estás de
                acuerdo, por favor no uses nuestros servicios.
              </p>

              <h2>2. Elegibilidad</h2>
              <p>Para usar Héroes Colombia debes:</p>
              <ul>
                <li>Ser miembro activo o retirado de las Fuerzas Militares o Policía Nacional de Colombia</li>
                <li>Ser mayor de 18 años</li>
                <li>Proporcionar información de verificación verdadera y precisa</li>
                <li>Mantener la confidencialidad de tu cuenta</li>
              </ul>

              <h2>3. Verificación Militar</h2>
              <p>
                Nos reservamos el derecho de verificar tu estatus militar en cualquier momento. Si proporcionas
                información falsa o no puedes verificar tu identidad, podemos suspender o cancelar tu cuenta
                inmediatamente.
              </p>

              <h2>4. Uso de la Plataforma</h2>
              <p>Te comprometes a:</p>
              <ul>
                <li>Usar la plataforma solo para fines personales y legales</li>
                <li>No compartir tu cuenta con personas no elegibles</li>
                <li>No intentar acceder a áreas restringidas del sistema</li>
                <li>No usar la plataforma para actividades fraudulentas</li>
                <li>No revender o transferir beneficios a terceros</li>
              </ul>

              <h2>5. Promociones y Descuentos</h2>
              <ul>
                <li>Las promociones son ofrecidas por negocios aliados, no por Héroes Colombia directamente</li>
                <li>Los descuentos están sujetos a disponibilidad y términos específicos de cada negocio</li>
                <li>Héroes Colombia no es responsable si un negocio no honra una promoción</li>
                <li>Las promociones pueden cambiar o terminar sin previo aviso</li>
                <li>Un descuento solo puede canjearse una vez por usuario, salvo que se indique lo contrario</li>
              </ul>

              <h2>6. Cuenta de Usuario</h2>
              <p>Eres responsable de:</p>
              <ul>
                <li>Mantener tu contraseña segura y confidencial</li>
                <li>Todas las actividades que ocurran bajo tu cuenta</li>
                <li>Notificarnos inmediatamente de cualquier uso no autorizado</li>
                <li>Mantener tu información de contacto actualizada</li>
              </ul>

              <h2>7. Propiedad Intelectual</h2>
              <p>
                Todos los contenidos, marcas, logos y materiales en Héroes Colombia son propiedad de la empresa o sus
                licenciantes. No puedes copiar, modificar o distribuir ningún contenido sin autorización escrita.
              </p>

              <h2>8. Limitación de Responsabilidad</h2>
              <p>Héroes Colombia no es responsable por:</p>
              <ul>
                <li>Daños indirectos, incidentales o consecuentes del uso de la plataforma</li>
                <li>Pérdida de datos, ganancias o ahorros esperados</li>
                <li>Interrupciones del servicio o errores técnicos</li>
                <li>Acciones u omisiones de negocios aliados</li>
                <li>Contenido generado por usuarios</li>
              </ul>

              <h2>9. Modificaciones del Servicio</h2>
              <p>
                Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte del servicio en
                cualquier momento, con o sin previo aviso.
              </p>

              <h2>10. Terminación</h2>
              <p>Podemos terminar o suspender tu cuenta si:</p>
              <ul>
                <li>Violas estos términos</li>
                <li>Proporcionas información falsa</li>
                <li>Usas la plataforma de manera fraudulenta</li>
                <li>Ya no eres elegible para los beneficios</li>
              </ul>

              <h2>11. Ley Aplicable</h2>
              <p>
                Estos términos se rigen por las leyes de Colombia. Cualquier disputa será resuelta en los tribunales de
                Bogotá, Colombia.
              </p>

              <h2>12. Cambios a los Términos</h2>
              <p>
                Podemos actualizar estos términos ocasionalmente. Te notificaremos de cambios importantes. El uso
                continuado del servicio después de cambios constituye aceptación de los nuevos términos.
              </p>

              <h2>13. Contacto</h2>
              <p>
                Para preguntas sobre estos términos, contáctanos en:
                <br />
                <strong>Email:</strong> legal@heroescolombia.com
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
