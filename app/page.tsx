import Link from "next/link";
import { Video, MessageCircle, CalendarCheck, Sparkles } from "lucide-react";
import TeacherCard from "@/components/TeacherCard";
import ConjugationStrip from "@/components/ConjugationStrip";
import { getAllTeachersFromDb } from "@/lib/db-teachers";

export default async function HomePage() {
  const teachers = await getAllTeachersFromDb();
  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="eyebrow mb-4">A marketplace, not a school</p>
          <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-6">
            Learn French. Find your teacher.
            <br />
            <span className="italic text-bleu">Speak with confidence.</span>
          </h1>
          <p className="text-ink/60 max-w-md mb-6">
            Search verified French teachers, message them, book a lesson, and
            step straight into a live video classroom — all on FrancoLive.
            No Zoom link, ever.
          </p>
          <ConjugationStrip />
          <div className="flex flex-wrap gap-3 mt-8">
            <Link href="/teachers" className="btn-primary">
              Find a Teacher
            </Link>
            <Link href="/dashboard/teacher" className="btn-secondary">
              Become a Teacher
            </Link>
          </div>
        </div>

        <div className="plaque p-6">
          <p className="eyebrow mb-4">Your Best Matches</p>
          <div className="space-y-3">
            {teachers.slice(0, 3).map((t) => (
              <div key={t.id} className="flex items-center justify-between border-b border-ink/10 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-plaque bg-bleu-soft flex items-center justify-center font-display text-sm text-bleu">
                    {t.avatarInitials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-ink/50">{t.flag} {t.country} · ${t.pricePerHour}/hr</p>
                  </div>
                </div>
                <span className="font-mono text-xs bg-sage/10 text-sage px-2 py-1 rounded-plaque">
                  {t.matchScore}% Match
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-bleu-deep text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="eyebrow text-white/40 mb-3">The FrancoLive path</p>
          <h2 className="font-display text-3xl mb-12 max-w-lg">
            Everything happens on the platform — start to finish.
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: MessageCircle, title: "Find & message", body: "Search teachers or post a request. Chat before you book." },
              { icon: CalendarCheck, title: "Book & pay", body: "Pick a slot, pay securely, it's confirmed instantly." },
              { icon: Video, title: "Join Class", body: "Step into your live French Classroom — video, whiteboard, chat." },
              { icon: Sparkles, title: "Track progress", body: "Get lesson notes, homework, and watch your level climb." },
            ].map((step, idx) => (
              <div key={step.title}>
                <div className="w-10 h-10 rounded-plaque bg-white/10 flex items-center justify-center mb-4">
                  <step.icon size={18} className="text-ochre" />
                </div>
                <p className="font-mono text-xs text-white/30 mb-1">0{idx + 1}</p>
                <p className="font-semibold mb-1">{step.title}</p>
                <p className="text-sm text-white/50">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured teachers */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-3">Find your perfect French teacher</p>
            <h2 className="font-display text-3xl">Meet a few of our teachers</h2>
          </div>
          <Link href="/teachers" className="text-sm font-semibold text-bleu hover:underline hidden md:block">
            View all teachers →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {teachers.map((t) => (
            <TeacherCard key={t.id} teacher={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
