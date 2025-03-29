/**
 * Sound effects utility for practice modes
 * Handles playing sounds, toggling sound on/off, and managing sound preferences
 */

// Define sound effect URLs
const SOUND_EFFECTS = {
  correct: "/sounds/correct.mp3",
  incorrect: "/sounds/incorrect.mp3",
  victory: "/sounds/victory.mp3",
  click: "/sounds/click.mp3",
  // hint: "/sounds/hint.mp3",
}

// Create audio elements for each sound
const audioElements: { [key: string]: HTMLAudioElement | null } = {}

// Sound settings with localStorage persistence
let soundEnabled = true

// Initialize when in browser environment
if (typeof window !== "undefined") {
  // Load sound preference from localStorage
  try {
    const storedSetting = localStorage.getItem("soundEnabled")
    if (storedSetting !== null) {
      soundEnabled = storedSetting === "true"
    }
  } catch (error) {
    console.error("Failed to access localStorage:", error)
  }

  // Initialize audio elements
  Object.entries(SOUND_EFFECTS).forEach(([key, url]) => {
    try {
      const audio = new Audio(url)
      audio.preload = "auto"
      audio.volume = 0.5
      audioElements[key] = audio
    } catch (error) {
      console.error(`Failed to create audio element for ${key}:`, error)
      audioElements[key] = null
    }
  })
}

export const SoundEffects = {
  // Play a specific sound effect
  play: (sound: keyof typeof SOUND_EFFECTS) => {
    if (!soundEnabled || typeof window === "undefined") return

    try {
      const audio = audioElements[sound]
      if (audio) {
        // Reset the audio to the beginning if it's already playing
        audio.currentTime = 0

        // Create a user interaction promise to handle autoplay restrictions
        const playPromise = audio.play()

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Auto-play was prevented
            console.log("Sound playback prevented:", error)
          })
        }
      }
    } catch (error) {
      console.error("Failed to play sound:", error)
    }
  },

  // Toggle sound on/off
  toggleSound: () => {
    soundEnabled = !soundEnabled
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("soundEnabled", soundEnabled.toString())
      } catch (error) {
        console.error("Failed to save sound setting:", error)
      }
    }

    return soundEnabled
  },

  // Get current sound enabled state
  isSoundEnabled: () => soundEnabled,

  // Set sound enabled state directly
  setSoundEnabled: (enabled: boolean) => {
    soundEnabled = enabled
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("soundEnabled", enabled.toString())
      } catch (error) {
        console.error("Failed to save sound setting:", error)
      }
    }
  },
}

export default SoundEffects

