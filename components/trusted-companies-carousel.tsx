"use client"

import Image from "next/image"
import { useRef, useEffect } from "react"

const companies = [
  { name: "Allianz Seguros", file: "ALLIANZ SEGUROS DE AUTOS Y SALUD_uvQfP3hF.png" },
  { name: "Bari Travel Agency", file: "BARI TRAVEL AGENCY_xiG3wRh3.jpg" },
  { name: "Bitnova", file: "BITNOVA_FrLQTtHC.jpg" },
  { name: "Biker's Paradise", file: "Biker_s Paradise_bRukWDbV.jpg" },
  { name: "Botas Tácticas Colombia", file: "Botas Tácticas Colombia_69UlkrQT.jpg" },
  { name: "Cibercolegio UCN", file: "Cibercolegio UCN y Universidad Católica del Norte_Q2fxpC3w.jpg" },
  { name: "Club Deportivo Intercontinental FC", file: "Club deportivo intercontinental FC_eMByp8uK.png" },
  { name: "Eli María", file: "ELI MARÍA_G4HNonhd.jpg" },
  { name: "Empaques y Regalos RyR", file: "EMPAQUESYREGALOS_ RyR_CIqrp9Jr.jpg" },
  { name: "Gimnasio Marroquín Campestre", file: "Gimnasio Marroquín Campestre_07URsxdf.jpg" },
  { name: "Hepta Cannabis Products", file: "HEPTA Cannabis Products_oBvQDcmK.png" },
  { name: "Home Kids", file: "Home Kids_wtJksN0Z.jpg" },
  { name: "Importaciones", file: "Importaciones_sJPDfR2e.png" },
  { name: "JAZ Arte & Resina", file: "JAZ Arte _ Resina_qVm0o5tF.jpg" },
  { name: "KLAX S.A.S", file: "KLAX S_A_S__Is3KSSgk.jpg" },
  { name: "Khrysos Oro Laminado 18k", file: "Khrysos Oro Laminado 18k_nBUUrEwS.jpg" },
  { name: "Lavandry", file: "LAVANDRY_xfhlo2wk.jpg" },
  { name: "Liceo Infantil Cubos de Colores", file: "Liceo Infantil Cubos de Colores_CyzlVGqY.png" },
  { name: "Murcia Lozada Abogados", file: "MURCIA LOZADA ABOGADOS CONSULTORES_EGwNIc4U.png" },
  { name: "Mi Empresa", file: "Mi Empresa_wQSLfIJ5.jpg" },
  { name: "Muebles y Colchones Sultan", file: "Muebles y Colchones Sultan_UHijxwqq.png" },
  { name: "Na Ser", file: "Na_Ser_wEabvrKH.png" },
  { name: "Paddle Experience Cartagena", file: "PADDLE EXPERIENCE CARTAGENA_bkLGc0Fz.png" },
  { name: "Pasadizo Online", file: "Pasadizo online_ZUS5nStj.jpg" },
  { name: "Pedacito de Amor", file: "Pedacito de Amor_uxA1hvjf.jpg" },
  { name: "Reindustrias", file: "Reindustrias_a2JPkOI4.jpg" },
  { name: "SARMY Store", file: "SARMY STORE_7ahWaKBC.png" },
  { name: "S&I Master Paint SAS", file: "S_I MASTER PAINT SAS_Ew1e95u0.png" },
]

export function TrustedCompaniesCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const autoScroll = () => {
      if (container) {
        scrollPosition += scrollSpeed

        if (scrollPosition >= container.scrollWidth / 2) {
          scrollPosition = 0
        }

        container.scrollLeft = scrollPosition
        animationFrameId = requestAnimationFrame(autoScroll)
      }
    }

    animationFrameId = requestAnimationFrame(autoScroll)

    const handleMouseEnter = () => cancelAnimationFrame(animationFrameId)
    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(autoScroll)
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const duplicatedCompanies = [...companies, ...companies]

  return (
    <div className="relative overflow-hidden">
      {/* Left fade mask */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      {/* Right fade mask */}
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {duplicatedCompanies.map((company, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center w-[220px] h-[200px] overflow-hidden p-2"
            title={company.name}
          >
            <Image
              src={`/images/logos/${encodeURIComponent(company.file)}`}
              alt={company.name}
              width={200}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
