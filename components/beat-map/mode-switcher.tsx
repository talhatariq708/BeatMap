"use client"

import { motion } from "framer-motion"

type Mode = "economic" | "social" | "security"

interface ModeSwitcherProps {
  mode: Mode
  onModeChange: (mode: Mode) => void
}

const MODES: Array<{ id: Mode; label: string; description: string; color: string; borderColor: string }> = [
  {
    id: "economic",
    label: "ECONOMIC FLOW",
    description: "Global trade & finance",
    color: "text-yellow-400",
    borderColor: "border-yellow-400",
  },
  {
    id: "social",
    label: "SOCIAL PULSE",
    description: "Digital connectivity",
    color: "text-pink-400",
    borderColor: "border-pink-400",
  },
  {
    id: "security",
    label: "SECURITY GRID",
    description: "Threat intelligence",
    color: "text-cyan-400",
    borderColor: "border-cyan-400",
  },
]

export default function ModeSwitcher({ mode, onModeChange }: ModeSwitcherProps) {
  const activeModeData = MODES.find((m) => m.id === mode)

  return (
    <div className="backdrop-blur-md bg-black/40 border border-cyan-400/30 rounded-lg p-2">
      <div className="flex gap-2">
        {MODES.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className="relative px-4 py-2 text-xs font-mono font-bold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mode === m.id && (
              <motion.div
                layoutId="active-mode"
                className={`absolute inset-0 ${m.borderColor}/20 border ${m.borderColor} rounded`}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${mode === m.id ? m.color : "text-cyan-300/50 hover:text-cyan-300"}`}>
              {m.label}
            </span>
          </motion.button>
        ))}
      </div>
      <div className="mt-2 text-xs text-green-400/70 font-mono text-center">{activeModeData?.description}</div>
    </div>
  )
}
