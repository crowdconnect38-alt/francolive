import Link from "next/link";
import { Video, DollarSign, Users, BookOpen } from "lucide-react";
import { teacherDashboard, learningRequests } from "@/lib/mock-data";

export default function TeacherDashboardPage() {
  const { name, lessonsThisMonth, studentsActive, earningsThisMonth, upcoming } = teacherDashboard;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="eyebrow mb-3">Teacher dashboard</p>
      <h1 className="font-display text-3xl mb-8">Welcome back, {name}</h1>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        {[
          { icon: BookOpen, label: "Lessons this month", value: lessonsThisMonth },
          { icon: Users, label: "Active students", value: studentsActive },
          { icon: DollarSign, label: "Earnings this month", value: `$${earningsThisMonth}` },
        ].map((stat) => (
          <div key={stat.label} className="plaque p-5">
            <stat.icon size={16} className="text-bleu mb-3" />
            <p className="font-display text-2xl mb-1">{stat.value}</p>
            <p className="eyebrow">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="plaque p-6">
          <p className="eyebrow mb-4">Upcoming lessons</p>
          <div className="space-y-3">
            {upcoming.map((u) => (
              <div key={u.sessionId} className="flex items-center justify-between border-b border-ink/10 last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="text-sm font-semibold">{u.learner}</p>
                  <p className="text-xs text-ink/50">{u.date} · {u.time}</p>
                </div>
                <Link
                  href={`/classroom/${u.sessionId}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-bleu text-white px-3 py-2 rounded-plaque hover:bg-bleu-deep"
                >
                  <Video size={13} />
                  Join
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="plaque p-6">
          <p className="eyebrow mb-4">New learning requests matching you</p>
          <div className="space-y-3">
            {learningRequests.map((r) => (
              <div key={r.id} className="border-b border-ink/10 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold">{r.learnerName} · {r.country}</p>
                  <span className="text-[10px] text-ink/40 font-mono">{r.postedAt}</span>
                </div>
                <p className="text-xs text-ink/60 mb-1">{r.goal}</p>
                <p className="text-xs text-ink/40 font-mono">
                  {r.level} · {r.lessonsPerWeek}x/week · ${r.budget}/hr budget
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
