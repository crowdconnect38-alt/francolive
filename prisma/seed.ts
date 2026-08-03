// Peuple la base avec les mêmes données que lib/mock-data.ts, pour pouvoir
// brancher les pages sur Prisma sans changer le contenu affiché.
//
// Lancer avec : npx prisma db seed
// (nécessite d'ajouter dans package.json :
//   "prisma": { "seed": "ts-node prisma/seed.ts" }
// et npm install -D ts-node)

import { PrismaClient, Role, VerificationLevel } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const teachersData = [
    {
      email: "marie.dubois@example.com",
      fullName: "Marie Dubois",
      country: "France",
      bio: "Certified FLE teacher, 8 years in Lyon and online. I focus on getting you speaking from lesson one.",
      languagesSpoken: ["French", "English", "Spanish"],
      levelsTaught: ["A1", "A2", "B1", "B2"],
      specialties: ["Conversation", "Travel French", "Exam prep (DELF)"],
      pricePerHourCents: 2200,
      verification: VerificationLevel.EXPERT,
      ratingAvg: 4.9,
      ratingCount: 214,
      lessonsGiven: 1840,
    },
    {
      email: "jean.moreau@example.com",
      fullName: "Jean Moreau",
      country: "Belgium",
      bio: "Former corporate trainer. I help professionals reach fluency for work — meetings, emails, negotiation.",
      languagesSpoken: ["French", "English", "Dutch"],
      levelsTaught: ["A2", "B1", "B2", "C1"],
      specialties: ["Business French", "Grammar", "Pronunciation"],
      pricePerHourCents: 2800,
      verification: VerificationLevel.TOP,
      ratingAvg: 4.8,
      ratingCount: 156,
      lessonsGiven: 1120,
    },
    {
      email: "claire.nguyen@example.com",
      fullName: "Claire Nguyen",
      country: "Canada",
      bio: "Québécoise teacher who specializes in true beginners — patient, structured, and fun.",
      languagesSpoken: ["French", "English"],
      levelsTaught: ["Beginner", "A1", "A2"],
      specialties: ["Absolute beginners", "Kids & teens", "Conversation"],
      pricePerHourCents: 1800,
      verification: VerificationLevel.EXPERT,
      ratingAvg: 4.9,
      ratingCount: 302,
      lessonsGiven: 2670,
    },
    {
      email: "amadou.diallo@example.com",
      fullName: "Amadou Diallo",
      country: "Senegal",
      bio: "Native French speaker from Dakar. Warm, structured lessons focused on real spoken fluency.",
      languagesSpoken: ["French", "English", "Wolof"],
      levelsTaught: ["A1", "A2", "B1", "B2", "C1"],
      specialties: ["Conversation", "African French culture", "Exam prep (TCF)"],
      pricePerHourCents: 1500,
      verification: VerificationLevel.VERIFIED,
      ratingAvg: 4.95,
      ratingCount: 189,
      lessonsGiven: 1450,
    },
  ];

  for (const t of teachersData) {
    await prisma.user.upsert({
      where: { email: t.email },
      update: {},
      create: {
        email: t.email,
        fullName: t.fullName,
        country: t.country,
        role: Role.TEACHER,
        teacherProfile: {
          create: {
            bio: t.bio,
            languagesSpoken: t.languagesSpoken,
            levelsTaught: t.levelsTaught,
            specialties: t.specialties,
            pricePerHourCents: t.pricePerHourCents,
            verification: t.verification,
            ratingAvg: t.ratingAvg,
            ratingCount: t.ratingCount,
            lessonsGiven: t.lessonsGiven,
          },
        },
      },
    });
  }

  await prisma.user.upsert({
    where: { email: "sarah@example.com" },
    update: {},
    create: {
      email: "sarah@example.com",
      fullName: "Sarah",
      country: "USA",
      role: Role.LEARNER,
      learnerProfile: {
        create: {
          nativeLanguage: "English",
          currentLevel: "A2",
          goal: "I want to learn French to travel to France next summer.",
          hoursLearned: 18,
          lessonsDone: 12,
        },
      },
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
