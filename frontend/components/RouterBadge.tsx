export default function RouterBadge({ route }: { route: "student" | "teacher" }) {
  const isStudent = route === "student";
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${isStudent ? "bg-emerald-900 text-emerald-300" : "bg-blue-900 text-blue-300"}`}>
      {isStudent ? "🧠 Student model" : "👨‍🏫 Teacher pipeline"}
    </span>
  );
}