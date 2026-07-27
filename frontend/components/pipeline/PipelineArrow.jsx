"use client";
import { motion } from "framer-motion";

export default function PipelineArrow() {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="w-px h-8 mx-auto origin-top"
      style={{ background: "var(--border)" }}
    />
  );
}