"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function SystemHealthWidget() {
  const [latency, setLatency] = useState(24)
  const [bandwidth, setBandwidth] = useState(85)
  const [uptime, setUptime] = useState(99.8)

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => Math.max(15, Math.min(50, prev + (Math.random() - 0.5) * 10)))
      setBandwidth((prev) => Math.max(60, Math.min(95, prev + (Math.random() - 0.5) * 15)))
      setUptime((prev) => Math.max(99, Math.min(100, prev + (Math.random() - 0.5) * 0.5)))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const HealthBar = ({
    label,
    value,
    max = 100,
    unit = "",
  }: {
    label: string
    value: number
    max?: number
    unit?: string
  }) => (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className="text-cyan-400 font-mono">{label}</span>
        <span className="text-green-400 font-mono font-bold">
          {value.toFixed(1)}
          {unit}
        </span>
      </div>
      <div className="w-full h-1 bg-black/60 border border-cyan-400/20 rounded-full overflow-hidden">
        <motion.div
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-gradient-to-r from-cyan-400 to-green-400"
        />
      </div>
    </div>
  )

  return (
    <div className="w-72 backdrop-blur-md bg-black/40 border border-cyan-400/30 rounded-lg p-4 space-y-4">
      <div className="text-cyan-400 text-xs font-mono font-bold tracking-widest">SYSTEM HEALTH</div>

      <div className="space-y-3">
        <HealthBar label="LATENCY" value={latency} max={50} unit="ms" />
        <HealthBar label="BANDWIDTH" value={bandwidth} max={100} unit="%" />
        <HealthBar label="UPTIME" value={uptime} max={100} unit="%" />
      </div>

      <div className="border-t border-cyan-400/20 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-cyan-300/60 text-xs font-mono">STATUS</span>
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
        </div>
      </div>
    </div>
  )
}
