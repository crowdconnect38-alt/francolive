import { prisma } from "@/lib/prisma";
import type { Teacher } from "@/lib/mock-data";

// Country -> flag emoji, extend as more countries are added.
const FLAGS: Record<string, string> = {
  France: "🇫🇷",
  Belgium: "🇧🇪",
  Canada: "🇨🇦",
  Senegal: "🇸🇳",
  "Ivory Coast": "🇨🇮",
  Cameroon: "🇨🇲",
  USA: "🇺🇸",
};

const AVATAR_COLORS = ["bleu", "ochre", "sage", "rouge"] as const;

function initials(fullName: string) {
  return fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function verificationLabel(v: string): Teacher["verified"] {
  if (v === "TOP") return "top";
  if (v === "EXPERT") return "expert";
  return "verified"; // covers VERIFIED and UNVERIFIED (safe default)
}

// Fetch every teacher from the database and shape it exactly like the old
// mock Teacher type, so TeacherCard and the profile page don't need to change.
export async function getAllTeachersFromDb(): Promise<Teacher[]> {
  const rows = await prisma.teacherProfile.findMany({
    include: { user: true },
    orderBy: { ratingAvg: "desc" },
  });

  return rows.map((row, index) => ({
    id: row.id,
    name: row.user.fullName,
    country: row.user.country ?? "",
    flag: FLAGS[row.user.country ?? ""] ?? "🌍",
    languages: row.languagesSpoken,
    levels: row.levelsTaught,
    specialties: row.specialties,
    pricePerHour: row.pricePerHourCents / 100,
    rating: row.ratingAvg,
    reviewCount: row.ratingCount,
    lessonsGiven: row.lessonsGiven,
    verified: verificationLabel(row.verification),
    bio: row.bio,
    // Placeholder score until real matching logic (section 6 of the spec) is built.
    matchScore: Math.max(80, 98 - index * 3),
    avatarInitials: initials(row.user.fullName),
    avatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
  }));
}

export async function getTeacherByIdFromDb(id: string): Promise<Teacher | null> {
  const row = await prisma.teacherProfile.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!row) return null;

  return {
    id: row.id,
    name: row.user.fullName,
    country: row.user.country ?? "",
    flag: FLAGS[row.user.country ?? ""] ?? "🌍",
    languages: row.languagesSpoken,
    levels: row.levelsTaught,
    specialties: row.specialties,
    pricePerHour: row.pricePerHourCents / 100,
    rating: row.ratingAvg,
    reviewCount: row.ratingCount,
    lessonsGiven: row.lessonsGiven,
    verified: verificationLabel(row.verification),
    bio: row.bio,
    avatarInitials: initials(row.user.fullName),
    avatarColor: "bleu",
  };
}
