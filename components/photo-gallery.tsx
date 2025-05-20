"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Heart, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPhotos } from "@/lib/photo-service"
import { motion, AnimatePresence } from "framer-motion"
import type { Photo } from "@/data/photos"

// Animation variants
const slideAnimations = [
  {
    initial: { opacity: 0, x: 300, scale: 0.8 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -300, scale: 0.8 },
    transition: { duration: 0.7 },
  },
  {
    initial: { opacity: 0, y: 300, rotate: 5 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: -300, rotate: -5 },
    transition: { duration: 0.7 },
  },
  {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.3 },
    transition: { duration: 0.8 },
  },
]

export default function PhotoGallery() {
  // State
  const [photos, setPhotos] = useState<Photo[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({})

  // Load photos on mount
  useEffect(() => {
    try {
      // Get photos directly (no async/await)
      const photoList = getPhotos()
      setPhotos(photoList)

      if (photoList.length === 0) {
        setError("No photos found. Please check your images folder.")
      }
    } catch (err) {
      console.error("Error loading photos:", err)
      setError("Failed to load photos. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  // Navigation functions
  const nextPhoto = () => {
    if (photos.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    }
  }

  const prevPhoto = () => {
    if (photos.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
    }
  }

  const toggleLike = (id: string) => {
    setIsLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const closeGallery = () => {
    // Navigate back to home page
    window.location.href = "/"
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextPhoto()
      if (e.key === "ArrowLeft") prevPhoto()
      if (e.key === "Escape") closeGallery()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/90 z-50">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-rose-400 rounded-full"></div>
          <div className="h-3 w-3 bg-rose-400 rounded-full"></div>
          <div className="h-3 w-3 bg-rose-400 rounded-full"></div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || photos.length === 0) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/90 z-50">
        <div className="text-center p-8 bg-white/10 backdrop-blur-md rounded-lg max-w-md">
          <h3 className="text-xl font-medium text-white mb-2">{error || "No photos available"}</h3>
          <p className="text-rose-200 mb-4">
            {error ? "There was a problem loading the photos." : "Your love story is waiting to be told."}
          </p>
          <Button onClick={closeGallery} className="bg-rose-600 hover:bg-rose-700">
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  // Guard against empty photos array
  if (photos.length === 0) {
    return null
  }

  const currentPhoto = photos[currentIndex]
  const animationVariant = slideAnimations[currentIndex % slideAnimations.length]

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-10 text-white hover:bg-white/20 rounded-full"
        onClick={closeGallery}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full h-12 w-12"
        onClick={prevPhoto}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full h-12 w-12"
        onClick={nextPhoto}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Photo display */}
      <div className="w-full h-full flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id}
            initial={animationVariant.initial}
            animate={animationVariant.animate}
            exit={animationVariant.exit}
            transition={animationVariant.transition}
            className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col"
          >
            <div className="relative flex-1 min-h-0 overflow-hidden rounded-t-lg">
              <Image
                src={currentPhoto.src || "/placeholder.svg"}
                alt={currentPhoto.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>

            {/* Caption */}
            <div className="bg-black/50 backdrop-blur-sm p-4 rounded-b-lg text-white mt-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium">{currentPhoto.caption}</h3>
                  <p className="text-rose-200">{currentPhoto.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${isLiked[currentPhoto.id] ? "text-rose-500" : "text-white"} hover:bg-white/10`}
                    onClick={() => toggleLike(currentPhoto.id)}
                  >
                    <Heart className={`h-5 w-5 ${isLiked[currentPhoto.id] ? "fill-rose-500" : ""}`} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => {
                      const link = document.createElement("a")
                      link.href = currentPhoto.src
                      link.download = `${currentPhoto.caption || "photo"}.jpg`
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Photo counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 font-medium">
        {currentIndex + 1} / {photos.length}
      </div>
    </div>
  )
}
