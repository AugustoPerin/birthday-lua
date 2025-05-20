"use client"

import { useState, useEffect } from "react"
import { HeartIcon, Stars } from "lucide-react"
import PhotoGallery from "@/components/photo-gallery"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import FloatingHearts from "@/components/floating-hearts"
import AnimatedBackground from "@/components/animated-background"
import ConfettiExplosion from "@/components/confetti-explosion"

export default function Home() {
  const [showGallery, setShowGallery] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Set loaded after a short delay to trigger entrance animations
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleViewMemories = () => {
    // Show confetti
    setShowConfetti(true)

    // First fade out the hero section with a more elaborate animation
    setHeroVisible(false)

    // Then show the gallery after a delay
    setTimeout(() => {
      setShowGallery(true)
    }, 1200)
  }

  // Staggered text animation for the title
  const titleChars = "Feliz Aniversário".split("")

  return (
    <main className="min-h-screen overflow-hidden relative">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Floating hearts animation */}
      <FloatingHearts />

      {/* Confetti explosion on button click */}
      {showConfetti && <ConfettiExplosion count={150} duration={3000} />}

      {/* Hero Section with Enhanced Animation */}
      <AnimatePresence mode="wait">
        {heroVisible && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -100,
              transition: {
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for a more elegant exit
              },
            }}
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4"
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-20 left-1/4 text-rose-300 opacity-60"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Stars size={40} />
            </motion.div>

            <motion.div
              className="absolute bottom-40 right-1/4 text-rose-300 opacity-60"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            >
              <Stars size={30} />
            </motion.div>

            <div className="z-10 text-center max-w-3xl mx-auto">
              {/* Animated title with character-by-character reveal */}
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mr-2"
                >
                  <HeartIcon className="h-8 w-8 text-rose-500 animate-pulse" />
                </motion.div>

                <div className="flex overflow-hidden">
                  {titleChars.map((char, index) => (
                    <motion.span
                      key={`${char}-${index}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={loaded ? { y: 0, opacity: 1 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.7 + index * 0.05,
                        ease: [0.215, 0.61, 0.355, 1], // Custom easing for a bouncy effect
                      }}
                      className="text-5xl md:text-7xl font-bold text-rose-800 font-serif inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="ml-2"
                >
                  <HeartIcon className="h-8 w-8 text-rose-500 animate-pulse" />
                </motion.div>
              </div>

              {/* Subtitle with reveal animation */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="text-xl md:text-2xl text-rose-700 mb-8 italic"
              >
                Celebrando nosso amor e memórias juntos
              </motion.p>

              {/* Button with hover animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={loaded ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 2.2,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-6 rounded-full text-lg relative overflow-hidden group"
                  onClick={handleViewMemories}
                >
                  {/* Button shine effect */}
                  <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out" />
                  Ver Nossas Memórias
                </Button>
              </motion.div>
            </div>

            {/* Animated bounce indicator */}
            <motion.div
              className="absolute bottom-8 left-0 right-0 flex justify-center"
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <HeartIcon className="h-8 w-8 text-rose-500" />
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Gallery Section with enhanced transitions */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <PhotoGallery />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - only show when hero is visible */}
      {heroVisible && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 2.8, duration: 1 }}
          className="bg-rose-200 py-8 text-center text-rose-800"
        >
          <p className="text-lg">Com amor, para sempre e sempre ❤️</p>
        </motion.footer>
      )}
    </main>
  )
}
