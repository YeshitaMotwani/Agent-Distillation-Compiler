import { TECH_STACK } from "@/lib/constants";

export default function TechBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      {TECH_STACK.map((t) => (
        <span key={t} className="px-3 py-1.5 rounded-lg text-xs border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          {t}
        </span>
      ))}
    </div>
  );
}