"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Particle = {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  duration: number
  delay: number
}

type ConfettiExplosionProps = {
  count?: number
  duration?: number
  onComplete?: () => void
}

export default function ConfettiExplosion({ count = 100, duration = 3000, onComplete }: ConfettiExplosionProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate confetti particles
    const colors = ["#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#fff1f2"]

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 50, // Start from center
      y: 50, // Start from center
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      duration: Math.random() * 1 + 1.5, // 1.5-2.5 seconds
      delay: Math.random() * 0.5, // 0-0.5 second delay
    }))

    setParticles(newParticles)

    // Clean up after animation completes
    const timer = setTimeout(() => {
      setParticles([])
      if (onComplete) onComplete()
    }, duration)

    return () => clearTimeout(timer)
  }, [count, duration, onComplete])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          }}
          initial={{
            scale: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            scale: 1,
            rotate: particle.rotation,
            opacity: [1, 1, 0],
            x: Math.random() * 500 - 250,
            y: Math.random() * 500 - 100,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
