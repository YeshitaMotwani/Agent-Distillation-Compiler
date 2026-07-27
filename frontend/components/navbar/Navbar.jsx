"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Link as LinkIcon } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[72px] border-b backdrop-blur" style={{ borderColor: "var(--border)", background: "rgba(15,23,42,0.8)" }}>
      <div className="section h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(244,63,94,0.15)" }}>
            <span className="text-rose-400 font-bold text-sm">AD</span>
          </div>
          <div>
            <div className="font-semibold text-sm">Agent Distillation Compiler</div>
            <div className="text-xs text-slate-400">Hybrid Student-Teacher AI</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-slate-300 hover:text-white transition relative pb-1",
                pathname === item.href && "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-rose-500"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
         <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">
            <LinkIcon size={20} />
        </a>
          <Link href="/demo" className="px-4 py-2 rounded-lg text-sm font-medium bg-rose-600 hover:bg-rose-500 text-white transition">
            Get Started
          </Link>
        </div>

        <button className="md:hidden text-slate-300" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ borderColor: "var(--border)", background: "var(--background)" }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-300" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/demo" className="w-full text-center px-4 py-2 rounded-lg text-sm font-medium bg-rose-600 text-white">
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}