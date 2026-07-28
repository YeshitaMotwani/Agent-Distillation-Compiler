import { TEAM } from "@/lib/constants";

export default function TeamGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {TEAM.map((m) => (
        <a key={m.name} href={`https://github.com/${m.github}`} target="_blank" rel="noreferrer" className="card p-5 hover:border-rose-500 transition">
          <div className="font-semibold">{m.name}</div>
          <div className="text-sm text-slate-400 mt-1">{m.role}</div>
        </a>
      ))}
    </div>
  );
}