import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, BadgeCheck, MessageCircle, Heart } from "lucide-react";
import { getTeacherByIdFromDb } from "@/lib/db-teachers";

const colorMap: Record<string, string> = {
  bleu: "bg-bleu text-white",
  ochre: "bg-ochre text-ink",
  sage: "bg-sage text-white",
  rouge: "bg-rouge text-white",
};

export default async function TeacherProfilePage({ params }: { params: { id: string } }) {
  const teacher = await getTeacherByIdFromDb(params.id);
  if (!teacher) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
      <div className="md:col-span-2">
        <div className="flex items-start gap-5 mb-6">
          <div
            className={`w-20 h-20 rounded-plaque flex items-center justify-center font-display text-2xl shrink-0 ${colorMap[teacher.avatarColor]}`}
          >
            {teacher.avatarInitials}
          </div>
          <div>
            <h1 className="font-display text-3xl mb-1">{teacher.name}</h1>
            <p className="text-ink/50 text-sm mb-2">
              {teacher.flag} {teacher.country} · Speaks {teacher.languages.join(", ")}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-ochre text-ochre" />
                <strong>{teacher.rating}</strong>
                <span className="text-ink/40">({teacher.reviewCount} reviews)</span>
              </span>
              <span className="flex items-center gap-1 text-sage font-medium">
                <BadgeCheck size={14} />
                Expert Teacher
              </span>
            </div>
          </div>
        </div>

        <div className="plaque p-6 mb-6">
          <p className="eyebrow mb-3">About</p>
          <p className="text-ink/70 leading-relaxed">{teacher.bio}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="plaque p-6">
            <p className="eyebrow mb-3">Teaches</p>
            <div className="flex flex-wrap gap-2">
              {teacher.levels.map((l) => (
                <span key={l} className="text-xs font-mono bg-bleu-soft text-bleu px-2 py-1 rounded-plaque">
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="plaque p-6">
            <p className="eyebrow mb-3">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {teacher.specialties.map((s) => (
                <span key={s} className="text-xs font-mono bg-ink/5 px-2 py-1 rounded-plaque text-ink/60">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="plaque p-6">
          <p className="eyebrow mb-4">Reviews</p>
          <div className="space-y-4">
            {[
              { name: "Sarah", text: "Marie is patient and structures every lesson around real conversation. Loved it." },
              { name: "Tom", text: "Booked for travel prep and felt ready within a month. Highly recommend." },
            ].map((r) => (
              <div key={r.name} className="border-b border-ink/10 last:border-0 pb-4 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className="fill-ochre text-ochre" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-ink/60">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking sidebar */}
      <aside className="md:col-span-1">
        <div className="plaque p-6 sticky top-24">
          <p className="font-mono text-2xl font-semibold mb-1">${teacher.pricePerHour}<span className="text-sm text-ink/40">/hr</span></p>
          <p className="text-xs text-ink/50 mb-5">{teacher.lessonsGiven.toLocaleString()} lessons given</p>
          <Link href={`/booking?teacher=${teacher.id}`} className="btn-primary w-full mb-3">
            Book a Lesson
          </Link>
          <button className="btn-secondary w-full mb-3">
            <MessageCircle size={16} />
            Message
          </button>
          <button className="w-full flex items-center justify-center gap-2 text-sm text-ink/50 hover:text-rouge py-2">
            <Heart size={14} />
            Add to Favorites
          </button>
        </div>
      </aside>
    </div>
  );
}
