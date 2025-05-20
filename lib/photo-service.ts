// Import the photo data directly
import { photos as photoData } from "@/data/photos"

// Export the Photo type
export type Photo = {
  id: string
  src: string
  alt: string
  date: string
  caption: string
  createdAt: Date
}

// Simple function to get photos - no async/await to avoid potential issues
export function getPhotos() {
  try {
    // Create a copy of the array and sort it
    return [...photoData].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  } catch (error) {
    console.error("Error in getPhotos:", error)
    // Return empty array on error
    return []
  }
}
