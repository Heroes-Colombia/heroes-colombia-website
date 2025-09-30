"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedStatProps {
  value: string
  label: string
  suffix?: string
}

export function AnimatedStat({ value, label, suffix = "" }: AnimatedStatProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Extract numeric value
  const numericValue = Number.parseInt(value.replace(/[^0-9]/g, ""))
  const hasK = value.includes("K")
  const hasPercent = value.includes("%")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, numericValue])

  const displayValue = hasK ? `${count}K` : hasPercent ? `${count}%` : count

  return (
    <div ref={ref} className="text-center group hover:scale-105 transition-transform">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2 tabular-nums">
        {displayValue}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium">{label}</div>
    </div>
  )
}
