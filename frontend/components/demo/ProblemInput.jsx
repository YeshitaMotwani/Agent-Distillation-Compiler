export default function ProblemInput({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-slate-300 font-medium">Problem</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a function that reverses a string..."
        className="w-full h-40 rounded-lg p-3 text-sm bg-transparent border resize-none focus:outline-none focus:border-rose-500"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      />
    </div>
  );
}