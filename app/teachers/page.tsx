import TeacherCard from "@/components/TeacherCard";
import { getAllTeachersFromDb } from "@/lib/db-teachers";
import { Search, SlidersHorizontal } from "lucide-react";

const FILTER_GROUPS = [
  { label: "Level", options: ["Beginner", "A1", "A2", "B1", "B2", "C1"] },
  { label: "Price", options: ["Under $15", "$15–25", "$25+"] },
  { label: "Specialty", options: ["Conversation", "Business", "Exam prep", "Kids"] },
];

export default async function TeachersPage() {
  const teachers = await getAllTeachersFromDb();
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="eyebrow mb-3">Find your perfect French teacher</p>
      <h1 className="font-display text-3xl mb-8">Search teachers</h1>

      <div className="plaque p-4 mb-8 flex flex-col md:flex-row gap-4 md:items-center">
        <div className="flex items-center gap-2 flex-1 bg-paper rounded-plaque px-3 py-2 border border-ink/10">
          <Search size={16} className="text-ink/40" />
          <input
            className="bg-transparent outline-none text-sm w-full placeholder:text-ink/40"
            placeholder="Search by name, country, or specialty…"
          />
        </div>
        <button className="btn-secondary text-sm px-4 py-2">
          <SlidersHorizontal size={14} />
          Filters
        </button>
      </div>

      <div className="flex flex-wrap gap-6 mb-8">
        {FILTER_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="eyebrow mb-2">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.options.map((opt) => (
                <button
                  key={opt}
                  className="text-xs font-medium border border-ink/15 rounded-plaque px-3 py-1.5 hover:bg-bleu-soft hover:border-bleu/30 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-ink/50 mb-4">{teachers.length} teachers match your search</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teachers.map((t) => (
          <TeacherCard key={t.id} teacher={t} />
        ))}
      </div>
    </div>
  );
}
