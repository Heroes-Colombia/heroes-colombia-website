"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function TrialCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function calculateTimeLeft(): TimeLeft | null {
    const now = new Date()
    const endDate = new Date("2026-02-01T00:00:00-05:00") // Colombia timezone
    const diff = endDate.getTime() - now.getTime()

    if (diff <= 0) return null

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  if (!timeLeft) return null

  return (
    <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg">
      <Clock className="h-5 w-5 animate-pulse" />
      <div className="text-sm font-medium">La oferta termina en:</div>
      <div className="flex gap-2 font-mono text-base font-bold">
        <div className="bg-white/20 backdrop-blur px-3 py-1 rounded min-w-[3rem] text-center">
          {timeLeft.days}d
        </div>
        <div className="bg-white/20 backdrop-blur px-3 py-1 rounded min-w-[3rem] text-center">
          {timeLeft.hours}h
        </div>
        <div className="bg-white/20 backdrop-blur px-3 py-1 rounded min-w-[3rem] text-center">
          {timeLeft.minutes}m
        </div>
        <div className="bg-white/20 backdrop-blur px-3 py-1 rounded min-w-[2.5rem] text-center">
          {timeLeft.seconds}s
        </div>
      </div>
    </div>
  )
}

// Compact version for sticky header
export function TrialCountdownCompact() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function calculateTimeLeft(): TimeLeft | null {
    const now = new Date()
    const endDate = new Date("2026-02-01T00:00:00-05:00")
    const diff = endDate.getTime() - now.getTime()

    if (diff <= 0) return null

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  if (!timeLeft) return null

  return (
    <div className="inline-flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4" />
      <span className="font-medium">Oferta termina:</span>
      <span className="font-mono font-bold">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
      </span>
    </div>
  )
}
