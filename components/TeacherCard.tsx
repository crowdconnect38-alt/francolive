import Link from "next/link";
import { Star, BadgeCheck } from "lucide-react";
import type { Teacher } from "@/lib/mock-data";

const colorMap: Record<string, string> = {
  bleu: "bg-bleu text-white",
  ochre: "bg-ochre text-ink",
  sage: "bg-sage text-white",
  rouge: "bg-rouge text-white",
};

const verifiedLabel: Record<Teacher["verified"], string> = {
  verified: "Verified Teacher",
  top: "Top Teacher",
  expert: "Expert Teacher",
};

export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <Link href={`/teachers/${teacher.id}`} className="plaque p-5 flex flex-col gap-4 hover:-translate-y-0.5 transition-transform">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-plaque flex items-center justify-center font-display text-lg ${colorMap[teacher.avatarColor]}`}
          >
            {teacher.avatarInitials}
          </div>
          <div>
            <p className="font-body font-semibold leading-tight">{teacher.name}</p>
            <p className="text-xs text-ink/50">
              {teacher.flag} {teacher.country}
            </p>
          </div>
        </div>
        {teacher.matchScore && (
          <span className="font-mono text-xs bg-bleu-soft text-bleu px-2 py-1 rounded-plaque">
            {teacher.matchScore}% Match
          </span>
        )}
      </div>

      <p className="text-sm text-ink/70 leading-snug line-clamp-2">{teacher.bio}</p>

      <div className="flex flex-wrap gap-1.5">
        {teacher.specialties.slice(0, 2).map((s) => (
          <span key={s} className="text-[11px] font-mono uppercase tracking-wide bg-ink/5 px-2 py-1 rounded-plaque text-ink/60">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-ink/10 text-sm">
        <div className="flex items-center gap-1 text-ink/70">
          <Star size={14} className="fill-ochre text-ochre" />
          <span className="font-semibold">{teacher.rating}</span>
          <span className="text-ink/40">({teacher.reviewCount})</span>
        </div>
        <div className="flex items-center gap-1 text-sage text-xs font-medium">
          <BadgeCheck size={14} />
          {verifiedLabel[teacher.verified]}
        </div>
        <p className="font-mono font-semibold">${teacher.pricePerHour}/hr</p>
      </div>
    </Link>
  );
}
