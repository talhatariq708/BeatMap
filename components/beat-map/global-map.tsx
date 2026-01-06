"use client"
import { motion } from "framer-motion"

interface City {
  name: string
  lat: number
  lon: number
  x: number
  y: number
}

const CITIES: City[] = [
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, x: 0, y: 0 },
  { name: "New York", lat: 40.7128, lon: -74.006, x: 0, y: 0 },
  { name: "London", lat: 51.5074, lon: -0.1278, x: 0, y: 0 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708, x: 0, y: 0 },
]

const TRADE_ROUTES = [
  { from: "Tokyo", to: "Dubai" },
  { from: "New York", to: "London" },
  { from: "London", to: "Dubai" },
]

interface GlobalMapProps {
  mode: "economic" | "social" | "security"
}

export default function GlobalMap({ mode }: GlobalMapProps) {
  const getColorScheme = () => {
    switch (mode) {
      case "economic":
        return {
          primary: "#FFD700",
          primaryRgba: "rgba(255, 215, 0, 1)",
          primaryRgbaFade: "rgba(255, 215, 0, 0.6)",
          borderColor: "#FFD700",
        }
      case "social":
        return {
          primary: "#FF00FF",
          primaryRgba: "rgba(255, 0, 255, 1)",
          primaryRgbaFade: "rgba(255, 0, 255, 0.6)",
          borderColor: "#FF00FF",
        }
      case "security":
        return {
          primary: "#00F3FF",
          primaryRgba: "rgba(0, 243, 255, 1)",
          primaryRgbaFade: "rgba(0, 243, 255, 0.6)",
          borderColor: "#00F3FF",
        }
    }
  }

  const getAnimationDuration = () => {
    return mode === "social" ? 0.8 : 1.5
  }

  const colors = getColorScheme()
  const duration = getAnimationDuration()

  return (
    <div className="absolute inset-0 w-full h-full bg-black z-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        style={{ zIndex: 0 }}
      >
        {/* Ocean background */}
        <rect width="1920" height="1080" fill="#000000" />

        {/* Continents - hardcoded SVG paths in dark charcoal */}
        <g fill="#1A1A1A" stroke="#2A2A2A" strokeWidth="1">
          {/* North America */}
          <polygon points="200,300 320,250 380,200 420,300 380,450 280,480 220,400" />

          {/* South America */}
          <polygon points="350,450 400,480 420,650 380,700 300,650 290,500" />

          {/* Europe */}
          <polygon points="650,200 750,180 800,250 750,350 650,340" />

          {/* Africa */}
          <polygon points="750,350 900,300 950,500 900,700 750,720 700,500" />

          {/* Middle East */}
          <polygon points="900,300 1050,280 1100,400 1000,450 920,380" />

          {/* Asia */}
          <polygon points="1050,180 1300,160 1400,250 1350,450 1200,500 1050,400" />

          {/* Southeast Asia */}
          <polygon points="1200,400 1350,420 1380,550 1250,580 1180,500" />

          {/* Australia */}
          <polygon points="1350,650 1450,640 1480,800 1400,850 1320,800" />
        </g>

        {/* Subtle grid overlay */}
        <g stroke="rgba(42, 42, 42, 0.2)" strokeWidth="0.5">
          <line x1="0" y1="270" x2="1920" y2="270" />
          <line x1="0" y1="540" x2="1920" y2="540" />
          <line x1="0" y1="810" x2="1920" y2="810" />
          <line x1="320" y1="0" x2="320" y2="1080" />
          <line x1="640" y1="0" x2="640" y2="1080" />
          <line x1="960" y1="0" x2="960" y2="1080" />
          <line x1="1280" y1="0" x2="1280" y2="1080" />
          <line x1="1600" y1="0" x2="1600" y2="1080" />
        </g>

        {mode === "economic" && (
          <g stroke={colors.borderColor} strokeWidth="1.5" opacity="0.6">
            <line x1="1570" y1="378" x2="980" y2="340" />
            <line x1="300" y1="340" x2="700" y2="270" />
            <line x1="700" y1="270" x2="980" y2="340" />
          </g>
        )}
      </svg>

      {/* Tokyo - top: 35%, left: 82% */}
      <motion.div
        className="absolute w-16 h-16 pointer-events-none"
        style={{
          top: "35%",
          left: "82%",
          transform: "translate(-50%, -50%)",
          zIndex: 5,
        }}
      >
        <div className="relative w-full h-full">
          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"
            style={{
              backgroundColor: colors.primary,
              boxShadow: `0 0 12px ${colors.primaryRgba}`,
            }}
          />
          {/* Pulsing rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-full border rounded-full"
            animate={{ scale: [1, 2.5, 3.5], opacity: [1, 0.5, 0] }}
            transition={{ duration, repeat: Number.POSITIVE_INFINITY }}
            style={{
              transform: "translate(-50%, -50%)",
              borderColor: colors.borderColor,
              boxShadow: `0 0 15px ${colors.primaryRgbaFade}`,
            }}
          />
        </div>
      </motion.div>

      {/* New York - top: 32%, left: 28% */}
      <motion.div
        className="absolute w-16 h-16 pointer-events-none"
        style={{
          top: "32%",
          left: "28%",
          transform: "translate(-50%, -50%)",
          zIndex: 5,
        }}
      >
        <div className="relative w-full h-full">
          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"
            style={{
              backgroundColor: colors.primary,
              boxShadow: `0 0 12px ${colors.primaryRgba}`,
            }}
          />
          {/* Pulsing rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-full border rounded-full"
            animate={{ scale: [1, 2.5, 3.5], opacity: [1, 0.5, 0] }}
            transition={{ duration, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
            style={{
              transform: "translate(-50%, -50%)",
              borderColor: colors.borderColor,
              boxShadow: `0 0 15px ${colors.primaryRgbaFade}`,
            }}
          />
        </div>
      </motion.div>

      {/* London - top: 26%, left: 48% */}
      <motion.div
        className="absolute w-16 h-16 pointer-events-none"
        style={{
          top: "26%",
          left: "48%",
          transform: "translate(-50%, -50%)",
          zIndex: 5,
        }}
      >
        <div className="relative w-full h-full">
          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"
            style={{
              backgroundColor: colors.primary,
              boxShadow: `0 0 12px ${colors.primaryRgba}`,
            }}
          />
          {/* Pulsing rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-full border rounded-full"
            animate={{ scale: [1, 2.5, 3.5], opacity: [1, 0.5, 0] }}
            transition={{ duration, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
            style={{
              transform: "translate(-50%, -50%)",
              borderColor: colors.borderColor,
              boxShadow: `0 0 15px ${colors.primaryRgbaFade}`,
            }}
          />
        </div>
      </motion.div>

      {/* Dubai - top: 42%, left: 65% */}
      <motion.div
        className="absolute w-16 h-16 pointer-events-none"
        style={{
          top: "42%",
          left: "65%",
          transform: "translate(-50%, -50%)",
          zIndex: 5,
        }}
      >
        <div className="relative w-full h-full">
          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"
            style={{
              backgroundColor: colors.primary,
              boxShadow: `0 0 12px ${colors.primaryRgba}`,
            }}
          />
          {/* Pulsing rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-full h-full border rounded-full"
            animate={{ scale: [1, 2.5, 3.5], opacity: [1, 0.5, 0] }}
            transition={{ duration, repeat: Number.POSITIVE_INFINITY, delay: 0.9 }}
            style={{
              transform: "translate(-50%, -50%)",
              borderColor: colors.borderColor,
              boxShadow: `0 0 15px ${colors.primaryRgbaFade}`,
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}
