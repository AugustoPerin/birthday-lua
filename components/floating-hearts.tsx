"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { HeartIcon } from "lucide-react"

type Heart = {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position (0-100%)
      size: Math.random() * 20 + 10, // Random size (10-30px)
      delay: Math.random() * 5, // Random delay (0-5s)
      duration: Math.random() * 10 + 15, // Random duration (15-25s)
      opacity: Math.random() * 0.3 + 0.1, // Random opacity (0.1-0.4)
    }))

    setHearts(initialHearts)

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 20 + 10,
          delay: 0,
          duration: Math.random() * 10 + 15,
          opacity: Math.random() * 0.3 + 0.1,
        },
      ])
    }, 3000)

    // Clean up old hearts periodically
    const cleanup = setInterval(() => {
      setHearts((prev) => {
        if (prev.length > 30) {
          return prev.slice(prev.length - 30)
        }
        return prev
      })
    }, 10000)

    return () => {
      clearInterval(interval)
      clearInterval(cleanup)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0"
          style={{ left: `${heart.x}%` }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{
            y: "-100%",
            opacity: [0, heart.opacity, 0],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            times: [0, 0.2, 0.8, 1],
          }}
        >
          <HeartIcon style={{ width: heart.size, height: heart.size }} className="text-rose-300" />
        </motion.div>
      ))}
    </div>
  )
}
