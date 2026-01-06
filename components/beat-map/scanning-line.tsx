"use client"

import { motion } from "framer-motion"

export default function ScanningLine() {
  return (
    <>
      <motion.div
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-b from-[#39FF14] via-[#39FF14] to-transparent pointer-events-none z-10 shadow-lg"
        style={{
          boxShadow: "0 0 20px rgba(57, 255, 20, 0.8), 0 0 40px rgba(0, 243, 255, 0.3)",
        }}
      />
    </>
  )
}
