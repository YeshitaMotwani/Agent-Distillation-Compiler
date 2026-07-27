"use client";
import { motion } from "framer-motion";

export default function PipelineNode({ title, subtitle }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      className="card px-5 py-4 text-center w-56 mx-auto"
    >
      <div className="font-medium">{title}</div>
      <div className="text-xs text-slate-400 mt-1">{subtitle}</div>
    </motion.div>
  );
}