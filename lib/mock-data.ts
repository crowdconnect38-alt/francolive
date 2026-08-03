// Mock data layer. Replace each function with real DB queries (Prisma/Drizzle
// over Postgres) once the schema described in README.md is wired up.

export type Teacher = {
  id: string;
  name: string;
  country: string;
  flag: string;
  languages: string[];
  levels: string[];
  specialties: string[];
  pricePerHour: number;
  rating: number;
  reviewCount: number;
  lessonsGiven: number;
  verified: "verified" | "top" | "expert";
  bio: string;
  matchScore?: number;
  avatarInitials: string;
  avatarColor: string;
};

export const teachers: Teacher[] = [
  {
    id: "marie-dubois",
    name: "Marie Dubois",
    country: "France",
    flag: "🇫🇷",
    languages: ["French", "English", "Spanish"],
    levels: ["A1", "A2", "B1", "B2"],
    specialties: ["Conversation", "Travel French", "Exam prep (DELF)"],
    pricePerHour: 22,
    rating: 4.9,
    reviewCount: 214,
    lessonsGiven: 1840,
    verified: "expert",
    bio: "Certified FLE teacher, 8 years in Lyon and online. I focus on getting you speaking from lesson one.",
    matchScore: 96,
    avatarInitials: "MD",
    avatarColor: "bleu",
  },
  {
    id: "jean-moreau",
    name: "Jean Moreau",
    country: "Belgium",
    flag: "🇧🇪",
    languages: ["French", "English", "Dutch"],
    levels: ["A2", "B1", "B2", "C1"],
    specialties: ["Business French", "Grammar", "Pronunciation"],
    pricePerHour: 28,
    rating: 4.8,
    reviewCount: 156,
    lessonsGiven: 1120,
    verified: "top",
    bio: "Former corporate trainer. I help professionals reach fluency for work — meetings, emails, negotiation.",
    matchScore: 92,
    avatarInitials: "JM",
    avatarColor: "ochre",
  },
  {
    id: "claire-nguyen",
    name: "Claire Nguyen",
    country: "Canada",
    flag: "🇨🇦",
    languages: ["French", "English"],
    levels: ["Beginner", "A1", "A2"],
    specialties: ["Absolute beginners", "Kids & teens", "Conversation"],
    pricePerHour: 18,
    rating: 4.9,
    reviewCount: 302,
    lessonsGiven: 2670,
    verified: "expert",
    bio: "Québécoise teacher who specializes in true beginners — patient, structured, and fun.",
    matchScore: 89,
    avatarInitials: "CN",
    avatarColor: "sage",
  },
  {
    id: "amadou-diallo",
    name: "Amadou Diallo",
    country: "Senegal",
    flag: "🇸🇳",
    languages: ["French", "English", "Wolof"],
    levels: ["A1", "A2", "B1", "B2", "C1"],
    specialties: ["Conversation", "African French culture", "Exam prep (TCF)"],
    pricePerHour: 15,
    rating: 4.95,
    reviewCount: 189,
    lessonsGiven: 1450,
    verified: "verified",
    bio: "Native French speaker from Dakar. Warm, structured lessons focused on real spoken fluency.",
    matchScore: 88,
    avatarInitials: "AD",
    avatarColor: "rouge",
  },
];

export type LearningRequest = {
  id: string;
  learnerName: string;
  country: string;
  level: string;
  goal: string;
  lessonsPerWeek: number;
  budget: number;
  availability: string;
  postedAt: string;
};

export const learningRequests: LearningRequest[] = [
  {
    id: "req-1",
    learnerName: "Sarah",
    country: "USA",
    level: "A2",
    goal: "I want to learn French to travel to France next summer.",
    lessonsPerWeek: 2,
    budget: 20,
    availability: "Tuesday & Thursday evenings",
    postedAt: "2h ago",
  },
  {
    id: "req-2",
    learnerName: "Miguel",
    country: "Mexico",
    level: "B1",
    goal: "Preparing for a job that requires professional French.",
    lessonsPerWeek: 3,
    budget: 25,
    availability: "Weekday mornings",
    postedAt: "5h ago",
  },
  {
    id: "req-3",
    learnerName: "Beatriz",
    country: "Brazil",
    level: "Beginner",
    goal: "Complete beginner, want a patient teacher for casual conversation.",
    lessonsPerWeek: 1,
    budget: 15,
    availability: "Weekends",
    postedAt: "1d ago",
  },
];

export function getTeacherById(id: string): Teacher | undefined {
  return teachers.find((t) => t.id === id);
}

export const learnerDashboard = {
  name: "Sarah",
  level: "A2",
  hoursLearned: 18,
  lessonsCompleted: 12,
  nextLesson: {
    teacher: teachers[0],
    date: "Thu, Aug 6",
    time: "6:00 PM",
    sessionId: "sess_8842",
  },
};

export const teacherDashboard = {
  name: teachers[0].name,
  lessonsThisMonth: 42,
  studentsActive: 18,
  earningsThisMonth: 840,
  upcoming: [
    { learner: "Sarah", date: "Thu, Aug 6", time: "6:00 PM", sessionId: "sess_8842" },
    { learner: "Tom", date: "Fri, Aug 7", time: "9:00 AM", sessionId: "sess_8901" },
  ],
};
