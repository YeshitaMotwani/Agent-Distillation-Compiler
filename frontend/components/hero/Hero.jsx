"use client";
import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";
import HeroEditor from "./HeroEditor";

export default function Hero() {
  return (
    <section className="section py-20 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <span className="inline-block px-3 py-1 rounded-full text-xs bg-rose-950 text-rose-300 border border-rose-900">
          Final Year ML Systems Project
        </span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Distilling AI Agents into
          <br />
          <span className="gradientText">One Fast Model</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-md">
          A multi-agent coding pipeline compressed into a single-pass student model — comparable accuracy, a fraction of the cost.
        </p>
        <HeroButtons />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <HeroEditor />
      </motion.div>
    </section>
  );
}