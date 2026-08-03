import Link from "next/link";
import { Video, BookOpen, Clock, Award } from "lucide-react";
import { learnerDashboard } from "@/lib/mock-data";

export default function LearnerDashboardPage() {
  const { name, level, hoursLearned, lessonsCompleted, nextLesson } = learnerDashboard;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="eyebrow mb-3">Learner dashboard</p>
      <h1 className="font-display text-3xl mb-8">Welcome back, {name}</h1>

      {/* Next lesson — the most important card on the page */}
      <div className="plaque p-6 mb-8 bg-bleu-deep text-white border-0">
        <p className="eyebrow text-white/40 mb-2">Your next lesson</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-xl mb-1">
              With {nextLesson.teacher.name} · {nextLesson.date}, {nextLesson.time}
            </p>
            <p className="text-white/50 text-sm">{nextLesson.teacher.flag} {nextLesson.teacher.country}</p>
          </div>
          <Link
            href={`/classroom/${nextLesson.sessionId}`}
            className="inline-flex items-center gap-2 bg-ochre text-ink font-semibold px-5 py-3 rounded-plaque hover:bg-ochre-deep transition-colors"
          >
            <Video size={16} />
            Join Class
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        {[
          { icon: BookOpen, label: "Current level", value: level },
          { icon: Clock, label: "Hours learned", value: `${hoursLearned}h` },
          { icon: Award, label: "Lessons completed", value: lessonsCompleted },
        ].map((stat) => (
          <div key={stat.label} className="plaque p-5">
            <stat.icon size={16} className="text-bleu mb-3" />
            <p className="font-display text-2xl mb-1">{stat.value}</p>
            <p className="eyebrow">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="plaque p-6">
          <p className="eyebrow mb-4">Latest lesson summary</p>
          <p className="font-semibold mb-2">With {nextLesson.teacher.name} — last Thursday</p>
          <p className="text-xs text-ink/40 mb-1">Vocabulary</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {["Bonjour", "Rendez-vous", "Voyage", "Réserver"].map((w) => (
              <span key={w} className="text-xs font-mono bg-bleu-soft text-bleu px-2 py-1 rounded-plaque">
                {w}
              </span>
            ))}
          </div>
          <p className="text-xs text-ink/40 mb-1">Homework</p>
          <p className="text-sm text-ink/70">Practice introducing yourself in French — record a 1-minute voice note.</p>
        </div>

        <div className="plaque p-6">
          <p className="eyebrow mb-4">Continue learning</p>
          <div className="space-y-3">
            <Link href="/teachers" className="block text-sm font-medium hover:text-bleu">
              → Find another teacher
            </Link>
            <p className="block text-sm font-medium text-ink/40">→ Join a Speaking Club (coming soon)</p>
            <p className="block text-sm font-medium text-ink/40">→ Practice with AI French Coach (coming soon)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
