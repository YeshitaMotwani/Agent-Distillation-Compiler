"use client";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

export default function FeatureCard({ icon, title, description, index }) {
  const Icon = Icons[icon] || Icons.Circle;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card p-6"
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(244,63,94,0.15)" }}>
        <Icon size={20} className="text-rose-400" />
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </motion.div>
  );
}