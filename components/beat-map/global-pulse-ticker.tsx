"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const MODE_EVENTS = {
  economic: {
    events: [
      "NYSE: OPEN +0.8%",
      "BTC: +1.2%",
      "SWIFT TRANSFER: LONDON",
      "CURRENCY EXCHANGE: TOKYO",
      "TRADE ROUTE: ACTIVATED",
      "FOREX SPIKE: EUR/USD",
      "COMMODITY: GOLD +2.1%",
      "MARKET CAP: SURGE",
    ],
    title: "ECONOMIC FLOW",
  },
  social: {
    events: [
      "VIRAL: TOKYO #TECH",
      "LIVE STREAM: NYC",
      "TRENDING: #INNOVATION",
      "INFLUENCER: LONDON ACTIVE",
      "ENGAGEMENT: SPIKE",
      "VIRAL VIDEO: DUBAI",
      "HASHTAG TRENDING: #FUTURE",
      "FOLLOWER SURGE: +50K",
    ],
    title: "SOCIAL PULSE",
  },
  security: {
    events: [
      "FIREWALL: BLOCKED",
      "IP TRACE: BERLIN",
      "ANOMALY DETECTED",
      "NETWORK THREAT: NEUTRALIZED",
      "DATA SYNC: SECURE",
      "INTRUSION ATTEMPT: BLOCKED",
      "ENCRYPTION: ACTIVE",
      "PERIMETER: SECURE",
    ],
    title: "SECURITY GRID",
  },
}

interface GlobalPulseTickerProps {
  mode: "economic" | "social" | "security"
}

export default function GlobalPulseTicker({ mode }: GlobalPulseTickerProps) {
  const [events, setEvents] = useState<Array<{ id: number; text: string }>>([])
  const [eventCounter, setEventCounter] = useState(0)

  useEffect(() => {
    setEvents([])
    setEventCounter(0)
  }, [mode])

  useEffect(() => {
    const modeData = MODE_EVENTS[mode]
    const interval = setInterval(
      () => {
        const newEvent = {
          id: eventCounter,
          text: modeData.events[Math.floor(Math.random() * modeData.events.length)],
        }
        setEvents((prev) => [newEvent, ...prev.slice(0, 3)])
        setEventCounter((prev) => prev + 1)
      },
      mode === "social" ? 1000 : 2000,
    )

    return () => clearInterval(interval)
  }, [eventCounter, mode])

  const getColor = () => {
    switch (mode) {
      case "economic":
        return "text-yellow-400"
      case "social":
        return "text-pink-400"
      case "security":
        return "text-cyan-400"
    }
  }

  const getBorderColor = () => {
    switch (mode) {
      case "economic":
        return "border-yellow-400/30"
      case "social":
        return "border-pink-400/30"
      case "security":
        return "border-cyan-400/30"
    }
  }

  const modeData = MODE_EVENTS[mode]

  return (
    <div className={`w-64 backdrop-blur-md bg-black/40 ${getBorderColor()} border rounded-lg p-4 space-y-2`}>
      <div className={`${getColor()} text-xs font-mono font-bold tracking-widest mb-3`}>{modeData.title}</div>

      <div className="space-y-2 h-24 overflow-hidden">
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`${getColor()} text-xs font-mono leading-tight`}
          >
            → {event.text}
          </motion.div>
        ))}
      </div>

      <div className={`border-t ${getBorderColor()} pt-2 mt-2`}>
        <div className={`${getColor()}/60 text-xs font-mono`}>REAL-TIME EVENTS</div>
      </div>
    </div>
  )
}
