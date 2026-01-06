"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import GlobalMap from "@/components/beat-map/global-map"
import GlobalPulseTicker from "@/components/beat-map/global-pulse-ticker"
import SystemHealthWidget from "@/components/beat-map/system-health-widget"
import ModeSwitcher from "@/components/beat-map/mode-switcher"
import ScanningLine from "@/components/beat-map/scanning-line"

export default function BeatMapPage() {
  const [mode, setMode] = useState<"economic" | "social" | "security">("security")
  const [glitch, setGlitch] = useState(false)

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode)
    setGlitch(true)
    setTimeout(() => setGlitch(false), 500)
  }

  return (
    <div className={`w-full h-screen bg-black overflow-hidden relative ${glitch ? "brightness-75" : ""}`}>
      {glitch && (
        <motion.div
          className="absolute inset-0 bg-black/50 pointer-events-none z-50"
          animate={{ opacity: [0.5, 0] }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Global Map */}
      <GlobalMap mode={mode} />

      {/* Scanning Line Effect */}
      <ScanningLine />

      {/* Top Left - Global Pulse Ticker */}
      <motion.div
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-8 left-8 z-20"
      >
        <GlobalPulseTicker mode={mode} />
      </motion.div>

      {/* Top Right - System Health Widget */}
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-8 right-8 z-20"
      >
        <SystemHealthWidget />
      </motion.div>

      {/* Bottom Center - Mode Switcher */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <ModeSwitcher mode={mode} onModeChange={handleModeChange} />
      </motion.div>
    </div>
  )
}
