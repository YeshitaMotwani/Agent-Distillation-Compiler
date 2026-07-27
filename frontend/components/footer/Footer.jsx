export default function Footer() {
  return (
    <footer className="border-t py-8 mt-10" style={{ borderColor: "var(--border)" }}>
      <div className="section flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-400">
        <span>Agent Distillation Compiler — Research Project</span>
        <span>MIT License · <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a></span>
      </div>
    </footer>
  );
}